const User = require("../models/users");
const Employee = require("../models/employees");
const { setuser } = require("../service/auth");

async function handlelogin(req, res) {
  const { user_id, password } = req.body;

  const user = await User.findOne({ user_id, password });
  if (!user) {
      return res.render("employeelogin", {
          activePage: "employee",
          loginError: "Wrong credentials",
          signupError: null,
      });
  }

  const employee = await Employee.findOne({ e_id: user.emp_id });
  if (!employee) {
      return res.render("employeelogin", {
          activePage: "employee",
          loginError: "Employee not found",
          signupError: null,
      });
  }

  const token = setuser(user, employee); // Sets type based on employee.role
  res.cookie("uid", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

  const userType = employee.role.toLowerCase();
  if (userType === "owner") {
      return res.render("owner/homepage", { activePage: "employee", activeRoute: "" });
  } else if (userType === "sales manager") {
      return res.render("salesmanager/home", { activePage: "employee", activeRoute: "" });
  } else if (userType === "salesman") {
      return res.render("salesman/home", { activePage: "employee", activeRoute: "" });
  } else {
      return res.status(403).send("Unauthorized role");
  }
}
module.exports = { handlelogin };