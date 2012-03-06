using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DeliveryTracker.Models;
using System.Web.Http.Data.EntityFramework;

namespace DeliveryTracker.Controllers
{
    public class DataServiceController : DbDataController<AppDbContext>
    {
        public IQueryable<Delivery> GetDeliveriesForToday()
        {
            // Could pre-filter by due date, delivery driver, etc...
            return DbContext.Deliveries.Include("Customer").OrderBy(x => x.DeliveryId);
        }

        // Put your custom access control logic in these methods
        public void InsertDelivery(Delivery delivery) { InsertEntity(delivery); }
        public void UpdateDelivery(Delivery delivery) { UpdateEntity(delivery); }
        public void DeleteDelivery(Delivery delivery) { DeleteEntity(delivery); }
    }
}
