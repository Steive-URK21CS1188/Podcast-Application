using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PodcastApp.Domain.Models
{
    public class Subscription
    {
        [Key]
        public Guid SubscriptionId { get; set; } // Primary key

        [Required]
        public string UserId { get; set; } // Foreign key to AspNetUsers.Id

        [ForeignKey("UserId")]
        public User User { get; set; }

        [Required]
        public Guid PodcastId { get; set; } // FK to Podcast

        [ForeignKey("PodcastId")]
        public Podcast Podcast { get; set; }

        public DateTime SubscribedAt { get; set; } = DateTime.UtcNow;
    }
}
