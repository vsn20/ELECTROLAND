
// we will require models here and do operation and send data 


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
    }
];

async function branches_display(req, res) {
    try {
        // Filter for active branches and send directly to EJS
        const activeBranches = branchData.filter(branch => branch.active === "active");
        res.render("ourbranches", { branches: activeBranches });
    } catch (error) {
        console.error("Error rendering branches:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { branches_display };