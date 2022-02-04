using Microsoft.EntityFrameworkCore;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<UserNxenesi>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        public DbSet<UserNxenesi> AspNetUsers { get; set; }
        public DbSet<Book> Book { get; set; }
        
        public DbSet<Sesion> Sesion { get; set;}

        public DbSet<Ankes> Ankes { get; set;}
        public DbSet<Note> Note { get; set;}
    }
}