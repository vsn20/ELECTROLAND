const comapnydata = [
    {
        cid: "1",
        cname: "panasonic",
        email: "panasonic@gmail.com",
        phone: "1234567890",
        address: "Nizamabad,Telangana",
        active: "active",
    },
    {
        cid: "2",
        cname: "samsung",
        email: "samsung@gmail.com",
        phone: "1324657980",
        address: "Sricity,Andrapradesh",
        active: "active",
    },
    {
        cid: "3",
        cname: "LG",
        email: "lg@gmail.com",
        phone: "9213498012",
        address: "Chennai,Tamilnadu",
        active: "inactive",
    },
    {
        cid: "4",
        cname: "Sony",
        email: "sony@gmail.com",
        phone: "5432167890",
        address: "mumbai,maharastra",
        active: "active",
    },
];

async function comapny_display(req, res) {
    try {
        const company = comapnydata;
        res.render("owner/company_feature/displaycomapny", {
            companies: company,
            activePage: 'employee',
            activeRoute: 'company',
        });
    } catch (error) {
        console.log("error rendering companies:", error);
        res.status(500).send("internal server error");
    }
}

async function render_edit_company_form(req, res) {
    try {
        const companyId = req.params.cid;
        const company = comapnydata.find(b => b.cid === companyId);
        if (!company) {
            return res.status(404).send("Branch not found");
        }
        res.render("owner/company_feature/editcompany", {
            company,
            activePage: 'employee',
            activeRoute: 'company'
        });
    } catch (error) {
        console.error("Error rendering edit company form:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function update_company(req, res) {
    try {
        const companyId = req.params.cid;
        const companyIndex = comapnydata.findIndex(b => b.cid === companyId);
        if (companyIndex === -1) {
            return res.status(404).send("Company not found");
        }
        // Update all editable fields
        comapnydata[companyIndex].cname = req.body.cname;
        comapnydata[companyIndex].address = req.body.address;
        comapnydata[companyIndex].phone = req.body.phone;
        comapnydata[companyIndex].email = req.body.email;
        comapnydata[companyIndex].active = req.body.active; // This will now work with the new radio buttons
        res.redirect("/admin/company");
    } catch (error) {
        console.error("Error updating company:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { comapny_display, render_edit_company_form, update_company };