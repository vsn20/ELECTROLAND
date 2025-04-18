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


//sales
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
const { orders_display, order_details, order_edit, order_update, addorder_post } = require('../controllers/salesmanager/orders');
router.get('/orders', orders_display);
router.get('/orders/:id', order_details);
router.get('/orders/edit/:id', order_edit);
router.post('/orders/update/:id', order_update);
router.get('/add-order', (req, res) => {
    res.render('salesmanager/orders_feature/addorder', {
        activePage: 'employee',
        activeRoute: 'orders'
    });
});
router.post('/add-order', addorder_post);
module.exports=router;
// Salesmanager salary
const { salary_display } = require("../controllers/salesmanager/salary");
router.get("/salaries", salary_display);

// Salesmanager messages
const { salesmanager_messages_display, render_compose_message_form, compose_message, view_message } = require("../controllers/salesmanager/salesmanager_messages_display");
router.get("/messages", salesmanager_messages_display);
router.get("/messages/compose", render_compose_message_form);
router.post("/messages/compose", compose_message);
router.get("/messages/view", view_message); // New route for viewing message details

//salesmanager employee
const { employeeDisplay,employeeDetail } = require("../controllers/salesmanager/salesmanager_employee");
router.get("/employees", employeeDisplay);
router.get("/employee-details/:e_id", employeeDetail);

module.exports = router;
