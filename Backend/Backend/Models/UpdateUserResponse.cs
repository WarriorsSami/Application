using System.Collections.Generic;

namespace Backend.Models
{
    public class UpdateUserResponse
    {
        public string FirstName { get; set; }
        
        public string LastName { get; set; }
        
        public string Username { get; set; }
        
        public string Email { get; set; }

        public List<string> Errors { get; set; } = new List<string>();
    }
}