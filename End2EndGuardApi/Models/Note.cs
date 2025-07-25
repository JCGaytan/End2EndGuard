using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace End2EndGuardApi.Models
{
    public class Note
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public ICollection<NoteVersion> Versions { get; set; }
    }
}
