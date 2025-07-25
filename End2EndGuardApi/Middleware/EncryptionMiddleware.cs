using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace End2EndGuardApi.Middleware
{
    public class EncryptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly byte[] _key;
        private readonly byte[] _iv;

        private readonly ILogger<EncryptionMiddleware> _logger;

        public EncryptionMiddleware(RequestDelegate next, ILogger<EncryptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
            // For demo: static key/iv. In production, use secure key exchange!
            _key = Encoding.UTF8.GetBytes("1234567890123456"); // 16 bytes for AES-128
            _iv = Encoding.UTF8.GetBytes("6543210987654321"); // 16 bytes
        }

        public async Task InvokeAsync(HttpContext context)
        {
            bool isEncrypted = context.Request.ContentType == "application/octet-stream";
            bool wantsEncryptedResponse = context.Request.Headers["Accept"].ToString().Contains("application/octet-stream");

            _logger.LogInformation("[EncryptionMiddleware] IsEncrypted: {isEncrypted}, Path: {path}, ContentType: {contentType}",
                isEncrypted, context.Request.Path, context.Request.ContentType);

            // Always require encrypted requests
            if (context.Request.ContentLength > 0)
            {
                if (isEncrypted)
                {
                    _logger.LogInformation("[EncryptionMiddleware] Decrypting request body for {path}", context.Request.Path);
                    using var ms = new MemoryStream();
                    await context.Request.Body.CopyToAsync(ms);
                    var encrypted = ms.ToArray();
                    _logger.LogInformation("[EncryptionMiddleware] Incoming encrypted data length: {len} bytes (should be multiple of 16)", encrypted.Length);
                    var decrypted = Decrypt(encrypted);
                    var decryptedText = Encoding.UTF8.GetString(decrypted);
                    _logger.LogInformation("[EncryptionMiddleware] Decrypted text: {text}", decryptedText);
                    context.Request.Body = new MemoryStream(decrypted);
                    context.Request.ContentLength = decrypted.Length;
                    context.Request.ContentType = "application/json"; // Set proper content type after decryption
                }
                else
                {
                    _logger.LogWarning("[EncryptionMiddleware] Rejected unencrypted request for {path}", context.Request.Path);
                    context.Response.StatusCode = 415; // Unsupported Media Type
                    await context.Response.WriteAsync("Encrypted requests required.");
                    return;
                }
            }

            // Capture response
            var originalBody = context.Response.Body;
            using var newBody = new MemoryStream();
            context.Response.Body = newBody;

            await _next(context);

            // Encrypt all successful responses (200 OK, 201 Created, etc.) with non-empty body
            // Extend this list if you want to encrypt other success codes (e.g., 202, 204 with body)
            if ((context.Response.StatusCode == 200 || context.Response.StatusCode == 201) && newBody.Length > 0)
            {
                _logger.LogInformation("[EncryptionMiddleware] Encrypting response for {path}", context.Request.Path);
                newBody.Seek(0, SeekOrigin.Begin);
                var plain = newBody.ToArray();
                var encrypted = Encrypt(plain);
                context.Response.ContentType = "application/octet-stream";
                context.Response.ContentLength = encrypted.Length;
                await originalBody.WriteAsync(encrypted, 0, encrypted.Length);
            }
            else
            {
                newBody.Seek(0, SeekOrigin.Begin);
                await newBody.CopyToAsync(originalBody);
            }
        }

        private byte[] Encrypt(byte[] plain)
        {
            using var aes = Aes.Create();
            aes.Key = _key;
            aes.IV = _iv;
            aes.Mode = CipherMode.CBC;
            aes.Padding = PaddingMode.PKCS7;
            using var encryptor = aes.CreateEncryptor();
            return encryptor.TransformFinalBlock(plain, 0, plain.Length);
        }

        private byte[] Decrypt(byte[] encrypted)
        {
            using var aes = Aes.Create();
            aes.Key = _key;
            aes.IV = _iv;
            aes.Mode = CipherMode.CBC;
            aes.Padding = PaddingMode.PKCS7;
            using var decryptor = aes.CreateDecryptor();
            return decryptor.TransformFinalBlock(encrypted, 0, encrypted.Length);
        }
    }
}
