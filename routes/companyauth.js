const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Company = require('../models/company');
const { setuser } = require("../service/auth");

async function handleCompanyLogin(req, res) {
    try {
        const { user_id, password } = req.body;

        // Input validation
        if (!user_id || !password) {
            return res.render("companylogin", {
                loginError: "User ID and password are required",
                signupError: null,
                activePage: 'company'
            });
        }

        // Find the user by user_id
        const user = await User.findOne({ user_id });
        if (!user || user.password !== password) {
            return res.render("companylogin", {
                loginError: "Wrong credentials",
                signupError: null,
                activePage: 'company'
            });
        }

        // Find the associated company using the user's cid
        const company = await Company.findOne({ cid: user.cid });
        if (!company) {
            return res.render("companylogin", {
                loginError: "Company not found",
                signupError: null,
                activePage: 'company'
            });
        }

        // Generate token (pass user and company data)
        const token = setuser(user, { cname: company.cname, role: "company" });
        res.cookie("uid", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

        return res.redirect('/company/home');
    } catch (error) {
        console.error("Error in company login:", error);
        return res.render("companylogin", {
            loginError: "An error occurred during login",
            signupError: null,
            activePage: 'company'
        });
    }

    const company = await Company.findOne({ c_id: user.c_id });
    if (!company) {
        return res.render("companylogin", {
            loginError: "Company not found",
            signupError: null,
            activePage: 'company'
        });
    }

    const token = setuser(user, { cname: company.cname });
    res.cookie("uid", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    return res.redirect('/company/home');
}

async function handleCompanySignup(req, res) {
    try {
        const { user_id, email, password, confirm_password } = req.body;

        // Input validation
        if (!user_id || !email || !password || !confirm_password) {
            return res.render("companylogin", {
                loginError: null,
                signupError: "All fields are required",
                activePage: 'company'
            });
        }

        // Check if user_id is already taken
        const existingUser = await User.findOne({ user_id });
        if (existingUser) {
            return res.render("companylogin", {
                loginError: null,
                signupError: "User ID taken",
                activePage: 'company'
            });
        }

        // Validate password match
        if (password !== confirm_password) {
            return res.render("companylogin", {
                loginError: null,
                signupError: "Passwords do not match",
                activePage: 'company'
            });
        }

        // Find the company by email (this ensures the company was added via admin)
        const company = await Company.findOne({ email });
        if (!company) {
            return res.render("companylogin", {
                loginError: null,
                signupError: "Company email not found",
                activePage: 'company'
            });
        }

        // Create a new user linked to the company
        const newUser = new User({
            user_id,
            cid: company.cid,
            password // Storing password as plain text (NOT RECOMMENDED for production)
        });
        await newUser.save();

        // Generate token
        const token = setuser(newUser, { cname: company.cname, role: "company" });
        res.cookie("uid", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

        return res.redirect('/company/home');
    } catch (error) {
        console.error("Error in company signup:", error);
        return res.render("companylogin", {
            loginError: null,
            signupError: "An error occurred during signup",
            activePage: 'company'
        });
    }

    // Validate password match
    if (password !== confirm_password) {
        return res.render("companylogin", {
            loginError: null,
            signupError: "Passwords do not match",
            activePage: 'company'
        });
    }

    // Check if email exists in Company model
    const company = await Company.findOne({ email });
    if (!company) {
        return res.render("companylogin", {
            loginError: null,
            signupError: "Company email not found",
            activePage: 'company'
        });
    }

    // Create new user with c_id from Company
    const newUser = new User({
        user_id,
        c_id: company.c_id,
        password
    });
    await newUser.save();

    const token = setuser(newUser, { cname: company.cname });
    res.cookie("uid", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    return res.redirect('/company/home');
}

// Define routes
router.post('/company-loginvalidation', handleCompanyLogin);
router.post('/company-signupvalidation', handleCompanySignup);

// ✅ Fix: Export router instead of an object
module.exports = router;
