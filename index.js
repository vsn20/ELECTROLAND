const express = require("express");
const app = express();
const portnumber = 8000;
const path = require("path");
const cookieParser = require("cookie-parser");

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
const salesmanroutes = require("./routes/salesman");

const { connectmongodb } = require("./connection");
const { getuser } = require("./service/auth");

connectmongodb("mongodb://127.0.0.1:27017/electroworld")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection failed:", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware for user info
app.use((req, res, next) => {
    const token = req.cookies && req.cookies.uid ? req.cookies.uid : null;
    res.locals.user = getuser(token);
    res.locals.activePage = res.locals.activePage || '';
    next();
});



app.get('/logout', (req, res) => {
    res.clearCookie('uid');
    res.redirect("/");
});

// Routes without middleware
app.use("/", staticrouter);

// Apply redirectIfLoggedIn to login/signup validation routes
app.use("/loginvalidation", loginrouter);
app.use("/signupvalidation", signuprouter);
app.use("/customer-login", customerlogin);
app.use("/", companyauth);


// Protected routes with restrictlogedinuser
app.use(restrictlogedinuser);

app.use("/admin", restrict("owner"), adminroutes);
app.use("/company", restrict("company"), companyroutes);
app.use("/salesmanager", restrict("sales manager"), salesmanagerroutes);
app.use("/customer", restrict("customer"), customer);
app.use("/salesman", restrict("salesman"), salesmanroutes);

app.listen(portnumber, () =>
    console.log(`Server started at port ${portnumber}`)
);