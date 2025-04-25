const mongoose = require("mongoose");
const Company = require("../../models/company");
const Product = require("../../models/products");
const Order = require("../../models/orders");
const Branch = require("../../models/branches");
const Employee = require("../../models/employees");
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

const order_update = async (req, res) => {
  try {
    console.log("Session user:", req.user);
    const employee = await Employee.findOne({ e_id: req.user.emp_id }).lean();

    if (!employee) {
      console.log("Employee not found for emp_id:", req.user.emp_id);
      return res.status(403).json({ success: false, message: `No employee found for emp_id: ${req.user.emp_id}.` });
    }

    if (employee.status !== "active") {
      console.log("Employee found but not active:", { e_id: employee.e_id, status: employee.status });
      return res.status(403).json({ success: false, message: `Employee (e_id: ${employee.e_id}) is not active (status: ${employee.status}).` });
    }

    if (!employee.bid) {
      console.log("Employee has no bid assigned:", { e_id: employee.e_id, _id: employee._id.toString() });
      return res.status(403).json({ success: false, message: `No branch assigned to this employee (e_id: ${employee.e_id}).` });
    }

    const branch = await Branch.findOne({ 
      bid: employee.bid, 
      active: "active" 
    }).lean();

    if (!branch) {
      console.log("No active branch found for bid:", employee.bid);
      return res.status(403).json({ success: false, message: `No active branch found for bid: ${employee.bid} (e_id: ${employee.e_id}).` });
    }

    const { status } = req.body;
    const order = await Order.findOneAndUpdate(
      { order_id: req.params.id, branch_name: branch.b_name },
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found or not accessible' });
    }
    res.json({ success: true, redirect: '/salesmanager/orders' });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const addorder_post = async (req, res) => {
  try {
    const { branch_name, company_id, product_id, quantity, ordered_date } = req.body;
    console.log("Session user:", req.user);
    const employee = await Employee.findOne({ e_id: req.user.emp_id }).lean();

    if (!employee) {
      console.log("Employee not found for emp_id:", req.user.emp_id);
      return res.status(403).json({ success: false, message: `No employee found for emp_id: ${req.user.emp_id}.` });
    }

    if (employee.status !== "active") {
      console.log("Employee found but not active:", { e_id: employee.e_id, status: employee.status });
      return res.status(403).json({ success: false, message: `Employee (e_id: ${employee.e_id}) is not active (status: ${employee.status}).` });
    }

    if (!employee.bid) {
      console.log("Employee has no bid assigned:", { e_id: employee.e_id, _id: employee._id.toString() });
      return res.status(403).json({ success: false, message: `No branch assigned to this employee (e_id: ${employee.e_id}).` });
    }

    const branch = await Branch.findOne({ 
      bid: employee.bid, 
      b_name: branch_name, 
      active: "active" 
    }).lean();

    if (!branch) {
      console.log("No active branch found for bid and branch_name:", { bid: employee.bid, branch_name });
      return res.status(403).json({ success: false, message: `No active branch found for bid: ${employee.bid}, branch_name: ${branch_name} (e_id: ${employee.e_id}).` });
    }

    const company = await Company.findOne({ c_id: company_id }).lean();
    const product = await Product.findOne({ prod_id: product_id }).lean();

    if (!company || !product) {
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
    res.json({ success: true, redirect: "/salesmanager/orders" });
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// New function for company to update delivery date
const updateDeliveryDate = async (req, res) => {
  try {
    const { order_id, delivery_date } = req.body;
    console.log("Company session user:", req.user);

    // Find the company
    const company = await Company.findOne({ c_id: req.user.c_id }).lean();
    if (!company) {
      console.log("Company not found for c_id:", req.user.c_id);
      return res.status(403).json({ success: false, message: `No company found for c_id: ${req.user.c_id}.` });
    }

    // Update the order's delivery date
    const order = await Order.findOneAndUpdate(
      { order_id, company_id: company.c_id },
      { delivery_date: new Date(delivery_date) },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found or not accessible' });
    }

    res.json({ success: true, redirect: '/company/orders' });
  } catch (error) {
    console.error("Error updating delivery date:", error);
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
  updateDeliveryDate
};