using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PodcastApp.Domain.Models;
using PodcastApp.Infrastructure.Data;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace PodcastApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PodcastController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PodcastController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/podcast
        [HttpPost]
        public async Task<IActionResult> CreatePodcast([FromBody] Podcast podcast)
        {
            if (podcast == null)
            {
                return BadRequest("Invalid podcast data.");
            }
            podcast.PodcastId = Guid.NewGuid();
            podcast.IsApproved = false;
            await _context.Podcasts.AddAsync(podcast);
            await _context.SaveChangesAsync();

            return Ok(podcast);
        }

        // GET: api/podcast/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPodcastById(Guid id)
        {
            var podcast = await _context.Podcasts.FindAsync(id);
            if (podcast == null)
                return NotFound($"Podcast with ID {id} not found.");

            return Ok(podcast);
        }

        // GET: api/podcast/GetAllApprovedPodcasts
        [HttpGet("GetAllApprovedPodcasts")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllApprovedPodcasts()
        {
            var podcasts = await _context.Podcasts
                .Where(p => p.IsApproved)
                .ToListAsync();

            return Ok(podcasts);
        }

        [HttpGet("GetAllUnApprovedPodcasts")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllUnApprovedPodcasts()
        {
            var podcasts = await _context.Podcasts
                .Where(p => !p.IsApproved)
                .ToListAsync();

            return Ok(podcasts);
        }

        // GET: api/podcast/GetAllPodcasts
        [HttpGet("GetAllPodcasts")]
       // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllPodcasts()
        {
            var podcasts = await _context.Podcasts.ToListAsync();
            return Ok(podcasts);
        }

        // PUT: api/podcast/approve/{id}
        [HttpPut("approve/{id}")]
     //   [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ApprovePodcast(Guid id)
        {
            Console.WriteLine($"Trying to approve Podcast with ID: {id}");

            var podcast = await _context.Podcasts.FindAsync(id);
            if (podcast == null)
                return NotFound($"Podcast with ID {id} not found.");

            podcast.IsApproved = true;
            await _context.SaveChangesAsync();

            return NoContent(); ;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePodcast(Guid id, [FromBody] Podcast updatedPodcast)
        {
            if (id != updatedPodcast.PodcastId)
            {
                return BadRequest("ID mismatch");
            }

            var existingPodcast = await _context.Podcasts.FindAsync(id);
            if (existingPodcast == null)
            {
                return NotFound("Podcast not found");
            }

            existingPodcast.Title = updatedPodcast.Title;
            existingPodcast.Description = updatedPodcast.Description;
            existingPodcast.Category = updatedPodcast.Category;
            existingPodcast.CoverImage = updatedPodcast.CoverImage;
            existingPodcast.IsApproved = updatedPodcast.IsApproved;

            await _context.SaveChangesAsync();
            return Ok(existingPodcast);
        }


        [HttpPut("unapprove/{id}")]
        //   [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UnApprovePodcast(Guid id)
        {
            Console.WriteLine($"Trying to unapprove Podcast with ID: {id}");

            var podcast = await _context.Podcasts.FindAsync(id);
            if (podcast == null)
                return NotFound($"Podcast with ID {id} not found.");

            podcast.IsApproved = false;
            await _context.SaveChangesAsync();

            return NoContent(); ;
        }

        // DELETE: api/podcast/{id}
        [HttpDelete("{id}")]
      //  [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeletePodcast(Guid id)
        {
            var podcast = await _context.Podcasts.FindAsync(id);
            if (podcast == null)
                return NotFound($"Podcast with ID {id} not found.");

            _context.Podcasts.Remove(podcast);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}



