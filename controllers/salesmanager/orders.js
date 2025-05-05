const mongoose = require("mongoose");
const Company = require("../../models/company");
const Product = require("../../models/products");
const Order = require("../../models/orders");
const Branch = require("../../models/branches");
const Employee = require("../../models/employees");
const Inventory = require("../../models/inventory");
const { v4: uuidv4 } = require('uuid');

async function renderAddOrderForm(req, res) {
  try {
    console.log("Session user:", req.user);
    const allEmployees = await Employee.find().lean();
    console.log("Available employee e_ids:", allEmployees.map(e => e.e_id));
    const employee = await Employee.findOne({ e_id: req.user.emp_id }).lean();

    if (!employee) {
      console.log("Employee not found for emp_id:", req.user.emp_id);
      return res.status(403).send(`No employee found for emp_id: ${req.user.emp_id}. Verify your login credentials or contact the administrator.`);
    }

    if (employee.status !== "active") {
      console.log("Employee found but not active:", { e_id: employee.e_id, status: employee.status });
      return res.status(403).send(`Employee (e_id: ${employee.e_id}) is not active (status: ${employee.status}). Contact the administrator to activate your account.`);
    }
    console.log("Employee found:", { e_id: employee.e_id, _id: employee._id.toString(), bid: employee.bid, role: employee.role });

    if (!employee.bid) {
      console.log("Employee has no bid assigned:", { e_id: employee.e_id, _id: employee._id.toString() });
      return res.status(403).send(`No branch assigned to this employee (e_id: ${employee.e_id}). Contact the administrator to assign a branch.`);
    }

    const branch = await Branch.findOne({ 
      bid: employee.bid, 
      active: "active" 
    }).lean();

    if (!branch) {
      console.log("No active branch found for bid:", employee.bid);
      const allBranches = await Branch.find({ active: "active" }).lean();
      console.log("All active branches:", allBranches.map(b => ({ bid: b.bid, b_name: b.b_name })));
      return res.status(403).send(`No active branch found for bid: ${employee.bid} (e_id: ${employee.e_id}). Contact the administrator to verify branch assignment.`);
    }
    console.log("Branch found:", { bid: branch.bid, b_name: branch.b_name });

    const companies = await Company.find({ active: "active" }).lean();
    res.render("salesmanager/orders_feature/addorder", {
      activePage: "employee",
      activeRoute: "orders",
      companies,
      branchname: branch.b_name,
      branchid: branch.bid
    });
  } catch (error) {
    console.error("Error rendering add order form:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function getProductsByCompany(req, res) {
  try {
    const companyId = req.params.companyId;
    console.log(`Fetching products for companyId: ${companyId}`);

    const products = await Product.find({ 
      Com_id: companyId, 
      Status: { $ne: new RegExp('^Rejected$', 'i') }
    }).lean();

    console.log("Products fetched:", products.map(p => ({
      prod_id: p.prod_id,
      Prod_name: p.Prod_name,
      Com_id: p.Com_id,
      Status: p.Status
    })));

    if (products.length === 0) {
      console.log(`No non-rejected products found for companyId: ${companyId}`);
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching products by company:", error);
    res.status(500).json({ messageCULPRIT: "Internal Server Error" });
  }
}

const orders_display = async (req, res) => {
  try {
    console.log("Session user:", req.user);
    const allEmployees = await Employee.find().lean();
    console.log("Available employee e_ids:", allEmployees.map(e => e.e_id));
    const employee = await Employee.findOne({ e_id: req.user.emp_id }).lean();

    if (!employee) {
      console.log("Employee not found for emp_id:", req.user.emp_id);
      return res.status(403).send(`No employee found for emp_id: ${req.user.emp_id}. Verify your login credentials or contact the administrator.`);
    }

    if (employee.status !== "active") {
      console.log("Employee found but not active:", { e_id: employee.e_id, status: employee.status });
      return res.status(403).send(`Employee (e_id: ${employee.e_id}) is not active (status: ${employee.status}). Contact the administrator to activate your account.`);
    }
    console.log("Employee found:", { e_id: employee.e_id, _id: employee._id.toString(), bid: employee.bid, role: employee.role });

    if (!employee.bid) {
      console.log("Employee has no bid assigned:", { e_id: employee.e_id, _id: employee._id.toString() });
      return res.status(403).send(`No branch assigned to this employee (e_id: ${employee.e_id}). Contact the administrator to assign a branch.`);
    }

    const branch = await Branch.findOne({ 
      bid: employee.bid, 
      active: "active" 
    }).lean();

    if (!branch) {
      console.log("No active branch found for bid:", employee.bid);
      const allBranches = await Branch.find({ active: "active" }).lean();
      console.log("All active branches:", allBranches.map(b => ({ bid: b.bid, b_name: b.b_name })));
      return res.status(403).send(`No active branch found for bid: ${employee.bid} (e_id: ${employee.e_id}). Contact the administrator to verify branch assignment.`);
    }
    console.log("Branch found:", { bid: branch.bid, b_name: branch.b_name });

    const orders = await Order.find({ branch_name: branch.b_name }).lean();
    res.render('salesmanager/orders_feature/ordersdisplay', {
      activePage: 'employee',
      activeRoute: 'orders',
      orders,
      branchid: branch.bid,
      branchname: branch.b_name
    });
  } catch (error) {
    console.error("Error displaying orders:", error);
    res.status(500).send('Internal Server Error');
  }
};

const order_details = async (req, res) => {
  try {
    console.log("Session user:", req.user);
    const employee = await Employee.findOne({ e_id: req.user.emp_id }).lean();

    if (!employee) {
      console.log("Employee not found for emp_id:", req.user.emp_id);
      return res.status(403).send(`No employee found for emp_id: ${req.user.emp_id}. Verify your login credentials.`);
    }

    if (employee.status !== "active") {
      console.log("Employee found but not active:", { e_id: employee.e_id, status: employee.status });
      return res.status(403).send(`Employee (e_id: ${employee.e_id}) is not active (status: ${employee.status}). Contact the administrator.`);
    }

    if (!employee.bid) {
      console.log("Employee has no bid assigned:", { e_id: employee.e_id, _id: employee._id.toString() });
      return res.status(403).send(`No branch assigned to this employee (e_id: ${employee.e_id}).`);
    }

    const branch = await Branch.findOne({ 
      bid: employee.bid, 
      active: "active" 
    }).lean();

    if (!branch) {
      console.log("No active branch found for bid:", employee.bid);
      return res.status(403).send(`No active branch found for bid: ${employee.bid} (e_id: ${employee.e_id}).`);
    }

    const order = await Order.findOne({ 
      order_id: req.params.id, 
      branch_name: branch.b_name 
    }).lean();

    if (!order) {
      return res.status(404).send('Order not found or not accessible');
    }
    res.render('salesmanager/orders_feature/orderdetails', {
      activePage: 'employee',
      activeRoute: 'orders',
      order
    });
  } catch (error) {
    console.error("Error displaying order details:", error);
    res.status(500).send('Internal Server Error');
  }
};

const order_edit = async (req, res) => {
  try {
    console.log("Session user:", req.user);
    const employee = await Employee.findOne({ e_id: req.user.emp_id }).lean();

    if (!employee) {
      console.log("Employee not found for emp_id:", req.user.emp_id);
      return res.status(403).send(`No employee found for emp_id: ${req.user.emp_id}. Verify your login credentials.`);
    }

    if (employee.status !== "active") {
      console.log("Employee found but not active:", { e_id: employee.e_id, status: employee.status });
      return res.status(403).send(`Employee (e_id: ${employee.e_id}) is not active (status: ${employee.status}). Contact the administrator.`);
    }

    if (!employee.bid) {
      console.log("Employee has no bid assigned:", { e_id: employee.e_id, _id: employee._id.toString() });
      return res.status(403).send(`No branch assigned to this employee (e_id: ${employee.e_id}).`);
    }

    const branch = await Branch.findOne({ 
      bid: employee.bid, 
      active: "active" 
    }).lean();

    if (!branch) {
      console.log("No active branch found for bid:", employee.bid);
      return res.status(403).send(`No active branch found for bid: ${employee.bid} (e_id: ${employee.e_id}).`);
    }

    const order = await Order.findOne({ 
      order_id: req.params.id, 
      branch_name: branch.b_name 
    }).lean();

    if (!order) {
      return res.status(404).send('Order not found or not accessible');
    }
    res.render('salesmanager/orders_feature/orderedit', {
      activePage: 'employee',
      activeRoute: 'orders',
      order
    });
  } catch (error) {
    console.error("Error displaying order edit:", error);
    res.status(500).send('Internal Server Error');
  }
};

// Shared function to update inventory when order is accepted
async function updateInventoryForOrder(order, branch) {
  try {
    console.log(`[Inventory Update] Starting for order: ${order.order_id}`, {
      status: order.status,
      branch_id: branch.bid,
      branch_name: branch.b_name,
      company_id: order.company_id,
      product_id: order.product_id,
      quantity: order.quantity
    });
    
    const company = await Company.findOne({ c_id: order.company_id }).lean();
    if (!company) {
      console.error(`[Inventory Update] Company not found for c_id: ${order.company_id}`);
      return { success: false, message: `Company not found for c_id: ${order.company_id}` };
    }
    console.log(`[Inventory Update] Company found: ${company.cname}`);

    const product = await Product.findOne({ prod_id: order.product_id }).lean();
    if (!product) {
      console.error(`[Inventory Update] Product not found for prod_id: ${order.product_id}`);
      return { success: false, message: `Product not found for prod_id: ${order.product_id}` };
    }
    console.log(`[Inventory Update] Product found: ${product.Prod_name}`);

    let inventory = await Inventory.findOne({
      branch_id: branch.bid,
      product_id: order.product_id,
      company_id: order.company_id
    });

    if (inventory) {
      inventory.quantity += parseInt(order.quantity);
      inventory.updatedAt = new Date();
      await inventory.save();
      console.log(`[Inventory Update] Updated existing inventory: ${inventory._id}`, {
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
      await inventory.save();
      console.log(`[Inventory Update] Created new inventory: ${inventory._id}`, {
        quantity: inventory.quantity,
        branch_id: inventory.branch_id,
        product_id: inventory.product_id,
        company_id: inventory.company_id
      });
    }

    return { success: true };
  } catch (error) {
    console.error(`[Inventory Update] Error for order: ${order.order_id}`, {
      error_message: error.message,
      stack: error.stack
    });
    return { success: false, message: error.message };
  }
}

const order_update = async (req, res) => {
  try {
    console.log("[Order Update] Session user:", req.user);
    const employee = await Employee.findOne({ e_id: req.user.emp_id }).lean();

    if (!employee) {
      console.log("[Order Update] Employee not found for emp_id:", req.user.emp_id);
      return res.status(403).json({ success: false, message: `No employee found for emp_id: ${req.user.emp_id}.` });
    }

    if (employee.status !== "active") {
      console.log("[Order Update] Employee found but not active:", { e_id: employee.e_id, status: employee.status });
      return res.status(403).json({ success: false, message: `Employee (e_id: ${employee.e_id}) is not active (status: ${employee.status}).` });
    }

    if (!employee.bid) {
      console.log("[Order Update] Employee has no bid assigned:", { e_id: employee.e_id, _id: employee._id.toString() });
      return res.status(403).json({ success: false, message: `No branch assigned to this employee (e_id: ${employee.e_id}).` });
    }

    const branch = await Branch.findOne({ 
      bid: employee.bid, 
      active: "active" 
    }).lean();

    if (!branch) {
      console.log("[Order Update] No active branch found for bid:", employee.bid);
      return res.status(403).json({ success: false, message: `No active branch found for bid: ${employee.bid} (e_id: ${employee.e_id}).` });
    }

    const { status } = req.body;
    console.log(`[Order Update] Request: order_id=${req.params.id}, new_status=${status}`);

    const order = await Order.findOne({ order_id: req.params.id, branch_name: branch.b_name });
    if (!order) {
      console.log(`[Order Update] Order not found: ${req.params.id}, branch: ${branch.b_name}`);
      return res.status(404).json({ success: false, message: 'Order not found or not accessible' });
    }

    // Check if status is changing to "Accepted" and wasn't previously "Accepted"
    if (status && status == "Accepted" && order.status.toLowerCase() != "Accepted") {
      console.log(`[Order Update] Status changing to Accepted for order: ${order.order_id}`);
      const inventoryResult = await updateInventoryForOrder(order, branch);
      if (!inventoryResult.success) {
        console.log(`[Order Update] Inventory update failed: ${inventoryResult.message}`);
        return res.status(400).json({ success: false, message: `Failed to update inventory: ${inventoryResult.message}` });
      }
    }

    // Update order status
    order.status = status;
    await order.save();
    console.log(`[Order Update] Order status updated: ${order.order_id}, new_status: ${status}`);

    res.json({ success: true, redirect: '/salesmanager/orders' });
  } catch (error) {
    console.error("[Order Update] Error:", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const addorder_post = async (req, res) => {
  try {
    const { branch_name, company_id, product_id, quantity, ordered_date } = req.body;
    console.log("[Add Order] Session user:", req.user, "Request body:", req.body);
    const employee = await Employee.findOne({ e_id: req.user.emp_id }).lean();

    if (!employee) {
      console.log("[Add Order] Employee not found for emp_id:", req.user.emp_id);
      return res.status(403).json({ success: false, message: `No employee found for emp_id: ${req.user.emp_id}.` });
    }

    if (employee.status !== "active") {
      console.log("[Add Order] Employee found but not active:", { e_id: employee.e_id, status: employee.status });
      return res.status(403).json({ success: false, message: `Employee (e_id: ${employee.e_id}) is not active (status: ${employee.status}).` });
    }

    if (!employee.bid) {
      console.log("[Add Order] Employee has no bid assigned:", { e_id: employee.e_id, _id: employee._id.toString() });
      return res.status(403).json({ success: false, message: `No branch assigned to this employee (e_id: ${employee.e_id}).` });
    }

    const branch = await Branch.findOne({ 
      bid: employee.bid, 
      b_name: branch_name, 
      active: "active" 
    }).lean();

    if (!branch) {
      console.log("[Add Order] No active branch found for bid and branch_name:", { bid: employee.bid, branch_name });
      return res.status(403).json({ success: false, message: `No active branch found for bid: ${employee.bid}, branch_name: ${branch_name} (e_id: ${employee.e_id}).` });
    }

    const company = await Company.findOne({ c_id: company_id }).lean();
    const product = await Product.findOne({ prod_id: product_id }).lean();

    if (!company || !product) {
      console.log("[Add Order] Invalid company or product:", { company_id, product_id });
      return res.status(400).json({ success: false, message: "Invalid company or product" });
    }

    const order = new Order({
      order_id: `ORD-${uuidv4().slice(0, 8)}`,
      branch_id: branch.bid,
      branch_name,
      company_id,
      company_name: company.cname,
      product_id,
      product_name: product.Prod_name,
      quantity: parseInt(quantity),
      ordered_date: new Date(ordered_date),
      status: "Pending",
      installation_type: product.installationType || "None"
    });

    await order.save();
    console.log(`[Add Order] Order created: ${order.order_id}, status: ${order.status}`);
    res.json({ success: true, redirect: "/salesmanager/orders" });
  } catch (error) {
    console.error("[Add Order] Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateDeliveryDate = async (req, res) => {
  try {
    const { order_id, delivery_date, status } = req.body;
    console.log("[Update Delivery] Starting:", {
      user: req.user,
      request_body: { order_id, delivery_date, status }
    });

    const company = await Company.findOne({ c_id: req.user.c_id }).lean();
    if (!company) {
      console.log("[Update Delivery] Company not found for c_id:", req.user.c_id);
      return res.status(403).json({ success: false, message: `No company found for c_id: ${req.user.c_id}.` });
    }
    console.log("[Update Delivery] Company found:", { c_id: company.c_id, cname: company.cname });

    const order = await Order.findOne({ order_id, company_id: company.c_id });
    if (!order) {
      console.log("[Update Delivery] Order not found:", { order_id, company_id: company.c_id });
      return res.status(404).json({ success: false, message: 'Order not found or not accessible' });
    }
    console.log("[Update Delivery] Order found:", {
      order_id: order.order_id,
      current_status: order.status,
      branch_id: order.branch_id,
      company_id: order.company_id,
      product_id: order.product_id,
      quantity: order.quantity
    });

    const branch = await Branch.findOne({ bid: order.branch_id, active: "active" }).lean();
    if (!branch) {
      console.log("[Update Delivery] No active branch found for bid:", order.branch_id);
      return res.status(403).json({ success: false, message: `No active branch found for order: ${order_id}` });
    }
    console.log("[Update Delivery] Branch found:", { bid: branch.bid, b_name: branch.b_name });

    // Check if status is changing to "Accepted"
    if (status) {
      console.log(`[Update Delivery] Processing status update: new_status=${status}, current_status=${order.status}`);
      if (status.toLowerCase() === "accepted" && order.status.toLowerCase() !== "accepted") {
        console.log(`[Update Delivery] Status changing to Accepted for order: ${order_id}`);
        const inventoryResult = await updateInventoryForOrder(order, branch);
        if (!inventoryResult.success) {
          console.error(`[Update Delivery] Inventory update failed for order: ${order_id}`, inventoryResult.message);
          return res.status(400).json({ success: false, message: `Failed to update inventory: ${inventoryResult.message}` });
        }
        console.log(`[Update Delivery] Inventory updated successfully for order: ${order_id}`);
      } else {
        console.log(`[Update Delivery] Status not changing to Accepted or already Accepted: new_status=${status}`);
      }
      order.status = status;
    } else {
      console.log(`[Update Delivery] No status provided for order: ${order_id}`);
    }

    // Update delivery date if provided
    if (delivery_date) {
      order.delivery_date = new Date(delivery_date);
    }

    await order.save();
    console.log(`[Update Delivery] Order updated: ${order_id}`, {
      status: order.status,
      delivery_date: order.delivery_date,
      branch_id: order.branch_id,
      company_id: order.company_id,
      product_id: order.product_id
    });

    res.json({ success: true, redirect: '/company/orders' });
  } catch (error) {
    console.error("[Update Delivery] Error:", {
      error_message: error.message,
      stack: error.stack
    });
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  orders_display,
  order_details,
  order_edit,
  order_update,
  addorder_post,
  renderAddOrderForm,
  getProductsByCompany,
  updateDeliveryDate
};