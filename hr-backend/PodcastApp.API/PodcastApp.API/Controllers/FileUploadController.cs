using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;

namespace PodcastApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public FileUploadController(IWebHostEnvironment env)
        {
            _env = env;
        }
        
        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile([FromForm] IFormFile file) // ✅ REQUIRED
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var uploadsRoot = Path.Combine(_env.WebRootPath!, "uploads");
            if (!Directory.Exists(uploadsRoot))
                Directory.CreateDirectory(uploadsRoot);

            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsRoot, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var relativePath = $"/uploads/{fileName}";
            return Ok(new { url = relativePath });
        }

    }

}