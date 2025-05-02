const express = require("express");
const router = express.Router();
const Company = require("../models/company");
const { getProductsByCompany } = require("../controllers/salesmanager/products");

router.get("/", (req, res) => res.render("salesman/home", {
    activePage: 'employee',
    activeRoute: ''
}));

// Salesman home
router.get("/home", (req, res) => res.render("salesman/home", {
    activePage: 'employee',
    activeRoute: ''
}));

// Salesman inventory
const { inventory_display } = require("../controllers/salesman/inventory_display");
router.get("/stocks", inventory_display);

// Salesman salary
const { salary_display } = require("../controllers/salesman/salary");
router.get("/salaries", salary_display);

// Salesman profile
const { getSalesmanDetails } = require("../controllers/salesman/profile");
router.get("/employees", getSalesmanDetails);

// Salesman sales
const { sales_display, salesdetaildisplay, addSale, renderAddSaleForm } = require("../controllers/salesman/sales");
router.get("/sales", sales_display);
router.get("/sales/:sales_id", salesdetaildisplay);
router.get("/add-sale", renderAddSaleForm);
router.post("/add-sale", addSale);
router.get("/products-by-company/:companyId", getProductsByCompany);

// Salesman messages
const { salesman_messages_display, render_compose_message_form, compose_message, view_message } = require("../controllers/salesman/salesman_messages_display");
router.get("/messages", salesman_messages_display);
router.get("/messages/compose", render_compose_message_form);
router.post("/messages/compose", compose_message);
router.get("/messages/view", view_message);

module.exports = router;