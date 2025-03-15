const express = require("express");

const router = express.Router();

router.get("/salesmanagers",(req,res)=>res.render("owner/sales_managers/salesmanagershome.ejs"));


router.get("/employees", (req, res) => {
    res.render("owner/employee_feature/addemployee.ejs", {
        activePage: 'employee',
        activeRoute: 'employees'
    });
});

//admin-company
const { comapny_display, render_edit_company_form, update_company } = require("../controllers/company_display");
router.get("/company", comapny_display);
router.get("/addcompanie", (req, res) => res.render("owner/company_feature/addcompanie", {
    activePage: 'employee',
    activeRoute: 'company',
}));
router.get("/company/edit/:cid", render_edit_company_form);
router.post("/company/edit/:cid", update_company); // Changed to POST

//admin-branches
const { branches_display, render_add_branch_form, /*add_branch,*/ render_edit_branch_form, update_branch } = require("../controllers/admin_branches_display");

router.get("/branches", branches_display);
router.get("/branches/add", render_add_branch_form);
router.get("/branches/edit/:bid", render_edit_branch_form);
router.post("/branches/edit/:bid", update_branch);

//admin-customers
const { customers_display} = require("../controllers/admin_customers_display");
router.get("/customers", customers_display);

//admin-inventory
const {inventory_display}=require("../controllers/inventory_display");
router.get("/stocks",inventory_display);

//admin-sales
const { sales_display,salesdetaildisplay } = require('../controllers/sales_display');
router.get('/sales',sales_display);
router.get('/sales/:sales_id',salesdetaildisplay);

//admin-profits
const {profits_display} = require('../controllers/profits_display')
router.get('/profits', profits_display);

//inventory
const {inventory_display}=require("../controllers/inventory_display");
router.get("/stocks",inventory_display);

module.exports=router;