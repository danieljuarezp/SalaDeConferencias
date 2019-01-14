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
    public class ReservationController : ApiController
    {
        private DatabaseContext db = new DatabaseContext();

        // CRUD de reservaciones

        #region Create
        [HttpPost]
        public IHttpActionResult CreateReservation(Reservation newReservation)
        {
            try
            {
                bool itsBusy = db.Reservations.Any(q => q.PartyRoomId == newReservation.PartyRoomId && q.EndTime <= newReservation.StartTime);


                if (itsBusy)
                {
                    return BadRequest();
                }

                if ((newReservation.StartTime.Hour <= 7) || (newReservation.EndTime.Hour >= 22))
                {
                    return BadRequest();
                }


                Reservation reservation = new Reservation()
                {
                    AlreadyPaid = newReservation.AlreadyPaid,
                    Confirmed = newReservation.Confirmed,
                    CustomerId = newReservation.CustomerId,
                    EndTime = newReservation.EndTime,
                    PartyRoomId = newReservation.PartyRoomId,
                    StartTime = newReservation.StartTime,
                    TotalPrice = newReservation.TotalPrice
                };

                db.Reservations.Add(reservation);
                db.SaveChanges();

                return Ok(reservation);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }
        #endregion

        #region Read
        [HttpGet]
        public IHttpActionResult GetReservationById(int id)
        {
            try
            {
                Reservation reservation = db.Reservations.FirstOrDefault(q => q.ReservationId == id);
                if (reservation == null)
                {
                    return NotFound();
                }
                return Ok(reservation);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpGet]
        public IHttpActionResult GetAllReservations()
        {
            try
            {
                List<Reservation> allReservation = db.Reservations.ToList();
                return Ok(allReservation);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpGet]
        public IHttpActionResult GetReservationsWithoutConfirmation()
        {
            try
            {
                List<Reservation> allReservation = db.Reservations.Where(q => !q.Confirmed).ToList();
                return Ok(allReservation);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpGet]
        public IHttpActionResult GetReservationsWithoutPaying()
        {
            try
            {
                List<Reservation> allReservation = db.Reservations.Where(q => !q.AlreadyPaid).ToList();
                return Ok(allReservation);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }
        #endregion

        #region Update
        [HttpPost]
        public IHttpActionResult UpdateReservation(Reservation reservationToUpdate)
        {
            try
            {
                Reservation oldReservation = db.Reservations.FirstOrDefault(q => q.ReservationId == reservationToUpdate.ReservationId);
                oldReservation.AlreadyPaid = reservationToUpdate.AlreadyPaid;
                oldReservation.Confirmed = reservationToUpdate.Confirmed;
                oldReservation.CustomerId = reservationToUpdate.CustomerId;
                oldReservation.EndTime = reservationToUpdate.EndTime;
                oldReservation.PartyRoomId = reservationToUpdate.PartyRoomId;
                oldReservation.StartTime = reservationToUpdate.StartTime;
                oldReservation.TotalPrice = reservationToUpdate.TotalPrice;

                db.SaveChanges();

                return Ok(oldReservation);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpPost]
        public IHttpActionResult ConfirmReservation(int id)
        {
            try
            {
                Reservation reservation = db.Reservations.FirstOrDefault(q => q.ReservationId == id);
                reservation.Confirmed = true;

                db.SaveChanges();

                return Ok(reservation);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpPost]
        public IHttpActionResult PayReservation(int id, double money)
        {
            try
            {
                Reservation reservation = db.Reservations.FirstOrDefault(q => q.ReservationId == id);
                reservation.Confirmed = true;
                reservation.TotalPrice -= money;

                db.SaveChanges();

                return Ok(reservation);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }
        #endregion

        #region Delete
        [HttpGet]
        public IHttpActionResult DeleteReservationById(int id)
        {
            try
            {
                Reservation reservation = db.Reservations.FirstOrDefault(q => q.ReservationId == id);
                db.Reservations.Remove(reservation);
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
