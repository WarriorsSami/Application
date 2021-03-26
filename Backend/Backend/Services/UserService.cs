using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Backend.Helpers;
using Backend.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;

namespace Backend.Services
{
    
    public interface IUserService
    {
        Task<AuthenticateResponse> Authenticate(AuthenticateRequest model);
        Task<IEnumerable<User>> GetAll();
        User GetById(string id);

        Task<AuthenticateResponse> CreateUser(User user);
        Task<UpdateUserResponse> UpdateUser(User model, UpdateUserRequest newModel);
    }
    
    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> _users;
        private readonly AppSettings _appSettings;

        public UserService(StoreDatabaseSettings settings, IOptions<AppSettings> appSettings)
        {

            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>(settings.UsersCollectionName);
            _appSettings = appSettings.Value;
        }

        public async Task<AuthenticateResponse> Authenticate(AuthenticateRequest model)
        {
            var query = await _users.FindAsync((user => user.Username == model.Username));
            var user = query.ToList().FirstOrDefault();
            
            // return null if user not found
            if (user == null) return null;

            if (!CheckPassword(model.Password, user.Password))
                return null;
            
            // authentication successful so generate jwt token
            var token = GenerateJwtToken(user);
            return new AuthenticateResponse(user, token);
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            var query = await _users.FindAsync(user => true);
            return query.ToList();
        }

        public User GetById(string id)
        {
            var ret = _users.Find(user => user.Id == id).ToList();
            return ret.Count == 0 ? null : ret[0];
        }
        
        public async Task<AuthenticateResponse> CreateUser(User user)
        {
        
            /// check if the user already exists in the database
            var query = await _users.FindAsync(u => u.Email == user.Email || u.Username == user.Username);

            if (query.ToList().FirstOrDefault() != null)
                return null;

            user.Password = GenerateHash(user.Password);
            await _users.InsertOneAsync(user);
            var token = GenerateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }
        
        // TODO refactor this shitty piece of code!!
        public async Task<UpdateUserResponse> UpdateUser(User model,  UpdateUserRequest req)
        {
            var qry = await _users.FindAsync(usr => usr.Username == model.Username);
            var u = qry.ToList().FirstOrDefault();

            if (!CheckPassword(req.Password, u.Password))
                return null;

            var response = new UpdateUserResponse();
            
            if (model.Email != req.Email){
                
                var query = await _users.FindAsync(usr => usr.Email == req.Email);
                
                if (query.ToList().FirstOrDefault() == null) {
                    
                    var filter = Builders<User>.Filter.Where(x => x.Username == model.Username);
                    var update = Builders<User>.Update.Set(x => x.Email, req.Email);
                    await _users.UpdateOneAsync(filter, update);
                    model.Email = req.Email;

                } else {
                    response.Errors.Add("Another account is currently using this email");
                }
            }
            
            if (model.Username != req.Username){

                var query = await _users.FindAsync(usr => usr.Username == req.Username);
                
                if (query.ToList().FirstOrDefault() == null){
                    
                    var filter = Builders<User>.Filter.Where(x => x.Username == model.Username);
                    var update = Builders<User>.Update.Set(x => x.Username, req.Username);
                    await _users.UpdateOneAsync(filter, update);
                    model.Username = req.Username;

                } else {
                    response.Errors.Add("Another account is currently using this username");
                }
            }

            if (model.FirstName != req.FirstName) {
                var filter = Builders<User>.Filter.Where(x => x.Username == model.Username);
                var update = Builders<User>.Update.Set(x => x.FirstName, req.FirstName);
                await _users.UpdateOneAsync(filter, update);
                model.FirstName = req.FirstName;
            }

            if (model.LastName != req.LastName) {
                var filter = Builders<User>.Filter.Where(x => x.Username == model.Username);
                var update = Builders<User>.Update.Set(x => x.LastName, req.LastName);
                await _users.UpdateOneAsync(filter, update);
                model.LastName = req.LastName;
            }

            response.FirstName = model.FirstName;
            response.LastName = model.LastName;
            response.Username = model.Username;
            response.Email = model.Email;
            response.Email = model.Email;

            return response;
        }

        private string GenerateHash(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        private bool CheckPassword(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }

        private string GenerateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}