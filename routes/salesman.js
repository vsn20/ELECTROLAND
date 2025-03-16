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


module.exports = router;