const express = require("express");
const app = express();
const portnumber = 8000;
const path = require("path");
const cookieParser = require("cookie-parser");

// Importing routers and middlewares
const { restrictlogedinuser, restrict } = require("./middlewares/auth");
const staticrouter = require("./routes/staticrouter");
const loginrouter = require("./routes/login");
const signuprouter = require("./routes/signup");
const adminroutes = require("./routes/admin");
const companyroutes = require("./routes/comapany");
const salesmanagerroutes = require("./routes/salesmanager");
const customerlogin = require("./routes/customerlogin");
const customer = require("./routes/customer");
const companyauth = require("./routes/companyauth");
const salesmanroutes=require("./routes/salesman");

// Importing connection function
const { connectmongodb } = require("./connection");

// Connecting to MongoDB
connectmongodb("mongodb://127.0.0.1:27017/electroworld")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err));

// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes (no middleware required)
app.use("/", staticrouter);
app.use("/loginvalidation", loginrouter);
app.use("/signupvalidation", signuprouter);
app.use("/customer-login", customerlogin);
app.use("/", companyauth); // Mount at root to match full paths

// Apply restrictlogedinuser middleware to protected routes
app.use(restrictlogedinuser);

// Protected routes
app.use("/admin", restrict("owner"), adminroutes);
app.use("/company", restrict("company"), companyroutes);
app.use("/salesmanager", restrict("sales manager"), salesmanagerroutes);
app.use("/customer", restrict("customer"), customer);
app.use("/salesman", restrict("salesman"),salesmanroutes );

app.listen(portnumber, () =>
  console.log(`Server started at port ${portnumber}`)
);