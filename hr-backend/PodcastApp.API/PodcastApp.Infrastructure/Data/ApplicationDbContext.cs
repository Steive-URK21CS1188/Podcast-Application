using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PodcastApp.Domain.Models;

namespace PodcastApp.Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<Podcast> Podcasts { get; set; }
        public DbSet<Episode> Episodes { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Composite Primary Key for Subscription (UserId + PodcastId)
            modelBuilder.Entity<Subscription>()
                .HasKey(s => new { s.UserId, s.PodcastId });

            // Subscription → User relationship
            modelBuilder.Entity<Subscription>()
                .HasOne(s => s.User)
                .WithMany()
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Subscription → Podcast relationship
            modelBuilder.Entity<Subscription>()
                .HasOne(s => s.Podcast)
                .WithMany()
                .HasForeignKey(s => s.PodcastId)
                .OnDelete(DeleteBehavior.Restrict); // ✅ Important: No multiple cascade delete paths
        }
    }
}
