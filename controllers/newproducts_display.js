const newproductData = [
    {
        prod_photos: ["/headphone1_resized.jpg", "/headphone2_resized.jpg", "/headphone3_resized.jpg"],
        prod_id: "P004",
        Prod_name: "Wireless Headphones",
        Com_id: "C004",
        Model_no: "WH-1000",
        com_name: "SoundWave",
        prod_year: "2025",
        stock: "In Stock",
        Status: "Accepted",
        prod_description: "Noise-canceling wireless headphones with 40-hour battery life.",
        Retail_price: "$299",
        miniselling: "1",
        createdAt: "2025-01-10",
        approvedAt: "2025-01-15",
        warrantyperiod: "1 Year",
        installation: "Not Required",
        installationType: "Free",
        installationcharge: "N/A"
    },
    {
        prod_photos: ["/fridge1.jpg", "/fridge2.jpg", "/fridge3.jpg"],
        prod_id: "P005",
        Prod_name: "Smart Refrigerator",
        Com_id: "C005",
        Model_no: "SR-500",
        com_name: "CoolTech",
        prod_year: "2023",
        stock: "In Stock",
        Status: "Accepted",
        prod_description: "500L smart refrigerator with touch screen and Wi-Fi connectivity.",
        Retail_price: "$1499",
        miniselling: "1",
        createdAt: "2023-08-20",
        approvedAt: "2023-08-25",
        warrantyperiod: "3 Years",
        installation: "Required",
        installationType: "Paid",
        installationcharge: "$75"
    },
    {
        prod_photos: ["/watch3_resized.png", "/watch1_resized.png", "/watch2_resized.png"],
        prod_id: "P006",
        Prod_name: "Fitness Smartwatch",
        Com_id: "C006",
        Model_no: "FSW-300",
        com_name: "FitLife",
        prod_year: "2024",
        stock: "In Stock",
        Status: "Accepted",
        prod_description: "Waterproof fitness smartwatch with heart rate and sleep tracking.",
        Retail_price: "$199",
        miniselling: "1",
        createdAt: "2024-06-01",
        approvedAt: "2024-06-05",
        warrantyperiod: "2 Years",
        installation: "Not Required",
        installationType: "Free",
        installationcharge: "N/A"
    }
];
async function newproducts_display(req, res) {
    try {
        const acceptedProducts = newproductData.filter(p => p.Status === "Accepted");
        res.render("newproducts", {
            newproductData: acceptedProducts,
            activePage: 'new-products',
            activeRoute: ''
        });
    } catch (error) {
        console.error("Error rendering products:", error);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = {
    newproducts_display
};