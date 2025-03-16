const express = require("express");

const router = express.Router();

//salesmanager-inventory
const {inventory_display}=require("../controllers/salesmanager/inventory_display");
router.get("/stocks",inventory_display);

module.exports=router;