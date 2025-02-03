using System;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Product> Products { get; set; }
    public required DbSet<Basket> Baskets { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder
            .Entity<IdentityRole>()
            .HasData(
                new IdentityRole
                {
                    Id = "82a76eb4-de05-49b4-8895-00177f115133",
                    Name = "Member",
                    NormalizedName = "MEMBER",
                },
                new IdentityRole
                {
                    Id = "1cd41fc9-02e2-48f3-b444-1ac521e0fcae",
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                }
            );
    }
}
