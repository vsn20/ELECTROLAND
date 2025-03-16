const express = require("express");
const app = express();
const portnumber = 8000;
const path = require("path");
const cookieparser = require("cookie-parser");

// importing routers and middlewares

const {restrictlogedinuser,restrict,employeerestrict}= require("./middlewares/auth");
const staticrouter = require("./routes/staticrouter");
const loginrouter=require("./routes/login");
const adminroutes = require("./routes/admin");
const companyroutes=require("./routes/company");
const salesmanagerroutes=require("./routes/salesmanager");
const salesmanroutes=require("./routes/salesman");

// importing connection function
const {connectmongodb}= require("./connection");



// connectig using imported connection function
connectmongodb("mongodb://127.0.0.1:27017/electroworld").then(()=>console.log("mongodbconnected")); 

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.static('public'));


// middle ware
app.use(express.static('public'));
app.use(cookieparser());
app.use(express.urlencoded({extended:false}));



// router
app.use("/",staticrouter);
app.use("/loginvalidation",loginrouter);
// restrictloged not applied to these two

app.use(restrictlogedinuser);

app.use("/salesman",employeerestrict(),salesmanroutes);
app.use("/admin",restrict("admin"),adminroutes);
app.use("/company",restrict("company"),companyroutes);
app.use("/salesmanager",restrict("salesmanager"),salesmanagerroutes);
//comment 2//  many routes will be made from here restrictloged in should be applied to all so want to implement direct middle ware 



app.listen(portnumber,()=>console.log(`server started at ${portnumber}`));





