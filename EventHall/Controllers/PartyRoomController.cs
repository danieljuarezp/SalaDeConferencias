using EventHall.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EventHall.Models;

namespace EventHall.Controllers
{
    public class PartyRoomController : ApiController
    {
        private DatabaseContext db = new DatabaseContext();

        // CRUD de salones

        #region Create
        [HttpPost]
        public IHttpActionResult CreatePartyRoom(PartyRoom newPartyRoom)
        {
            try
            {
                PartyRoom partyRoom = new PartyRoom()
                {
                    Name = newPartyRoom.Name,
                    AirConditioner = newPartyRoom.AirConditioner,
                    Description = newPartyRoom.Description,
                    LuxuryArmchairs = newPartyRoom.LuxuryArmchairs,
                    PricePerHour = newPartyRoom.PricePerHour,
                    Screens = newPartyRoom.Screens,
                    Sound = newPartyRoom.Sound,
                    VideoBeam = newPartyRoom.VideoBeam,
                    Type = newPartyRoom.Type
                };

                db.PartyRooms.Add(partyRoom);
                db.SaveChanges();

                return Ok(partyRoom);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }
        #endregion

        #region Read
        [HttpGet]
        public IHttpActionResult GetPartyRoomById(int id)
        {
            try
            {
                PartyRoom partyRoom = db.PartyRooms.FirstOrDefault(q => q.PartyRoomId == id);
                if (partyRoom == null)
                {
                    return NotFound();
                }
                return Ok(partyRoom);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpGet]
        public IHttpActionResult GetAllPartyRooms()
        {
            try
            {
                List<PartyRoom> allPartyRooms = db.PartyRooms.ToList();
                return Ok(allPartyRooms);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }
        #endregion

        #region Update
        [HttpPost]
        public IHttpActionResult UpdatePartyRoom(PartyRoom partyRoomToUpdate)
        {
            try
            {
                PartyRoom oldPartyRoom = db.PartyRooms.FirstOrDefault(q => q.PartyRoomId == partyRoomToUpdate.PartyRoomId);
                oldPartyRoom.AirConditioner = partyRoomToUpdate.AirConditioner;
                oldPartyRoom.Description = partyRoomToUpdate.Description;
                oldPartyRoom.LuxuryArmchairs = partyRoomToUpdate.LuxuryArmchairs;
                oldPartyRoom.Name = partyRoomToUpdate.Name;
                oldPartyRoom.PricePerHour = partyRoomToUpdate.PricePerHour;
                oldPartyRoom.Screens = partyRoomToUpdate.Screens;
                oldPartyRoom.Sound = partyRoomToUpdate.Sound;
                oldPartyRoom.Type = partyRoomToUpdate.Type;
                oldPartyRoom.VideoBeam = partyRoomToUpdate.VideoBeam;

                db.SaveChanges();

                return Ok(oldPartyRoom);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }
        #endregion

        #region Delete
        [HttpGet]
        public IHttpActionResult DeletePartyRoomById(int id)
        {
            try
            {
                PartyRoom partyRoom = db.PartyRooms.FirstOrDefault(q => q.PartyRoomId == id);
                db.PartyRooms.Remove(partyRoom);
                db.SaveChanges();
                return Ok();
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }
        #endregion
    }
}
