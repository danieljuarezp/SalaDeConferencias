using EventHall.Context;
using EventHall.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EventHall.Controllers
{
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
                Customer customer = db.Customers.FirstOrDefault(q => q.CustomerId == id);
                IEnumerable<Reservation> lastReservations = customer.Reservations.OrderByDescending(q => q.ReservationId).Take(10);
                return Ok(lastReservations);
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
                oldCustomer.CurrentBalance = customerToUpdate.CurrentBalance;

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
                Customer customer = db.Customers.FirstOrDefault(q => q.CustomerId == id);

                if (customer.Reservations != null)
                {
                    if (customer.Reservations.Any(q => !q.Confirmed))
                    {
                        return BadRequest();
                    }

                    ICollection<Reservation> reservationsByCustomer = customer.Reservations;

                    customer.Reservations.Clear();

                    foreach (Reservation reservaation in reservationsByCustomer)
                    {
                        db.Reservations.Remove(reservaation);
                    }
                }

                db.Customers.Remove(customer);
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
