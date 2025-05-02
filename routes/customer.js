const express = require("express");
const router = express.Router();

router.get("/home", (req, res) =>res.redirect("/customer/previouspurchases"));


//previous purchases
const {previous_data_display,total_previous_data_display}=require("../controllers/customer/previous_data");
router.get("/previouspurchases",previous_data_display);
router.get("/previouspurchases/totaldetails/:saleid",total_previous_data_display);

//complaints
const {complaint_data,complaint_datadetails}=require("../controllers/customer/complaints");
router.get("/complaints",complaint_data);
router.get("/complaints/totaldetails/:saleid",complaint_datadetails);

//reviews
const{ review_display,review_datadetails,}=require("../controllers/customer/reviews");
router.get("/review",review_display);
router.get("/review/totaldetails/:saleid",review_datadetails);

//blogs
const { blogs, view_message } = require("../controllers/customer/blogs");
router.get("/blogs", blogs);
router.get("/blogs/view", view_message); 

module.exports = router;