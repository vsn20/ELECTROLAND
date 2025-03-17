const express = require('express');
const router = express.Router();
const { setuser, getuser } = require("../service/auth");

router.post('/', async (req, res) => {
    const { mobileNumber, otp } = req.body;

    // Trim inputs to avoid whitespace issues
    const trimmedMobileNumber = mobileNumber ? mobileNumber.trim() : "";
    const trimmedOtp = otp ? otp.trim() : "";

    
    // Validate mobile number
    if (!trimmedMobileNumber.match(/^[0-9]{10}$/)) {
        console.log("Invalid mobile number");
        return res.render("customerlogin", {
            error: "Please enter a valid 10-digit mobile number",
            activePage: 'customer',

        });
    }

    // Create a customer object
    const customer = {
        user_id: trimmedMobileNumber,
        type: "customer"
    };



    // Generate uid using setuser
    const uid = setuser(customer);
 

    // Set uid cookie
    res.cookie('uid', uid, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });


    // Placeholder OTP validation (replace with actual logic)
    if (!trimmedOtp || !trimmedOtp.match(/^[0-9]{6}$/)) {
        console.log("Invalid OTP");
        return res.render("customerlogin", {
            error: "Invalid OTP"
        });
    }

  

    return res.redirect('/customer/home');
});

module.exports = router;