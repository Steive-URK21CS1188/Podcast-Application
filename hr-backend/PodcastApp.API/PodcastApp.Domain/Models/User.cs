using Microsoft.AspNetCore.Identity;
namespace PodcastApp.Domain.Models
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProfilePic { get; set; }
        public string Role { get; set; } = "User";
    }
}

