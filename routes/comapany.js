const express = require("express");
const router = express.Router();
const { companyproducts_display } = require("../controllers/company/companyproducts_display");
const { getProductById, renderAddProductForm, addProduct, getinventory } = require("../controllers/company/companyproducts_display");
const { 
  orders_display,
  ordersedit_display,
  pendingorders_display,
  pendingedit_display,
  updateOrderStatus,
  updateDeliveryDate
} = require("../controllers/company/orders_display");

const { sales_display, salesdetaildisplay } = require("../controllers/company/sale");
const { company_messages_display, render_compose_message_form, compose_message, view_message, view_sent_messages } = require("../controllers/company/company_messages_display");

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

router.get('/orders', orders_display);

// Edit specific order (for compatibility)
router.get('/orders/edit/:oid', ordersedit_display);

// View pending orders
router.get('/orders/pending', pendingorders_display);

// Edit specific pending order
router.get('/orders/pending/edit/:oid', pendingedit_display);

// Update order status
router.post('/orders/update/:oid', updateOrderStatus);

// Update delivery date
router.post('/orders/update-delivery', updateDeliveryDate);

// Update delivery date
router.post('/orders/update-delivery', updateDeliveryDate);

router.get("/messages", company_messages_display);
router.get("/messages/compose", render_compose_message_form);
router.post("/messages/compose", compose_message);
router.get("/messages/view", view_message);
router.get("/messages/sent", view_sent_messages);


router.get("/sales", sales_display);
router.get("/sales/:salesid", salesdetaildisplay);

module.exports = router;