using System.ComponentModel.DataAnnotations;

namespace PodcastApp.Domain.Models
{
    public class Podcast
    {
        [Key]
        public Guid PodcastId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string CoverImage { get; set; }
        public string CreatorId { get; set; }
        public bool IsApproved { get; set; } = false;
    }
}
