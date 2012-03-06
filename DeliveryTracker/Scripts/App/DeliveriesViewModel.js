/// <reference path="../_references.js" />

function DeliveriesViewModel() {
    // Data
    var self = this;
    self.dataSource = upshot.dataSources.DeliveriesForToday.refresh();
    self.localDataSource = upshot.LocalDataSource({ source: self.dataSource, autoRefresh: true });

    self.deliveries = self.localDataSource.getEntities();
    self.deliveriesForCustomer = self.deliveries.groupBy("Customer");
    self.excludeDelivered = ko.observable(false);

    // Operations
    self.saveAll = function () { self.dataSource.commitChanges() }
    self.revertAll = function () { self.dataSource.revertChanges() }

    self.excludeDelivered.subscribe(function (shouldExcludeDelivered) {
        var filterRule = shouldExcludeDelivered ? { property: "IsDelivered", operation: "==", value: false }
                                                : null;
        self.localDataSource.setFilter(filterRule);
        self.localDataSource.refresh(); 
    });
}

function MobileDeliveriesViewModel() {
    // Inherit from DeliveriesViewModel
    var self = this;
    DeliveriesViewModel.call(self);

    // Data
    self.currentDelivery = ko.observable();
    self.nav = new NavHistory({
        params: { view: 'deliveries', deliveryId: null },
        onNavigate: function (navEntry) {
            var requestedDeliveryId = navEntry.params.deliveryId;
            self.dataSource.findById(requestedDeliveryId, self.currentDelivery);
        }
    });

    self.nav.initialize({ linkToUrl: true });

    // Operations
    self.showDeliveries = function () { self.nav.navigate({ view: 'deliveries' }) }
    self.showCustomers = function () { self.nav.navigate({ view: 'customers' }) }

    self.showDelivery = function (delivery) {
        self.nav.navigate({ view: 'delivery', deliveryId: delivery.DeliveryId() })
    }
}
