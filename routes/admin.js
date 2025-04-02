const express = require("express");
const router = express.Router();
const { addemployee } = require("../controllers/owner/addemployee");
const { loademployeedata, getEmployeeDetails, getEditEmployee, updateEmployee } = require("../controllers/owner/load_employee_data");

router.get("/employees", loademployeedata);
router.get("/employee/:e_id", getEmployeeDetails);
router.get("/employee/edit/:e_id", getEditEmployee);
router.post("/employee/update/:e_id", updateEmployee);
router.get("/addemployee", (req, res) => res.render("owner/employee_feature/addemployee", { activePage: "employee", activeRoute: "employees" }));
router.post("/addemployee", addemployee);

const { products_display, rejected_products_display, new_products_display, render_product_details, render_add_product_form, render_edit_product_form, update_product } = require("../controllers/admin_products_display");
router.get("/products", products_display);
router.get("/products/rejected", rejected_products_display);
router.get("/products/new", new_products_display);
router.get("/products/details/:prod_id", render_product_details);
router.get("/products/add", render_add_product_form);
router.get("/products/edit/:prod_id", render_edit_product_form);
router.post("/products/edit/:prod_id", update_product);
router.get("/products/:prod_id", render_product_details);

router.get("/home", (req, res) => res.render("owner/homepage", { activePage: "employee", activeRoute: "" }));

const { company_display, render_add_company_form, add_company, render_edit_company_form, update_company } = require("../controllers/company_display");
router.get("/company", company_display);
router.get("/addcompanie", render_add_company_form);
router.post("/company/add", add_company);
router.get("/company/edit/:cid", render_edit_company_form);
router.post("/company/edit/:cid", update_company);

const { branches_display, render_add_branch_form, add_branch, render_edit_branch_form, update_branch } = require("../controllers/admin_branches_display");
router.get("/branches", branches_display);
router.get("/branches/add", render_add_branch_form);
router.post("/branches/add", add_branch);
router.get("/branches/edit/:bid", render_edit_branch_form);
router.post("/branches/edit/:bid", update_branch);

const { customers_display } = require("../controllers/admin_customers_display");
router.get("/customers", customers_display);

const { inventory_display } = require("../controllers/inventory_display");
router.get("/stocks", inventory_display);

const { sales_display, salesdetaildisplay } = require("../controllers/sales_display");
router.get("/sales", sales_display);
router.get("/sales/:sales_id", salesdetaildisplay);

const { profits_display } = require("../controllers/profits_display");
router.get("/profits", profits_display);

const { salary_display } = require("../controllers/salaries_display");
router.get("/salaries", salary_display);

const { orders_display } = require("../controllers/admin_orders_display");
router.get("/orders", orders_display);

const { admin_messages_display, render_compose_message_form, compose_message, view_message } = require("../controllers/admin_messages_display");
router.get("/messages", admin_messages_display);
router.get("/messages/compose", render_compose_message_form);
router.post("/messages/compose", compose_message);
router.get("/messages/view", view_message);

module.exports = router;