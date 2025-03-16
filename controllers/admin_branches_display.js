const branchData = [
    {
        bid: "B001",
        b_name: "Mumbai Central",
        active: "active",
        manager_name: "Rahul Sharma",
        manager_email: "rahul.sharma@example.com",
        manager_ph_no: "9876543210",
        address: "123 Marine Drive, Mumbai, Maharashtra 400020"
    },
    {
        bid: "B002",
        b_name: "Delhi Connaught Place",
        active: "active",
        manager_name: "Priya Gupta",
        manager_email: "priya.gupta@example.com",
        manager_ph_no: "9123456789",
        address: "A-15, Connaught Place, New Delhi, Delhi 110001"
    },
    {
        bid: "B003",
        b_name: "Bangalore MG Road",
        active: "active",
        manager_name: "Not Assigned",
        manager_email: "N/A",
        manager_ph_no: "N/A",
        address: "45 MG Road, Bengaluru, Karnataka 560001"
    },
    {
        bid: "B004",
        b_name: "Chennai T-Nagar",
        active: "active",
        manager_name: "Vikram Singh",
        manager_email: "vikram.singh@example.com",
        manager_ph_no: "9988776655",
        address: "78 Pondy Bazaar, T-Nagar, Chennai, Tamil Nadu 600017"
    },
    {
        bid: "B005",
        b_name: "Chennai G-Nagar",
        active: "active",
        manager_name: "Arjun Rathod",
        manager_email: "arjun.rathod@example.com",
        manager_ph_no: "9988678990",
        address: "78 RTP Road, G-Nagar, Chennai, Tamil Nadu 600017"
    },
    {
        bid: "B006",
        b_name: "Hyderabad Central",
        active: "inactive",
        manager_name: "Kiran Guad",
        manager_email: "kiran.guad@example.com",
        manager_ph_no: "9456789123",
        address: "B-17, Connaught Place, Hyderabad, Telangana 450001"
    }
];
async function branches_display(req, res) {
    try {
        const activeBranches = branchData;
        res.render("owner/branch_feature/branch_admin", {
            branches: activeBranches,
            activePage: 'employee',
            activeRoute: 'branches'
        });
    } catch (error) {
        console.error("Error rendering branches:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function render_add_branch_form(req, res) {
    try {
        res.render("owner/branch_feature/add_branch", {
            activePage: 'employee',
            activeRoute: 'branches'
        });
    } catch (error) {
        console.error("Error rendering add branch form:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function render_edit_branch_form(req, res) {
    try {
        const branchId = req.params.bid;
        const branch = branchData.find(b => b.bid === branchId);
        if (!branch) {
            return res.status(404).send("Branch not found");
        }
        res.render("owner/branch_feature/edit_branch", {
            branch,
            activePage: 'employee',
            activeRoute: 'branches'
        });
    } catch (error) {
        console.error("Error rendering edit branch form:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function update_branch(req, res) {
    try {
        const branchId = req.params.bid;
        const branchIndex = branchData.findIndex(b => b.bid === branchId);
        if (branchIndex === -1) {
            return res.status(404).send("Branch not found");
        }
        // Only update editable fields
        branchData[branchIndex].b_name = req.body.b_name;
        branchData[branchIndex].address = req.body.address;
        res.redirect("/admin/branches");
    } catch (error) {
        console.error("Error updating branch:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { branches_display, render_add_branch_form, render_edit_branch_form, update_branch };