using EventHall.Context;
using EventHall.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EventHall.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CustomerController : ApiController
    {
        private DatabaseContext db = new DatabaseContext();

        // CRUD de clientes

        #region Create
        [HttpPost]
        public IHttpActionResult CreateCustomer(Customer newCustomer)
        {
            try
            {
                Customer customer = new Customer()
                {
                    Name = newCustomer.Name,
                    IdentificationNumber = newCustomer.IdentificationNumber,
                    PhoneNumber = newCustomer.PhoneNumber,
                    CurrentBalance = newCustomer.CurrentBalance
                };

                db.Customers.Add(customer);
                db.SaveChanges();

                return Ok(customer);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }
        #endregion

        #region Read
        [HttpGet]
        public IHttpActionResult GetCustomerById(int id)
        {
            try
            {
                Customer customer = db.Customers.FirstOrDefault(q => q.CustomerId == id);
                if (customer == null)
                {
                    return NotFound();
                }
                return Ok(customer);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpGet]
        public IHttpActionResult GetAllCustomers()
        {
            try
            {
                List<Customer> allCustomers = db.Customers.ToList();
                return Ok(allCustomers);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        [HttpGet]
        public IHttpActionResult GetLastTenReservationByCustomerId(int id)
        {
            try
            {
                var reservations = db.Reservations.Where(q => q.CustomerId == id).OrderByDescending(q => q.ReservationId).Take(10);
                return Ok(reservations);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }

        #endregion

        #region Update
        [HttpPost]
        public IHttpActionResult UpdateCustomer(Customer customerToUpdate)
        {
            try
            {
                Customer oldCustomer = db.Customers.FirstOrDefault(q => q.CustomerId == customerToUpdate.CustomerId);
                oldCustomer.Name = customerToUpdate.Name;
                oldCustomer.IdentificationNumber = customerToUpdate.IdentificationNumber;
                oldCustomer.PhoneNumber = customerToUpdate.PhoneNumber;

                db.SaveChanges();

                return Ok(oldCustomer);
            }
            catch (Exception)
            {
                return InternalServerError();
            }
        }
        #endregion

        #region Delete
        [HttpGet]
        public IHttpActionResult DeleteCustomerById(int id)
        {
            try
            {
                bool validDeleted = db.Reservations.Any(q => q.CustomerId == id && (!q.AlreadyPaid || !q.Confirmed));

                if (validDeleted)
                {
                    return BadRequest("No se puede eliminar este cliente tiene pendientes con sus reservaciones");
                }

                Customer customer = db.Customers.FirstOrDefault(q => q.CustomerId == id);
                db.Customers.Remove(customer);

                IQueryable<Reservation> reservations = db.Reservations.Where(q => q.CustomerId == id);

                foreach (Reservation reservation in reservations)
                {
                    db.Reservations.Remove(reservation);
                }

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
