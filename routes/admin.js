const express = require("express");

const router = express.Router();
const { comapny_display, render_edit_company_form, update_company } = require("../controllers/company_display");

router.get("/salesmanagers",(req,res)=>res.render("owner/sales_managers/salesmanagershome.ejs"));


router.get("/employees", (req, res) => {
    res.render("owner/employee_feature/addemployee.ejs", {
        activePage: 'employee',
        activeRoute: 'employees'
    });
});

router.get("/company", comapny_display);
router.get("/addcompanie", (req, res) => res.render("owner/company_feature/addcompanie", {
    activePage: 'employee',
    activeRoute: 'company',
}));
router.get("/company/edit/:cid", render_edit_company_form);
router.post("/company/edit/:cid", update_company); // Changed to POST

module.exports=router;