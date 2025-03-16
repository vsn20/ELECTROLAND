const productData = [
    {
        prod_photos: ["/tv1_resized.jpg", "/tv2_resized.jpg", "/tv3_resized.jpg"],
        prod_id: "P001",
        Prod_name: "Smart TV",
        Com_id: "C001",
        Model_no: "STV-55X",
        com_name: "TechCorp",
        prod_year: "2023",
        stock: "Stock",
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
        prod_photos: ["/mouse1_resized.jpg", "/mouse2_resized.jpg", "/mouse3_resized.jpg"],
        prod_id: "P002",
        Prod_name: "Wireless Mouse",
        Com_id: "C002",
        Model_no: "WM-300",
        com_name: "GadgetWorks",
        prod_year: "2022",
        stock: "Out of stock",
        Status: "Hold",
        prod_description: "Ergonomic wireless mouse with adjustable DPI settings.",
        Retail_price: "$29",
        miniselling: "2",
        createdAt: "2022-08-10",
        approvedAt: "2022-08-15",
        warrantyperiod: "1 Year",
        installation: "Not Required",
        installationType: "Free",
        installationcharge: "N/A"
    },
    {
        prod_photos: ["/laptop1.png", "/laptop2.png", "/laptop3.png"],
        prod_id: "P003",
        Prod_name: "Laptop",
        Com_id: "C003",
        Model_no: "LP-15Pro",
        com_name: "Hp",
        prod_year: "2024",
        stock: "Stock",
        Status: "Accepted",
        prod_description: "15-inch high-performance laptop with Intel i7 processor.",
        Retail_price: "$1299",
        miniselling: "1",
        createdAt: "2024-01-10",
        approvedAt: "2024-01-15",
        warrantyperiod: "3 Years",
        installation: "Required",
        installationType: "Paid",
        installationcharge: "$100"
    },
    {
        prod_photos: ["/speaker1.png", "/speaker2.png", "/speaker3.png"],
        prod_id: "P004",
        Prod_name: "Bluetooth Speaker",
        Com_id: "C004",
        Model_no: "BS-200",
        com_name: "SoundVibe",
        prod_year: "2023",
        stock: "Out of stock",
        Status: "Hold",
        prod_description: "Portable Bluetooth speaker with deep bass and long battery life.",
        Retail_price: "$99",
        miniselling: "1",
        createdAt: "2023-03-05",
        approvedAt: "2023-03-10",
        warrantyperiod: "2 Years",
        installation: "Not Required",
        installationType: "Free",
        installationcharge: "N/A"
    },
    {
        prod_photos: ["/mobile1.png", "/mobile2.png", "/mobile3.png"],
        prod_id: "P005",
        Prod_name: "Smartphone",
        Com_id: "C005",
        Model_no: "SP-500",
        com_name: "Apple",
        prod_year: "2024",
        stock: "Stock",
        Status: "Accepted",
        prod_description: "Flagship smartphone with 5G support and 120Hz display.",
        Retail_price: "$999",
        miniselling: "1",
        createdAt: "2024-02-15",
        approvedAt: "2024-02-20",
        warrantyperiod: "2 Years",
        installation: "Not Required",
        installationType: "Free",
        installationcharge: "N/A"
    },
    {
        prod_photos: ["/gaming1.png", "/gaming2.png", "/gaming3.png"],
        prod_id: "P006",
        Prod_name: "Gaming Console",
        Com_id: "C006",
        Model_no: "GC-X100",
        com_name: "GameWorld",
        prod_year: "2023",
        stock: "Stock",
        Status: "Accepted",
        prod_description: "Next-gen gaming console with 4K gaming support.",
        Retail_price: "$499",
        miniselling: "1",
        createdAt: "2023-11-25",
        approvedAt: "2023-11-30",
        warrantyperiod: "1 Year",
        installation: "Required",
        installationType: "Paid",
        installationcharge: "$75"
    },
    {
        prod_photos: ["/monitor1_resized.png", "/monitor2_resized.png", "/monitor3_resized.png"],
        prod_id: "P007",
        Prod_name: "Defective Monitor",
        Com_id: "C007",
        Model_no: "MON-24X",
        com_name: "DisplayTech",
        prod_year: "2023",
        stock: "Stock",
        Status: "Rejected",
        prod_description: "24-inch monitor with display issues.",
        Retail_price: "$199",
        miniselling: "1",
        createdAt: "2023-06-01",
        approvedAt: null,
        warrantyperiod: "1 Year",
        installation: "Required",
        installationType: "Paid",
        installationcharge: "$30"
    },
    {
        prod_photos: ["/charger1_resized.png", "/charger2_resized.png", "/charger3_resized.png"],
        prod_id: "P008",
        Prod_name: "Faulty Charger",
        Com_id: "C008",
        Model_no: "CHG-50W",
        com_name: "PowerCo",
        prod_year: "2022",
        stock: "Out of stock",
        Status: "Rejected",
        prod_description: "50W charger with overheating issues.",
        Retail_price: "$39",
        miniselling: "2",
        createdAt: "2022-12-01",
        approvedAt: null,
        warrantyperiod: "6 Months",
        installation: "Not Required",
        installationType: "Free",
        installationcharge: "N/A"
    },
    {
        prod_photos: ["/watch1_resized.png", "/watch2_resized.png", "/watch3_resized.png"],
        prod_id: "P009",
        Prod_name: "Smart Watch",
        Com_id: "C009",
        Model_no: "SW-200",
        com_name: "WearTech",
        prod_year: "2025",
        stock: "Stock",
        Status: "Pending",
        prod_description: "Smart watch with fitness tracking and notifications.",
        Retail_price: "$149",
        miniselling: "1",
        createdAt: "2025-03-01",
        approvedAt: null,
        warrantyperiod: "1 Year",
        installation: "Not Required",
        installationType: "Free",
        installationcharge: "N/A"
    },
    {
        prod_photos: ["/headphone1_resized.jpg", "/headphone2_resized.jpg", "/headphone3_resized.jpg"],
        prod_id: "P010",
        Prod_name: "Wireless Earbuds",
        Com_id: "C010",
        Model_no: "WE-300",
        com_name: "AudioVibe",
        prod_year: "2025",
        stock: "Stock",
        Status: "Pending",
        prod_description: "Noise-cancelling wireless earbuds with long battery life.",
        Retail_price: "$89",
        miniselling: "1",
        createdAt: "2025-03-05",
        approvedAt: null,
        warrantyperiod: "2 Years",
        installation: "Not Required",
        installationType: "Free",
        installationcharge: "N/A"
    },
    // New Rejected Product 1
    {
        prod_photos: ["/keyboard1_resized.png", "/keyboard2_resized.png", "/keyboard3_resized.png"],
        prod_id: "P011",
        Prod_name: "Faulty Keyboard",
        Com_id: "C011",
        Model_no: "KB-500",
        com_name: "KeyTech",
        prod_year: "2023",
        stock: "Stock",
        Status: "Rejected",
        prod_description: "Mechanical keyboard with defective keys.",
        Retail_price: "$59",
        miniselling: "1",
        createdAt: "2023-07-15",
        approvedAt: null,
        warrantyperiod: "1 Year",
        installation: "Not Required",
        installationType: "Free",
        installationcharge: "N/A"
    },
    // New Rejected Product 2
    {
        prod_photos: ["/printer1_resized.png", "/printer2_resized.png", "/printer3_resized.png"],
        prod_id: "P012",
        Prod_name: "Defective Printer",
        Com_id: "C012",
        Model_no: "PR-100",
        com_name: "PrintMaster",
        prod_year: "2022",
        stock: "Out of stock",
        Status: "Rejected",
        prod_description: "Inkjet printer with paper jam issues.",
        Retail_price: "$129",
        miniselling: "1",
        createdAt: "2022-09-20",
        approvedAt: null,
        warrantyperiod: "1 Year",
        installation: "Required",
        installationType: "Paid",
        installationcharge: "$20"
    },
    // New Pending Product 1
    {
        prod_photos: ["/tablet1_resized.png", "/tablet2_resized.png", "/tablet3_resized.png"],
        prod_id: "P013",
        Prod_name: "Tablet",
        Com_id: "C013",
        Model_no: "TAB-10X",
        com_name: "Lenovo",
        prod_year: "2025",
        stock: "Stock",
        Status: "Pending",
        prod_description: "10-inch tablet with high-resolution display.",
        Retail_price: "$299",
        miniselling: "1",
        createdAt: "2025-03-10",
        approvedAt: null,
        warrantyperiod: "1 Year",
        installation: "Not Required",
        installationType: "Free",
        installationcharge: "N/A"
    },
    // New Pending Product 2
    {
        prod_photos: ["/camera1_resized.png", "/camera2_resized.png", "/camera3_resized.png"],
        prod_id: "P014",
        Prod_name: "Digital Camera",
        Com_id: "C014",
        Model_no: "CAM-20MP",
        com_name: "PhotoPro",
        prod_year: "2025",
        stock: "Stock",
        Status: "Pending",
        prod_description: "20MP digital camera with 4K video recording.",
        Retail_price: "$399",
        miniselling: "1",
        createdAt: "2025-03-12",
        approvedAt: null,
        warrantyperiod: "2 Years",
        installation: "Not Required",
        installationType: "Free",
        installationcharge: "N/A"
    }
];

async function products_display(req, res) {
    try {
        const activeProducts = productData.filter(p => p.Status === "Accepted" || p.Status === "Hold");
        res.render("owner/products_feature/products_admin", {
            productData: activeProducts,
            activePage: 'employee',
            activeRoute: 'products'
        });
    } catch (error) {
        console.error("Error rendering products:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function rejected_products_display(req, res) {
    try {
        const rejectedProducts = productData.filter(p => p.Status === "Rejected");
        res.render("owner/products_feature/rejected_products", {
            productData: rejectedProducts,
            activePage: 'employee',
            activeRoute: 'products'
        });
    } catch (error) {
        console.error("Error rendering rejected products:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function new_products_display(req, res) {
    try {
        const newProducts = productData.filter(p => p.Status === "Pending");
        res.render("owner/products_feature/new_products", {
            productData: newProducts,
            activePage: 'employee',
            activeRoute: 'products'
        });
    } catch (error) {
        console.error("Error rendering new products:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function render_product_details(req, res) {
    try {
        const prod_id = req.params.prod_id;
        const product = productData.find(p => p.prod_id === prod_id);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.render("owner/products_feature/products_details", {
            product,
            activePage: 'employee',
            activeRoute: 'products'
        });
    } catch (error) {
        console.error("Error rendering product details:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function render_add_product_form(req, res) {
    try {
        res.send("Add product form page (not implemented in this minimal setup)");
    } catch (error) {
        console.error("Error rendering add product form:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function render_edit_product_form(req, res) {
    try {
        const prod_id = req.params.prod_id;
        const product = productData.find(p => p.prod_id === prod_id);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.render("owner/products_feature/edit_products", {
            product,
            activePage: 'employee',
            activeRoute: 'products'
        });
    } catch (error) {
        console.error("Error rendering edit product form:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function update_product(req, res) {
    try {
        const prod_id = req.params.prod_id;
        const productIndex = productData.findIndex(p => p.prod_id === prod_id);
        if (productIndex === -1) {
            return res.status(404).send("Product not found");
        }
        productData[productIndex].Status = req.body.status;
        res.redirect("/admin/products");
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    productData,
    products_display,
    rejected_products_display,
    new_products_display,
    render_product_details,
    render_add_product_form,
    render_edit_product_form,
    update_product
};