const express = require("express");

const router = express.Router();

const {products_display}=require("../controllers/ourproducts_display")
const { newproducts_display}=require("../controllers/newproducts_display");
const {topproducts_display}=require("../controllers/topproducts_display");

const { branches_display } = require("../controllers/branches_display");

router.get("/",(req,res)=>res.render("home.ejs",{ activePage: 'home' }));
router.get("/employeelogin", (req, res) => {
    res.render("employeelogin", {
      activePage: "employee",
      loginError: null, // Default to null or empty string
      signupError: null, // Default to null or empty string
    });
  });
router.get("/customerlogin",(req,res)=>res.render("customerlogin.ejs",{ activePage: 'customer' }));
router.get("/companylogin",(req,res)=>res.render("companylogin.ejs",{ activePage: 'companyr' }));
router.get("/about-us",(req,res)=>res.render("aboutus.ejs",{ activePage: 'about-us' }));
router.get("/signup",(req,res)=>res.render("signup.ejs",{ activePage: 'employee' }));
router.get("/forgot-password",(req,res)=>res.render("forget_password.ejs",{ activePage: 'employee' }));
router.get("/contact-us",(req,res)=>res.render("contactus.ejs",{ activePage: 'contact-us' }));

router.get("/topproducts",topproducts_display);
router.get("/ourproducts",products_display);
router.get("/newproducts",newproducts_display);




router.get("/our-branches", branches_display);







module.exports= router;