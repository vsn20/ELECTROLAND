const express = require("express");
const router = express.Router();

// Salesmanager home
router.get("/home", (req, res) => res.render("salesmanager/home", {
    activePage: 'employee',
    activeRoute: ''
}));

// Salesmanager inventory
const { inventory_display } = require("../controllers/salesmanager/inventory_display");
router.get("/stocks", inventory_display);

// Salesmanager customer
const { customers_display } = require("../controllers/salesmanager/admin_customers_display");
router.get("/customers", customers_display);

// Sales
const { sales_display, sales_details, addsale_post } = require('../controllers/salesmanager/sales');
router.get('/sales', sales_display);
router.get('/sales/:id', sales_details);
router.get('/add-sale', (req, res) => {
    res.render('salesmanager/sales_feature/addsale', {
        activePage: 'employee',
        activeRoute: 'sales'
    });
});
router.post('/add-sale', addsale_post);

// Orders routes
const { orders_display, order_details, order_edit, order_update, addorder_post, renderAddOrderForm } = require('../controllers/salesmanager/orders');
router.get('/orders', orders_display);
router.get('/orders/:id', order_details);
router.get('/orders/edit/:id', order_edit);
router.post('/orders/update/:id', order_update);
router.get('/add-order', renderAddOrderForm);
router.post('/add-order', addorder_post);

// New route for fetching products by company
const { getProductsByCompany } = require("../controllers/salesmanager/products");
router.get("/products-by-company/:companyId", getProductsByCompany);

// Salesmanager salary
const { salary_display } = require("../controllers/salesmanager/salary");
router.get("/salaries", salary_display);

// Salesmanager messages
const { salesmanager_messages_display, render_compose_message_form, compose_message, view_message, view_sent_messages } = require("../controllers/salesmanager/salesmanager_messages_display");
router.get("/messages", salesmanager_messages_display);
router.get("/messages/compose", render_compose_message_form);
router.post("/messages/compose", compose_message);
router.get("/messages/view", view_message); // Route for viewing message details
router.get("/messages/sent", view_sent_messages); 
// Salesmanager employee
const { employeeDisplay, employeeDetail, fireEmployee, editSalesManager, updateSalesManager, renderAddEmployeeForm, addEmployee } = require("../controllers/salesmanager/salesmanager_employee");
router.get("/employees", employeeDisplay);
router.get("/employee-details/:e_id", employeeDetail);
router.post("/employee/fire/:e_id", fireEmployee);
router.get("/edit-salesmanager", editSalesManager);
router.post("/update-salesmanager", updateSalesManager);
router.get("/add-employee", renderAddEmployeeForm);
router.post("/add-employee", addEmployee);

module.exports = router;