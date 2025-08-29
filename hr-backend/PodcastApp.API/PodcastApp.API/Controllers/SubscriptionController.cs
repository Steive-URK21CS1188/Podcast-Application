using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PodcastApp.Infrastructure.Data;
using PodcastApp.Domain.Models;

namespace PodcastApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
   // [Authorize]
    public class SubscriptionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SubscriptionController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("{podcastId}/{userId}")]
        public async Task<IActionResult> SubscribeToPodcast(Guid podcastId, string userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound("User not found");

            var podcast = await _context.Podcasts.FindAsync(podcastId);
            if (podcast == null)
                return NotFound("Podcast not found");

            var exists = await _context.Subscriptions
                .AnyAsync(s => s.UserId == userId && s.PodcastId == podcastId);
            if (exists)
                return BadRequest("Already subscribed.");

            var subscription = new Subscription
            {
                SubscriptionId = Guid.NewGuid(),
                UserId = userId,
                PodcastId = podcastId,
                SubscribedAt = DateTime.UtcNow
            };

            _context.Subscriptions.Add(subscription);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("{subscriptionId}")]
        public async Task<IActionResult> GetSubscriptionById(Guid subscriptionId)
        {
            var subscription = await _context.Subscriptions
                .Include(s => s.User)   // Optional: Include User details
                .Include(s => s.Podcast) // Optional: Include Podcast details
                .FirstOrDefaultAsync(s => s.SubscriptionId == subscriptionId);

            if (subscription == null)
                return NotFound($"Subscription with ID {subscriptionId} not found.");

            return Ok(subscription);
        }
        [HttpDelete("{subscriptionId}")]
        public async Task<IActionResult> UnsubscribeById(Guid subscriptionId)
        {
            var subscription = await _context.Subscriptions
                .FirstOrDefaultAsync(s => s.SubscriptionId == subscriptionId);
            if (subscription == null)
                return NotFound("Subscription not found");

            _context.Subscriptions.Remove(subscription);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Subscription/podcast/{podcastId}
        [HttpDelete("podcast/{podcastId}")]
        public async Task<IActionResult> DeleteSubscriptionsByPodcastId(Guid podcastId)
        {
            var subscriptions = await _context.Subscriptions
                .Where(s => s.PodcastId == podcastId)
                .ToListAsync();

            if (!subscriptions.Any())
                return NotFound("No subscriptions found for this podcast.");

            _context.Subscriptions.RemoveRange(subscriptions);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        // GET: api/Subscription/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserSubscriptions(string userId)
        {
            var subscriptions = await _context.Subscriptions
            .Include(s => s.Podcast)
            .Where(s => s.UserId == userId)
            .ToListAsync();

            return Ok(subscriptions);

        }
        // DELETE: api/Subscription/{podcastId}/{userId}
        [HttpDelete("{podcastId}/{userId}")]
        public async Task<IActionResult> UnsubscribeFromPodcast(Guid podcastId, string userId)
        {
            var subscription = await _context.Subscriptions
            .FirstOrDefaultAsync(s => s.UserId == userId && s.PodcastId == podcastId);

            if (subscription == null)
                return NotFound("Subscription not found");

            _context.Subscriptions.Remove(subscription);
            await _context.SaveChangesAsync();

            return NoContent(); 

        }

    }

}