const express = require("express");

const router = express.Router();


router.get("/salesmanagers",(req,res)=>res.render("owner/sales_managers/salesmanagershome.ejs"));


router.get("/employees", (req, res) => {
    res.render("owner/employee_feature/addemployee.ejs", {
        activePage: 'employee',
        activeRoute: 'employees'
    });
});

module.exports=router;