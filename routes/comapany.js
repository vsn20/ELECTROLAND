const express = require("express");

const router = express.Router();

router.get("/displayproducts",(req,res)=>{
    res.render("company/displayproducts.ejs")

});

router.get("/addproducts",(req,res)=>{
    res.render("company/addproduct.ejs")
});

module.exports=router;