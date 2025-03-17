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

// Salesmanager salary
const { salary_display } = require("../controllers/salesmanager/salary");
router.get("/salaries", salary_display);

// Salesmanager messages
const { salesmanager_messages_display, render_compose_message_form, compose_message } = require("../controllers/salesmanager/salesmanager_messages_display");
router.get("/messages", salesmanager_messages_display);
router.get("/messages/compose", render_compose_message_form);
router.post("/messages/compose", compose_message);

module.exports = router;