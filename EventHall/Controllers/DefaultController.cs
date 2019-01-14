using EventHall.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EventHall.Controllers
{
    public class DefaultController : ApiController
    {
        private DatabaseContext db = new DatabaseContext();

        [HttpGet]
        public IHttpActionResult Get()
        {
            try
            {
                var result = db.Customers.ToList();
                return Ok(result);
            }
            catch (Exception e)
            {
                var ex = e;
                return InternalServerError();
            }
        }

    }
}
