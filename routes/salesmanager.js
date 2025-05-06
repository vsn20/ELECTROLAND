const express = require("express");
const router = express.Router();
const Employee = require("../models/employees");
const Branch = require("../models/branches");

router.get("/home", (req, res) => {
  console.log('[Route] Accessing /salesmanager/home');
  res.render("salesmanager/home", {
    activePage: 'employee',
    activeRoute: ''
  });
});

const { inventory_display } = require("../controllers/salesmanager/inventory_display");
router.get("/stocks", (req, res) => {
  console.log('[Route] Accessing /salesmanager/stocks');
  inventory_display(req, res);
});

const { customers_display } = require("../controllers/salesmanager/admin_customers_display");
router.get("/customers", (req, res) => {
  console.log('[Route] Accessing /salesmanager/customers');
  customers_display(req, res);
});

const { renderAddSaleForm, sales_display, sales_details, addsale_post, getSalesmen, getCompanies } = require('../controllers/salesmanager/sales');
router.get('/sales', (req, res) => {
  console.log('[Route] Accessing /salesmanager/sales');
  sales_display(req, res);
});
router.get('/sales/:id', (req, res) => {
  console.log('[Route] Accessing /salesmanager/sales/:id');
  sales_details(req, res);
});
router.get('/add-sale', (req, res) => {
  console.log('[Route] Accessing /salesmanager/add-sale');
  renderAddSaleForm(req, res);
});
router.post('/add-sale', (req, res) => {
  console.log('[Route] Posting to /salesmanager/add-sale');
  addsale_post(req, res);
});
router.get('/salesmen', (req, res) => {
  console.log('[Route] Accessing /salesmanager/salesmen');
  getSalesmen(req, res);
});
router.get('/companies', (req, res) => {
  console.log('[Route] Accessing /salesmanager/companies');
  getCompanies(req, res);
});

const { orders_display, order_details, order_edit, order_update, addorder_post, renderAddOrderForm } = require('../controllers/salesmanager/orders');
router.get('/orders', (req, res) => {
  console.log('[Route] Accessing /salesmanager/orders');
  orders_display(req, res);
});
router.get('/orders/:id', (req, res) => {
  console.log('[Route] Accessing /salesmanager/orders/:id');
  order_details(req, res);
});
router.get('/orders/edit/:id', (req, res) => {
  console.log('[Route] Accessing /salesmanager/orders/edit/:id');
  order_edit(req, res);
});
router.post('/orders/update/:id', (req, res) => {
  console.log('[Route] Posting to /salesmanager/orders/update/:id');
  order_update(req, res);
});
router.get('/add-order', (req, res) => {
  console.log('[Route] Accessing /salesmanager/add-order');
  renderAddOrderForm(req, res);
});
router.post('/add-order', (req, res) => {
  console.log('[Route] Posting to /salesmanager/add-order');
  addorder_post(req, res);
});

const { getProductsByCompany } = require("../controllers/salesmanager/orders");
router.get("/products-by-company/:companyId", (req, res) => {
  console.log('[Route] Accessing /salesmanager/products-by-company/:companyId');
  console.log(`[Route] companyId received: ${req.params.companyId}, type: ${typeof req.params.companyId}`);
  getProductsByCompany(req, res);
});

const { salary_display } = require("../controllers/salesmanager/salary");
router.get("/salaries", (req, res) => {
  console.log('[Route] Accessing /salesmanager/salaries');
  salary_display(req, res);
});

const { salesmanager_messages_display, render_compose_message_form, compose_message, view_sent_messages, view_message } = require("../controllers/salesmanager/salesmanager_messages_display");
router.get("/messages", salesmanager_messages_display);
router.get("/messages/compose", render_compose_message_form);
router.post("/messages/compose", compose_message);
router.get("/messages/view", view_message);
router.get("/messages/sent", view_sent_messages);

const { employeeDisplay, employeeDetail, fireEmployee, updateSalesmanSalary, editSalesManager, updateSalesManager, renderAddEmployeeForm, addEmployee } = require("../controllers/salesmanager/salesmanager_employee");
router.get("/employees", (req, res) => {
  console.log('[Route] Accessing /salesmanager/employees');
  employeeDisplay(req, res);
});
router.get("/employee-details/:e_id", (req, res) => {
  console.log('[Route] Accessing /salesmanager/employee-details/:e_id');
  employeeDetail(req, res);
});
router.post("/employee/fire/:e_id", (req, res) => {
  console.log('[Route] Posting to /salesmanager/employee/fire/:e_id');
  fireEmployee(req, res);
});
router.post("/employee/update-salary/:e_id", (req, res) => {
  console.log('[Route] Posting to /salesmanager/employee/update-salary/:e_id');
  updateSalesmanSalary(req, res);
});
router.get("/edit-salesmanager", (req, res) => {
  console.log('[Route] Accessing /salesmanager/edit-salesmanager');
  editSalesManager(req, res);
});
router.post("/update-salesmanager", (req, res) => {
  console.log('[Route] Posting to /salesmanager/update-salesmanager');
  updateSalesManager(req, res);
});
router.get("/add-employee", (req, res) => {
  console.log('[Route] Accessing /salesmanager/add-employee');
  renderAddEmployeeForm(req, res);
});
router.post("/add-employee", (req, res) => {
  console.log('[Route] Posting to /salesmanager/add-employee');
  addEmployee(req, res);
});

module.exports = router;