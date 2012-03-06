using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace DeliveryTracker.Models
{
    public partial class AppDbContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Delivery> Deliveries { get; set; }
    }

    #region Test data
    public partial class AppDbContext
    {
        static AppDbContext()
        {
            Database.SetInitializer(new TestDataInitializer());
        }

        private class TestDataInitializer : DropCreateDatabaseIfModelChanges<AppDbContext>
        {
            protected override void Seed(AppDbContext context)
            {
                var c1 = new Customer { Name = "Morton Semiconductor Inc", Address = "5300 Swandale Way\nSanta Clara\nCA 95052" }; context.Customers.Add(c1);
                var c2 = new Customer { Name = "Rich Feynmann", Address = "Robo Labs Inc.\nRoboCorp Campus\nRoboworld" }; context.Customers.Add(c2);
                var c3 = new Customer { Name = "The Maypole Pub", Address = "16 Hopping Bunny Lane\nLittle Tweeville\nChestercestershire" }; context.Customers.Add(c3);
                var c4 = new Customer { Name = "Ellie Van Der Graaf", Address = "Floor 3\nLeipzig House\nNewton Acres\nGauss-on-sea" }; context.Customers.Add(c4);
                context.SaveChanges();

                context.Deliveries.Add(new Delivery { Description = "Nanocircuit Analyzer", Customer = c1 });
                context.Deliveries.Add(new Delivery { Description = "Biros (Pack of 500)", Customer = c2 });
                context.Deliveries.Add(new Delivery { Description = "FPGA Refill Cartridge", Customer = c1 });
                context.Deliveries.Add(new Delivery { Description = "Luxury Silver Hatstand (Medium)", Customer = c3 });
                context.Deliveries.Add(new Delivery { Description = "ASP.NET Karaoke 3 (XBox)", Customer = c4 });
                context.Deliveries.Add(new Delivery { Description = "Party Beverage Multipack", Customer = c4 });
                context.Deliveries.Add(new Delivery { Description = "Plasma Flux Inverter", Customer = c1 });
                context.Deliveries.Add(new Delivery { Description = "Manilla Envelopes", Customer = c2 });
                context.Deliveries.Add(new Delivery { Description = "'I ♥ OSS' T-Shirts (6 pack)", Customer = c4 });
                context.Deliveries.Add(new Delivery { Description = "Hawaiian Pizzas (16 x 16\")", Customer = c4 });

            }
        }
    }
    #endregion
}