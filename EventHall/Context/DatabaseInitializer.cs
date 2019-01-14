using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using EventHall.Models;

namespace EventHall.Context
{
    public class DatabaseInitializer : DropCreateDatabaseIfModelChanges<DatabaseContext>
    {
        protected override void Seed(DatabaseContext context)
        {
            base.Seed(context);

            PartyRoom firstPartyRoom = new PartyRoom()
            {
                Name = "Salon 1",
                Description = "Primer salon",
                Type = Enums.TypePartyRoom.FurnishedRoom,
                Screens = true,
                Sound = true,
                AirConditioner = true,
                LuxuryArmchairs = false,
                VideoBeam = false,
                PricePerHour = 350.00
            };

            Customer firstCustomer = new Customer()
            {
                Name = "Daniel Juarez",
                IdentificationNumber = "A123456789",
                CurrentBalance = 0.0,
                PhoneNumber = 61412345678
            };

            context.PartyRooms.Add(firstPartyRoom);
            context.Customers.Add(firstCustomer);
            context.SaveChanges();
        }
    }
}