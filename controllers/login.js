const User = require("../models/user");
const { setuser } = require("../service/auth");

async function handlelogin(req, res) {
    const { email, password } = req.body;

    const result = await User.findOne({ email, password });

    if (!result) {
        // Render the employee login page with an error message
        return res.render("employeelogin", { activePage: 'employee', error: "Wrong credentials" });
    }

    const token = setuser(result);
    res.cookie("uid", token);

    if (result.type === "admin") {
        return res.render("owner/homepage", { 
            activePage: 'employee', 
            activeRoute: '' // No sidebar item active on home
        });
    } else if (result.type === "salesmanager") {
        return res.render("salesmanager/home", { 
            activePage: 'employee',
            activeRoute:'',
        });
    } else if (result.type === "company") {
        return res.render("company/home", { 
            activePage: 'employee' ,
            activeRoute:'',
        });
    }
}

module.exports = { handlelogin };