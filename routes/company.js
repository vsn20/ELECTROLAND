const express = require("express");
const router = express.Router();
const {companyproducts_display }= require("../controllers/company/companyproducts_display");
const { getProductById,renderAddProductForm, addProduct, getinventory } = require("../controllers/company/companyproducts_display"); // Adjust path based on structure
const { orders_display } = require("../controllers/company/orders_display");

router.get("/products", companyproducts_display);
router.get("/products/details/:prod_id", getProductById);
router.get("/products/add", renderAddProductForm);
router.post("/products/add", addProduct);
router.get("/stocks", getinventory);
router.get("/orders", orders_display);

// Route for product listing (for "Back to Products" link)

module.exports = router;