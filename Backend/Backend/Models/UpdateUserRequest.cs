using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class UpdateUserRequest
    {
        [Required]
        public string FirstName { get; set; }
        
        [Required]
        public string LastName { get; set; }
        
        [Required]
        public string Username { get; set; }
        
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}