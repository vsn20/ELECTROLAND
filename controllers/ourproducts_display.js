const productData = [
    {
        prod_photos: ["/tv1_resized.jpg", "/tv2_resized.jpg", "/tv3_resized.jpg"],
        prod_id: "P001",
        Prod_name: "Smart TV",
        Com_id: "C001",
        Model_no: "STV-55X",
        com_name: "TechCorp",
        prod_year: "2023",
        stock: "In Stock",
        Status: "Accepted",
        prod_description: "55-inch 4K Ultra HD Smart TV with HDR10 support.",
        Retail_price: "$799",
        miniselling: "1",
        createdAt: "2023-05-15",
        approvedAt: "2023-05-20",
        warrantyperiod: "2 Years",
        installation: "Required",
        installationType: "Paid",
        installationcharge: "$50"
    },
    {
        prod_photos: ["/laptop1.png", "/laptop2.png", "/laptop3.png"],
        prod_id: "P002",
        Prod_name: "Laptop",
        Com_id: "C002",
        Model_no: "LP-14Pro",
        com_name: "Hp victus",
        prod_year: "2024",
        stock: "In Stock",
        Status: "Accepted",
        prod_description: "14-inch lightweight laptop with Intel i5 processor.",
        Retail_price: "$999",
        miniselling: "1",
        createdAt: "2024-02-01",
        approvedAt: "2024-02-05",
        warrantyperiod: "2 Years",
        installation: "Not Required",
        installationType: "Free",
        installationcharge: "N/A"
    },
    {
        prod_photos: ["/mobile1.png", "/mobile2.png", "/mobile3.png"],
        prod_id: "P003",
        Prod_name: "Smartphone",
        Com_id: "C003",
        Model_no: "SM-900",
        com_name: "Apple",
        prod_year: "2024",
        stock: "In Stock",
        Status: "Accepted",
        prod_description: "6.5-inch smartphone with 5G and 128GB storage.",
        Retail_price: "$699",
        miniselling: "1",
        createdAt: "2024-03-10",
        approvedAt: "2024-03-15",
        warrantyperiod: "2 Years",
        installation: "Not Required",
        installationType: "Free",
        installationcharge: "N/A"
    }
];

async function products_display(req, res) {
    try {
        const acceptedProducts = productData.filter(p => p.Status === "Accepted");
        res.render("ourproducts", {
            productData: acceptedProducts,
            activePage: 'our-products',
            activeRoute: ''
        });
    } catch (error) {
        console.error("Error rendering products:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    products_display
};