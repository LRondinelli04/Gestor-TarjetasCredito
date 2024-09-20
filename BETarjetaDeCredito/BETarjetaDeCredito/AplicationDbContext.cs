
using BETarjetaDeCredito.Models;
using Microsoft.EntityFrameworkCore;

namespace BETarjetaDeCredito
{
    public class AplicationDbContext : DbContext
    {
        public DbSet<TarjetaCredito> TarjetaCreditos { get; set; }

        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
        {
        }
    }
}
