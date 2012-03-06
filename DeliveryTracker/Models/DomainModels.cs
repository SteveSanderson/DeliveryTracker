using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DeliveryTracker.Models
{
    public class Customer
    {
        public int CustomerId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
    }

    public class Delivery
    {
        // Primary key, and one-to-many relation with Customer
        public int DeliveryId { get; set; }
        public virtual int CustomerId { get; set; }
        public virtual Customer Customer { get; set; }

        // Properties for this delivery
        public string Description { get; set; }
        public bool IsDelivered { get; set; } // <-- This is what we're mainly interested in
    }
}