using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation((BsonType.ObjectId))]
        public string Id { get; set; }
        
        [Required]
        public string FirstName { get; set; }
        
        [Required]
        public string LastName { get; set; }
        
        [Required]
        public string Username { get; set; }
        
        [Required]
        public string Password { get; set; }
        
        [Required]
        public string Email { get; set; }

        public override bool Equals(Object obj)
        {
            //Check for null and compare run-time types.
            if ((obj == null) || !GetType().Equals(obj.GetType()))
                return false;

            User user = (User) obj;
            return user.FirstName == FirstName && user.LastName == LastName &&
                   user.Username == Username && user.Email == Email && user.Password == Password;
        }

        public override int GetHashCode()
        {
            int prime = 31;
            return (Id.GetHashCode() * prime +
                   FirstName.GetHashCode() * prime +
                   LastName.GetHashCode() * prime +
                   Username.GetHashCode() * prime +
                   Email.GetHashCode() * prime +
                   Password.GetHashCode() * prime) % Int32.MaxValue;
        }

        public override string ToString()
        {
            return $"{FirstName}, {LastName}, {Username}, {Email}, {Password}";
        }
    }
}