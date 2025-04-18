const express = require("express");
const router = express.Router();
const { companyproducts_display } = require("../controllers/company/companyproducts_display");
const { getProductById, renderAddProductForm, addProduct, getinventory } = require("../controllers/company/companyproducts_display");
const { orders_display, ordersedit_display, pendingorders_display, pendingedit_display } = require("../controllers/company/orders_display");
const { company_messages_display, render_compose_message_form, compose_message, view_message } = require("../controllers/company/company_messages_display");
const { sales_display, salesdetaildisplay } = require("../controllers/company/sale");

router.get("/home", (req, res) => res.render("company/home", {
  activePage: 'company',
  activeRoute: ''
}));
router.get("/products", companyproducts_display);
router.get("/products/details/:prod_id", getProductById);
router.get("/products/add", renderAddProductForm);
router.post("/products/add", addProduct);
router.get("/stocks", getinventory);
router.get("/stocks/:orderid", ordersedit_display);

router.get("/orders", orders_display);
router.get("/orders/pending", pendingorders_display);
router.get("/orders/pending/edit", pendingedit_display);
router.get("/orders/:oid", ordersedit_display);

router.get("/messages", company_messages_display);
router.get("/messages/compose", render_compose_message_form);
router.post("/messages/compose", compose_message);
router.get("/messages/view", view_message);

router.get("/sales", sales_display);
router.get("/sales/:salesid", salesdetaildisplay);

module.exports = router;