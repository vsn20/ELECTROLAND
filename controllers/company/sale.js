// controllers/sales_display.js
const salesData = [
    {
        sales_id: "S001",
        branch_name: "North Branch",
        product_name: "Laptop",
        model_number: "XPS 13",
        company_name: "Dell",
        purchased_price: 800,
        sold_price: 900,
        quantity: 5,
        amount: 4500,
        profit_or_loss: 500,
        sales_date: "2025-03-01",
        unique_code: "NB-20250301-S001"
    },
    {
        sales_id: "S002",
        branch_name: "North Branch",
        product_name: "Laptop",
        model_number: "XPS 13",
        company_name: "Dell",
        purchased_price: 800,
        sold_price: 900,
        quantity: 5,
        amount: 4500,
        profit_or_loss: 500,
        sales_date: "2025-03-01",
        unique_code: "NB-20250301-S001"
    },
    {
        sales_id: "S003",
        branch_name: "North Branch",
        product_name: "Laptop",
        model_number: "XPS 13",
        company_name: "Dell",
        purchased_price: 800,
        sold_price: 900,
        quantity: 5,
        amount: 4500,
        profit_or_loss: 500,
        sales_date: "2025-03-01",
        unique_code: "NB-20250301-S001"
    },
    {
        sales_id: "S004",
        branch_name: "North Branch",
        product_name: "Laptop",
        model_number: "XPS 13",
        company_name: "Dell",
        purchased_price: 800,
        sold_price: 900,
        quantity: 5,
        amount: 4500,
        profit_or_loss: 500,
        sales_date: "2025-03-01",
        unique_code: "NB-20250301-S001"
    },
   
];

// Function to get all sales
async function sales_display(req, res) {
    try {
        const realsales = salesData;
        res.render("company/sales_feature/sales", {
            salers: realsales,
            activePage: 'employee',
            activeRoute: 'sales',
        });
    } catch (error) {
        console.log("error rendering sales", error);
        res.status(500).send("internal server error");
    }
}

async function salesdetaildisplay(req, res) {
    try {
        const id = req.params.salesid;
        const realsales = salesData.find(s => s.sales_id === id);
        if (!realsales) {
            return res.status(404).send("sale not found");
        }
        res.render("company/sales_feature/salesdetails", {
            sale: realsales,
            activePage: 'employee',
            activeRoute: 'sales',
        });
    } catch (error) {
        console.log("error rendering sales", error);
        res.status(500).send("internal server error");
    }
}

module.exports = { sales_display, salesdetaildisplay};