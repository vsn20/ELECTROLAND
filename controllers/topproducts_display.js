const topproductData = [
    {
        prod_photos: ["/washing1.png", "/washing2.png", "/washing3.png"],
        prod_id: "P004",
        Prod_name: "Washing Machine",
        Com_id: "C004",
        Model_no: "WM-800Eco",
        com_name: "CleanTech",
        prod_year: "2023",
        stock: "In Stock",
        Status: "Accepted",
        prod_description: "Front-load washing machine with 8kg capacity and eco-friendly features.",
        Retail_price: "$549",
        miniselling: "1",
        createdAt: "2023-07-10",
        approvedAt: "2023-07-15",
        warrantyperiod: "2 Years",
        installation: "Required",
        installationType: "Paid",
        installationcharge: "$40"
    },
    {
        prod_photos: ["/camera1_resized.png", "/camera2_resized.png", "/camera3_resized.png"],
        prod_id: "P005",
        Prod_name: "Digital Camera",
        Com_id: "C005",
        Model_no: "DC-720X",
        com_name: "PhotoMaster",
        prod_year: "2024",
        stock: "In Stock",
        Status: "Accepted",
        prod_description: "24MP digital camera with 4K video recording and 10x optical zoom.",
        Retail_price: "$599",
        miniselling: "1",
        createdAt: "2024-01-20",
        approvedAt: "2024-01-25",
        warrantyperiod: "2 Years",
        installation: "Not Required",
        installationType: "Free",
        installationcharge: "N/A"
    },
    {
        prod_photos: ["/gaming2.png", "/gaming3.png", "/gaming1.png"],
        prod_id: "P006",
        Prod_name: "Gaming Console",
        Com_id: "C006",
        Model_no: "GC-900Elite",
        com_name: "GameZone",
        prod_year: "2024",
        stock: "In Stock",
        Status: "Accepted",
        prod_description: "Next-gen gaming console with 1TB storage and ray tracing support.",
        Retail_price: "$499",
        miniselling: "1",
        createdAt: "2024-04-05",
        approvedAt: "2024-04-10",
        warrantyperiod: "1 Year",
        installation: "Required",
        installationType: "Paid",
        installationcharge: "$30"
    }
];
async function topproducts_display(req, res) {
    try {
        const acceptedProducts = topproductData.filter(p => p.Status === "Accepted");
        res.render("topproducts", {
            topproductData: acceptedProducts,
            activePage: 'top-products',
            activeRoute: ''
        });
    } catch (error) {
        console.error("Error rendering products:", error);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = {
    topproducts_display
};