using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PodcastApp.Infrastructure.Data;
using PodcastApp.Domain.Models;
using System;

namespace PodcastApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
  //  [Authorize]
    public class EpisodeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EpisodeController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/episode
        [HttpGet]
        public async Task<IActionResult> GetAllEpisodes()
        {
            var episodes = await _context.Episodes.ToListAsync();
            return Ok(episodes);
        }

        // GET: api/episode/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEpisodeById(Guid id)
        {
            var episode = await _context.Episodes.FindAsync(id);
            if (episode == null)
                return NotFound();

            return Ok(episode);
        }

        // POST: api/episode
        [HttpPost]
        public async Task<IActionResult> CreateEpisode([FromBody] Episode episode)
        {
            if (episode == null)
                return BadRequest();

            // Ensure episode is linked to an existing Podcast
            var podcast = await _context.Podcasts.FindAsync(episode.PodcastId);
            if (podcast == null)
                return BadRequest("Podcast not found.");
            episode.EpisodeId = Guid.NewGuid();
            episode.ReleaseDate = episode.ReleaseDate == default ? DateTime.UtcNow : episode.ReleaseDate;

            _context.Episodes.Add(episode);
            await _context.SaveChangesAsync();

         return Ok(podcast);
        }

        // PUT: api/episode/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEpisode(Guid id, [FromBody] Episode updatedEpisode)
        {
            if (id != updatedEpisode.EpisodeId)
                return BadRequest();

            var existingEpisode = await _context.Episodes.FindAsync(id);
            if (existingEpisode == null)
                return NotFound();

            existingEpisode.Title = updatedEpisode.Title;
            existingEpisode.AudioURL = updatedEpisode.AudioURL;
            existingEpisode.Duration = updatedEpisode.Duration;
            existingEpisode.ReleaseDate = updatedEpisode.ReleaseDate;
            existingEpisode.Notes = updatedEpisode.Notes;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/episode/by-podcast/{podcastId}
        [HttpGet("by-podcast/{podcastId}")]
        public async Task<IActionResult> GetEpisodesByPodcastId(Guid podcastId)
        {
            var episodes = await _context.Episodes
            .Where(e => e.PodcastId == podcastId)
            .ToListAsync();

            if (episodes == null || episodes.Count == 0)
                return NotFound("No episodes found for this podcast.");

            return Ok(episodes);

        }

        // DELETE: api/episode/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEpisode(Guid id)
        {
            var episode = await _context.Episodes.FindAsync(id);
            if (episode == null)
                return NotFound();

            _context.Episodes.Remove(episode);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

