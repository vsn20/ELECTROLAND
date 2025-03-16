const express = require("express");

const router = express.Router();

//salesmanager-home
router.get("/home",(req,res)=>res.render("salesmanager/home",{
    activePage: 'employee',
    activeRoute: '',
}))
//salesmanager-inventory
const {inventory_display}=require("../controllers/salesmanager/inventory_display");
router.get("/stocks",inventory_display);

//salesmanager-customer
const { customers_display} = require("../controllers/salesmanager/admin_customers_display");
router.get("/customers", customers_display);

module.exports=router;