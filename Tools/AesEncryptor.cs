
using System;
using System.IO;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Tools
{
    public static class AesEncryptor
    {
        // Use the same key/iv as in EncryptionMiddleware
        private static readonly byte[] Key = Encoding.UTF8.GetBytes("1234567890123456");
        private static readonly byte[] IV = Encoding.UTF8.GetBytes("6543210987654321");

        public static byte[] Encrypt(string json)
        {
            using var aes = Aes.Create();
            aes.Key = Key;
            aes.IV = IV;
            aes.Mode = CipherMode.CBC;
            aes.Padding = PaddingMode.PKCS7;
            
            using var encryptor = aes.CreateEncryptor();
            var plainBytes = Encoding.UTF8.GetBytes(json);
            return encryptor.TransformFinalBlock(plainBytes, 0, plainBytes.Length);
        }

        public static byte[] Decrypt(byte[] cipherBytes)
        {
            using var aes = Aes.Create();
            aes.Key = Key;
            aes.IV = IV;
            aes.Mode = CipherMode.CBC;
            aes.Padding = PaddingMode.PKCS7;
            
            using var decryptor = aes.CreateDecryptor();
            return decryptor.TransformFinalBlock(cipherBytes, 0, cipherBytes.Length);
        }

        public static async Task Main(string[] args)
        {
            string json;
            string url;
            
            if (args.Length < 2)
            {
                Console.WriteLine("No arguments provided, using default values...");
                json = "{\"username\":\"testuser\",\"password\":\"TestPassword123!\"}";
                url = "http://localhost:5201/api/auth/login";
                Console.WriteLine($"Using JSON: {json}");
                Console.WriteLine($"Using URL: {url}");
            }
            else
            {
                json = args[0];
                url = args[1];
            }
            var encrypted = Encrypt(json);

            using var client = new HttpClient();
            var content = new ByteArrayContent(encrypted);
            content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");
            var response = await client.PostAsync(url, content);
            var responseBytes = await response.Content.ReadAsByteArrayAsync();
            Console.WriteLine($"Status: {response.StatusCode}");
            if (response.Content.Headers.ContentType?.MediaType == "application/octet-stream")
            {
                // Try to decrypt the response
                try
                {
                    var decrypted = AesEncryptor.Decrypt(responseBytes);
                    Console.WriteLine("[Decrypted response]:");
                    Console.WriteLine(Encoding.UTF8.GetString(decrypted));
                }
                catch
                {
                    Console.WriteLine("[Binary response, could not decrypt]");
                }
            }
            else
            {
                Console.WriteLine("[Plain response]:");
                Console.WriteLine(Encoding.UTF8.GetString(responseBytes));
            }
        }
    }
}
