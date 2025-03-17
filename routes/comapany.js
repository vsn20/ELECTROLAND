const express = require("express");
const router = express.Router();
const { companyproducts_display } = require("../controllers/company/companyproducts_display");
const { getProductById, renderAddProductForm, addProduct, getinventory } = require("../controllers/company/companyproducts_display");
const { orders_display } = require("../controllers/company/orders_display");
const { company_messages_display, render_compose_message_form, compose_message } = require("../controllers/company/company_messages_display"); // New controller

router.get("/home", (req, res) => res.render("company/home", {
    activePage: 'company',
    activeRoute: ''
}));
router.get("/products", companyproducts_display);
router.get("/products/details/:prod_id", getProductById);
router.get("/products/add", renderAddProductForm);
router.post("/products/add", addProduct);
router.get("/stocks", getinventory);
router.get("/orders", orders_display);

// Company messages routes
router.get("/messages", company_messages_display);
router.get("/messages/compose", render_compose_message_form);
router.post("/messages/compose", compose_message);

module.exports = router;