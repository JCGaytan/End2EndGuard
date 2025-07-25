using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using End2EndGuardApi.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace End2EndGuardApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class NotesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public NotesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetNotes()
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdStr, out var userId)) return Unauthorized();
            var notes = await _context.Notes
                .Where(n => n.UserId == userId)
                .Include(n => n.Versions)
                .ToListAsync();
            return Ok(notes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetNote(string id)
        {
            int realId = DecryptIdIfNeeded(id);
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdStr, out var userId)) return Unauthorized();
            var note = await _context.Notes
                .Include(n => n.Versions)
                .FirstOrDefaultAsync(n => n.Id == realId && n.UserId == userId);
            if (note == null) return NotFound();
            return Ok(note);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNote([FromBody] NoteCreateRequest request)
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdStr, out var userId)) return Unauthorized();
            var now = System.DateTime.UtcNow;
            var note = new Models.Note
            {
                Title = request.Title!,
                Content = request.Content!,
                CreatedAt = now,
                UserId = userId
            };
            _context.Notes.Add(note);
            await _context.SaveChangesAsync();
            // Add initial version
            var version = new Models.NoteVersion
            {
                NoteId = note.Id,
                Content = note.Content,
                CreatedAt = note.CreatedAt
            };
            _context.NoteVersions.Add(version);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetNote), new { id = note.Id }, note);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNote(string id, [FromBody] NoteUpdateRequest request)
        {
            int realId = DecryptIdIfNeeded(id);
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdStr, out var userId)) return Unauthorized();
            var note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == realId && n.UserId == userId);
            if (note == null) return NotFound();
            note.Title = request.Title!;
            note.Content = request.Content!;
            // Add new version
            var version = new Models.NoteVersion
            {
                NoteId = note.Id,
                Content = note.Content,
                CreatedAt = System.DateTime.UtcNow
            };
            _context.NoteVersions.Add(version);
            await _context.SaveChangesAsync();
            return Ok(note);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(string id)
        {
            int realId = DecryptIdIfNeeded(id);
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdStr, out var userId)) return Unauthorized();
            var note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == realId && n.UserId == userId);
            if (note == null) return NotFound();
            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        // Utility to decrypt the ID if it's encrypted (base64), otherwise parse as int
        private int DecryptIdIfNeeded(string id)
        {
            // Try to parse as int first
            if (int.TryParse(id, out var intId)) return intId;
            try
            {
                var bytes = System.Convert.FromBase64String(id);
                using var aes = System.Security.Cryptography.Aes.Create();
                aes.Key = System.Text.Encoding.UTF8.GetBytes("1234567890123456");
                aes.IV = System.Text.Encoding.UTF8.GetBytes("6543210987654321");
                aes.Mode = System.Security.Cryptography.CipherMode.CBC;
                aes.Padding = System.Security.Cryptography.PaddingMode.PKCS7;
                using var decryptor = aes.CreateDecryptor();
                var decrypted = decryptor.TransformFinalBlock(bytes, 0, bytes.Length);
                var decryptedText = System.Text.Encoding.UTF8.GetString(decrypted);
                return int.Parse(decryptedText);
            }
            catch
            {
                throw new System.Exception("Invalid or un-decryptable note ID");
            }
        }

        public class NoteCreateRequest
        {
            public string? Title { get; set; }
            public string? Content { get; set; }
        }
        public class NoteUpdateRequest
        {
            public string? Title { get; set; }
            public string? Content { get; set; }
        }
    }
}
