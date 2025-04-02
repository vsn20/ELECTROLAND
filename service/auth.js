const jwt = require("jsonwebtoken");

const secret = "avula";

function setuser(user, companyOrEmployee) {
    const payload = {
        _id: user._id || undefined, // MongoDB-generated ID (if available)
        user_id: user.user_id, // Generic user ID (required for all users)
        emp_id: user.emp_id || undefined, // Employee ID (for employees)
        cid: user.cid || undefined, // Company ID (updated from c_id to match Company model)
        cname: companyOrEmployee?.cname || undefined, // Company name (updated from c_name)
        type: user.cid 
            ? "company" 
            : (user.emp_id 
                ? companyOrEmployee.role.toLowerCase() 
                : "customer") // Determine user type
    };
    
    return jwt.sign(payload, secret);
}

function getuser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("getuser error:", error.message);
        return null;
    }
}

module.exports = {
    setuser,
    getuser,
};