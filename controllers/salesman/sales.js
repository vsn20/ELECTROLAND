// controllers/sales_display.js
const salesData = [
    {
        sales_id: "S001",
        branch_name: "Central Branch",
        salesman_name: "John Doe",
        customer_name: "Alice Smith",
        product_name: "Laptop",
        model_number: "XPS 13",
        company_name: "Dell",
        purchased_price: 800,
        sold_price: 900,
        quantity: 5,
        amount: 4500,
        profit_or_loss: 500,
        sales_date: "2025-03-01",
        unique_code: "CB-20250301-S001"
    },
    {
        sales_id: "S002",
        branch_name: "Central Branch",
        salesman_name: "Jane Roe",
        customer_name: "Bob Johnson",
        product_name: "Smartphone",
        model_number: "Galaxy S23",
        company_name: "Samsung",
        purchased_price: 1000,
        sold_price: 1500,
        quantity: 3,
        amount: 4500,
        profit_or_loss: 1500,
        sales_date: "2025-03-02",
        unique_code: "CB-20250302-S002"
    },
    {
        sales_id: "S003",
        branch_name: "Central Branch",
        salesman_name: "Mike Brown",
        customer_name: "Clara Davis",
        product_name: "Monitor",
        model_number: "UltraSharp 27",
        company_name: "Dell",
        purchased_price: 500,
        sold_price: 800,
        quantity: 10,
        amount: 8000,
        profit_or_loss: 3000,
        sales_date: "2025-03-03",
        unique_code: "CB-20250303-S003"
    },
    {
        sales_id: "S004",
        branch_name: "Central Branch",
        salesman_name: "Sara Wilson",
        customer_name: "David Lee",
        product_name: "Tablet",
        model_number: "iPad Air",
        company_name: "Apple",
        purchased_price: 1000,
        sold_price: 1500,
        quantity: 2,
        amount: 3000,
        profit_or_loss: 1000,
        sales_date: "2025-03-04",
        unique_code: "CB-20250304-S004"
    },
    {
        sales_id: "S005",
        branch_name: "Central Branch",
        salesman_name: "Tom Clark",
        customer_name: "Emma White",
        product_name: "Desktop",
        model_number: "Inspiron 3020",
        company_name: "Dell",
        purchased_price: 750,
        sold_price: 1000,
        quantity: 7,
        amount: 7000,
        profit_or_loss: 1750,
        sales_date: "2025-03-05",
        unique_code: "CB-20250305-S005"
    },
    {
        sales_id: "S006",
        branch_name: "Central Branch",
        salesman_name: "Lisa Green",
        customer_name: "Frank Miller",
        product_name: "Headphones",
        model_number: "WH-1000XM5",
        company_name: "Sony",
        purchased_price: 600,
        sold_price: 900,
        quantity: 4,
        amount: 3600,
        profit_or_loss: 1200,
        sales_date: "2025-03-06",
        unique_code: "CB-20250306-S006"
    },
    {
        sales_id: "S007",
        branch_name: "Central Branch",
        salesman_name: "Peter Adams",
        customer_name: "Grace Taylor",
        product_name: "Keyboard",
        model_number: "MX Keys",
        company_name: "Logitech",
        purchased_price: 600,
        sold_price: 900,
        quantity: 6,
        amount: 5400,
        profit_or_loss: 1800,
        sales_date: "2025-03-07",
        unique_code: "CB-20250307-S007"
    },
    {
        sales_id: "S008",
        branch_name: "Central Branch",
        salesman_name: "Emily King",
        customer_name: "Henry Moore",
        product_name: "Smartwatch",
        model_number: "Watch Series 8",
        company_name: "Apple",
        purchased_price: 1200,
        sold_price: 2000,
        quantity: 1,
        amount: 2000,
        profit_or_loss: 800,
        sales_date: "2025-03-08",
        unique_code: "CB-20250308-S008"
    }
];

async function sales_display(req, res) {
    try {
        const realsales = salesData;
        res.render("salesman/sales_features/sales", {
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
        const id = req.params.sales_id;
        const realsales = salesData.find(s => s.sales_id === id);
        if (!realsales) {
            return res.status(404).send("sale not found");
        }
        res.render("salesman/sales_features/sales_details", {
            sale: realsales,
            activePage: 'employee',
            activeRoute: 'sales',
            showForm: req.query.add === 'true'
        });
    } catch (error) {
        console.log("error rendering sales", error);
        res.status(500).send("internal server error");
    }
}


module.exports = { sales_display, salesdetaildisplay };