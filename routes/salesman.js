// ./routes/salesman.js
const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>res.render("salesman/home",{
    activePage: 'employee',
    activeRoute: '',
}));

//salesman-home

router.get("/home",(req,res)=>res.render("salesman/home",{
    activePage: 'employee',
    activeRoute: '',
}));


//salesman-inventory
const {inventory_display}=require("../controllers/salesman/inventory_display");
router.get("/stocks",inventory_display);

//salesman-salary
const {salary_display}=require("../controllers/salesman/salary");
router.get("/salaries",salary_display);

//salesman-profile
const {getSalesmanDetails} = require("../controllers/salesman/profile");
router.get("/employees",getSalesmanDetails)

module.exports = router;