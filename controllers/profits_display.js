// controllers/profits_display.js
const profitsData = [
    { branch_id: "B001", branch_name: "North Branch", profit: 12000 },
    { branch_id: "B002", branch_name: "South Branch", profit: 15000 },
    { branch_id: "B003", branch_name: "East Branch", profit: 8000 },
    { branch_id: "B004", branch_name: "West Branch", profit: 9500 },
    { branch_id: "B005", branch_name: "Central Branch", profit: 11000 },
    { branch_id: "B006", branch_name: "Downtown Branch", profit: 13000 },
    { branch_id: "B007", branch_name: "Uptown Branch", profit: 10500 },
    { branch_id: "B008", branch_name: "Suburban Branch", profit: 8700 }
];

// Function to render profits
async function profits_display(req, res) {
    try {
        const realProfits = profitsData;
        res.render("owner/profits", {
            profits: realProfits,
            selectedMonth: req.query.month || 'February 2025',
            activePage: 'profits',
            activeRoute: 'profits'
        });
    } catch (error) {
        console.log("Error rendering profits", error);
        res.status(500).send("Internal server error");
    }
}

module.exports = { profits_display };