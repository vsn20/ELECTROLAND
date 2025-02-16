const User = require("../models/user"); // Ensure correct model name
const { setuser } = require("../service/auth");

async function handlelogin(req, res) {
    const { email, password } = req.body;

    // Await the result because findOne() is asynchronous
    const result = await User.findOne({ email, password });

    if (!result) {
        return res.render("home.ejs"); // Ensure return to avoid duplicate renders
    }

    const token = setuser(result);
    res.cookie("uid", token);

    // Check if the user is an admin
    if (result.type === "admin") {
        return res.render("owner/admin.ejs");
    } else {
        return res.render("salesman.ejs"); // Render a different page for regular users
    }
}

module.exports = { handlelogin };
