const express = require("express");

const router = express.Router();

const { branches_display } = require("../controllers/branches_display");

router.get("/",(req,res)=>res.render("home.ejs",{ activePage: 'home' }));
router.get("/employeelogin", (req, res) => {
    res.render("employeelogin.ejs", { activePage: 'employee', error: null });
});
router.get("/customerlogin",(req,res)=>res.render("customerlogin.ejs",{ activePage: 'customer' }));
router.get("/about-us",(req,res)=>res.render("aboutus.ejs",{ activePage: 'about-us' }));
router.get("/signup",(req,res)=>res.render("signup.ejs",{ activePage: 'employee' }));
router.get("/forgot-password",(req,res)=>res.render("forget_password.ejs",{ activePage: 'employee' }));
router.get("/contact-us",(req,res)=>res.render("contactus.ejs",{ activePage: 'contact-us' }));
router.get("/topproducts",(req,res)=>res.render("topproducts.ejs",{ activePage: 'top-products' }));
router.get("/ourproducts",(req,res)=>res.render("ourproducts.ejs",{ activePage: 'our-products' }));
router.get("/newproducts",(req,res)=>res.render("newproducts.ejs",{ activePage: 'new-products' }));
router.get("/our-branches", branches_display);







module.exports= router;