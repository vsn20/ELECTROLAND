const express = require("express");

const router = express.Router();

router.get("/addsalesmanager",(req,res)=>res.render("owner/addsalesmanager.ejs"));

module.exports=router;