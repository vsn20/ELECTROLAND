const mongoose = require("mongoose");
const Order = require("../../models/orders");
const Inventory = require("../../models/inventory");
const Branch = require("../../models/branches");
const Company = require("../../models/company");
const Product = require("../../models/products");

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

async function updateInventoryForOrder(order, branch, session) {
  try {
    console.log(`[InventoryUpdate] Starting for order: ${order.order_id}`, {
      status: order.status,
      branch_id: branch.bid,
      branch_name: branch.b_name,
      company_id: order.company_id,
      product_id: order.product_id,
      quantity: order.quantity
    });

    const company = await Company.findOne({ c_id: order.company_id }).lean();
    if (!company) {
      console.error(`[InventoryUpdate] Company not found for c_id: ${order.company_id}`);
      return { success: false, message: `Company not found for c_id: ${order.company_id}` };
    }
    console.log(`[InventoryUpdate] Company found: ${company.cname}`);

    const product = await Product.findOne({ prod_id: order.product_id }).lean();
    if (!product) {
      console.error(`[InventoryUpdate] Product not found for prod_id: ${order.product_id}`);
      return { success: false, message: `Product not found for prod_id: ${order.product_id}` };
    }
    console.log(`[InventoryUpdate] Product found: ${product.Prod_name}`);

    let inventory = await Inventory.findOne({
      branch_id: branch.bid,
      product_id: order.product_id,
      company_id: order.company_id
    }).session(session);

    if (inventory) {
      const oldQuantity = inventory.quantity;
      inventory.quantity = oldQuantity + parseInt(order.quantity);
      inventory.updatedAt = new Date();
      await inventory.save({ session });
      console.log(`[InventoryUpdate] Updated existing inventory: ${inventory._id}`, {
        old_quantity: oldQuantity,
        added_quantity: parseInt(order.quantity),
        new_quantity: inventory.quantity,
        branch_id: inventory.branch_id,
        product_id: inventory.product_id,
        company_id: inventory.company_id
      });
    } else {
      inventory = new Inventory({
        branch_id: branch.bid,
        branch_name: branch.b_name,
        product_id: order.product_id,
        product_name: product.Prod_name,
        company_id: order.company_id,
        company_name: company.cname,
        model_no: product.Model_no,
        quantity: parseInt(order.quantity)
      });
      await inventory.save({ session });
      console.log(`[InventoryUpdate] Created new inventory: ${inventory._id}`, {
        quantity: inventory.quantity,
        branch_id: inventory.branch_id,
        product_id: inventory.product_id,
        company_id: inventory.company_id
      });
    }

    return { success: true };
  } catch (error) {
    console.error(`[InventoryUpdate] Error for order: ${order.order_id}`, {
      error_message: error.message,
      stack: error.stack
    });
    return { success: false, message: error.message };
  }
}

async function updateOrderStatus(req, res) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { status, delivery_date } = req.body;
    console.log("[UpdateOrderStatus] Starting:", {
      user: req.user,
      request_body: { order_id: req.params.oid, status, delivery_date }
    });

    const order = await Order.findOne({ order_id: req.params.oid, company_id: req.user.c_id }).session(session);
    if (!order) {
      console.log("[UpdateOrderStatus] Order not found:", { order_id: req.params.oid, company_id: req.user.c_id });
      await session.abortTransaction();
      return res.status(404).send("Order not found");
    }
    console.log("[UpdateOrderStatus] Order found:", {
      order_id: order.order_id,
      current_status: order.status,
      branch_id: order.branch_id,
      company_id: order.company_id,
      product_id: order.product_id,
      quantity: order.quantity
    });

    const branch = await Branch.findOne({ bid: order.branch_id, active: "active" }).lean();
    if (!branch) {
      console.log("[UpdateOrderStatus] No active branch:", order.branch_id);
      await session.abortTransaction();
      return res.status(403).send(`No active branch for order: ${req.params.oid}`);
    }

    if (status && status.toLowerCase() === "accepted" && order.status.toLowerCase() !== "accepted") {
      console.log(`[UpdateOrderStatus] Status changing to Accepted for order: ${order.order_id}`);
      const inventoryResult = await updateInventoryForOrder(order, branch, session);
      if (!inventoryResult.success) {
        console.error(`[UpdateOrderStatus] Inventory update failed: ${inventoryResult.message}`);
        await session.abortTransaction();
        return res.status(400).send(`Failed to update inventory: ${inventoryResult.message}`);
      }
      console.log(`[UpdateOrderStatus] Inventory updated for order: ${order.order_id}`);
    }

    const updateData = { status };
    if (delivery_date) {
      updateData.delivery_date = new Date(delivery_date);
    }

    await Order.updateOne(
      { order_id: req.params.oid, company_id: req.user.c_id },
      updateData,
      { session }
    );

    await session.commitTransaction();
    console.log(`[UpdateOrderStatus] Order updated: ${req.params.oid}`, {
      status,
      delivery_date: delivery_date || order.delivery_date
    });

    res.redirect("/company/orders");
  } catch (error) {
    await session.abortTransaction();
    console.error("[UpdateOrderStatus] Error:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  } finally {
    session.endSession();
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