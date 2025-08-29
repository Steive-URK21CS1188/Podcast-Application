using System.ComponentModel.DataAnnotations;

namespace PodcastApp.Domain.Models
{
    public class Episode
    {
        [Key]
        public Guid EpisodeId { get; set; }
        public Guid PodcastId { get; set; }
        public string Title { get; set; }
        public string AudioURL { get; set; }
        public int Duration { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Notes { get; set; }
    }
}
