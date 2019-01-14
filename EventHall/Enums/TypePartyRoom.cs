using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace EventHall.Enums
{
    public enum TypePartyRoom
    {
        [Description("Aire Libre")]
        OutdoorLounge = 0,

        [Description("Sala Vacía")]
        EmptyRoom = 1,

        [Description("Sala Amoblada")]
        FurnishedRoom = 2,
    }
}