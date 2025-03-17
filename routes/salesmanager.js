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

<<<<<<< HEAD
//admin-salary
const {salary_display}=require("../controllers/salesmanager/salary");
router.get("/salaries",salary_display);

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
const { orders_display, order_details, order_edit, order_update } = require('../controllers/salesmanager/orders');
router.get('/orders', orders_display);
router.get('/orders/:id', order_details);
router.get('/orders/edit/:id', order_edit);
router.post('/orders/update/:id', order_update);
module.exports=router;
=======
// Salesmanager salary
const { salary_display } = require("../controllers/salesmanager/salary");
router.get("/salaries", salary_display);

// Salesmanager messages
const { salesmanager_messages_display, render_compose_message_form, compose_message, view_message } = require("../controllers/salesmanager/salesmanager_messages_display");
router.get("/messages", salesmanager_messages_display);
router.get("/messages/compose", render_compose_message_form);
router.post("/messages/compose", compose_message);
router.get("/messages/view", view_message); // New route for viewing message details

module.exports = router;
>>>>>>> a909ed8624457d3cba6cc87d02607031ec7a1bed
