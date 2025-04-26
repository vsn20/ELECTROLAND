const Order = require("../../models/orders");

async function orders_display(req, res) {
  try {
    const orders = await Order.find({ company_id: req.user.c_id }).lean();
    res.render("company/orders_feature/orderdata", {
      activePage: "company",
      activeRoute: "orders",
      orders
    });
  } catch (error) {
    console.error("Error rendering orders:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
}

async function ordersedit_display(req, res) {
  try {
    const order = await Order.findOne({ order_id: req.params.oid, company_id: req.user.c_id }).lean();
    if (!order) {
      return res.status(404).send("Order not found");
    }
    res.render("company/orders_feature/orderedit", {
      activePage: "company",
      activeRoute: "orders",
      order
    });
  } catch (error) {
    console.error("Error rendering edit order form:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
}

async function pendingorders_display(req, res) {
  try {
    const orders = await Order.find({ 
      company_id: req.user.c_id, 
      status: "Pending" 
    }).lean();
    res.render("company/orders_feature/pendingorderdata", {
      activePage: "company",
      activeRoute: "orders",
      orders
    });
  } catch (error) {
    console.error("Error rendering pending orders:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
}

async function pendingedit_display(req, res) {
  try {
    const order = await Order.findOne({ 
      order_id: req.params.oid, 
      company_id: req.user.c_id, 
      status: "Pending" 
    }).lean();
    if (!order) {
      return res.status(404).send("Order not found or not pending");
    }
    res.render("company/orders_feature/pendingedit", {
      activePage: "company",
      activeRoute: "orders",
      order
    });
  } catch (error) {
    console.error("Error rendering pending edit form:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
}

async function updateOrderStatus(req, res) {
  try {
    const { status, delivery_date } = req.body;
    const updateData = { status };
    if (delivery_date) {
      updateData.delivery_date = new Date(delivery_date);
    }
    const order = await Order.findOneAndUpdate(
      { order_id: req.params.oid, company_id: req.user.c_id },
      updateData,
      { new: true }
    );
    if (!order) {
      return res.status(404).send("Order not found");
    }
    res.redirect("/company/orders");
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
}

async function updateDeliveryDate(req, res) {
  try {
    const { order_id, delivery_date } = req.body;
    const order = await Order.findOneAndUpdate(
      { order_id, company_id: req.user.c_id },
      { delivery_date: new Date(delivery_date) },
      { new: true }
    );
    if (!order) {
      return res.status(404).send("Order not found");
    }
    res.redirect("/company/orders");
  } catch (error) {
    console.error("Error updating delivery date:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
}

module.exports = {
  orders_display,
  ordersedit_display,
  pendingorders_display,
  pendingedit_display,
  updateOrderStatus,
  updateDeliveryDate
};