using System;
using System.ComponentModel.DataAnnotations;

namespace End2EndGuardApi.Models
{
    public class NoteVersion
    {
        public int Id { get; set; }
        public int NoteId { get; set; }
        public Note Note { get; set; }
        [Required]
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
