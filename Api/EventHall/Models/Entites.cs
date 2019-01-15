using EventHall.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EventHall.Models
{
    public class PartyRoom
    {
        [Key]
        public int PartyRoomId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public TypePartyRoom Type { get; set; }
        public bool Screens { get; set; }
        public bool Sound { get; set; }
        public bool AirConditioner { get; set; }
        public bool VideoBeam { get; set; }
        public bool LuxuryArmchairs { get; set; }
        public double PricePerHour { get; set; }
    }

    public class Reservation
    {
        [Key]
        public int ReservationId { get; set; }
        public int PartyRoomId { get; set; }
        public PartyRoom PartyRoom { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public double TotalPrice { get; set; }
        public bool AlreadyPaid { get; set; }
        public bool Confirmed { get; set; }
    }

    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }
        public string Name { get; set; }
        [RegularExpression(@"^[a-zA-Z0-9]{9,10}$")]
        public string IdentificationNumber { get; set; }
        public double CurrentBalance { get; set; }
        [RegularExpression(@"^[0-9]{11,}$")]
        public long PhoneNumber { get; set; }
        public ICollection<Reservation> Reservations { get; set; }
    }
}