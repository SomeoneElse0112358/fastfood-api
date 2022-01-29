class OrdersFunc {
  filter(filter) {
    if (!filter.user && !filter.numberOfOrder) {
      return {};
    } else if (!filter.numberOfOrder) {
      return { user: filter.user };
    } else if (!filter.user) {
      return { numberOfOrder: filter.numberOfOrder };
    }

    return filter;
  }

  date(date) {
    const dateUtc =
      /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/.test(
        date
      );
    return dateUtc;
  }

  delivery(order) {
    if (this.date(order.timeOfDelivery) == null) {
      return null;
    } else if (
      (order.deliveryMethod == 'Take away' && order.timeOfDelivery) ||
      (order.deliveryMethod == 'Take away' && order.address)
    ) {
      return null;
    } else if (!order.deliveryMethod) {
      return null;
    }
    return order;
  }
}

module.exports = OrdersFunc;
