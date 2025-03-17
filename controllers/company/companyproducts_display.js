// data/companyproducts.js
const companyproductData = [
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
        Com_id: "C002",
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
        Com_id: "C002",
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
];
async function companyproducts_display(req, res) {
    try {
        const activeProducts = companyproductData.filter(p => p.Status === "Accepted" || p.Status === "Hold");
        res.render("company/company_products", {
            companyproductData: activeProducts,
            activePage: 'company',
            activeRoute: 'products'
        });
    } catch (error) {
        console.error("Error rendering products:", error);
        res.status(500).send("Internal Server Error");
    }
}
async function getProductById(req, res) {
    try {
        const prod_id = req.params.prod_id;
        const product = companyproductData.find(p => p.prod_id === prod_id);
        if (!product) {
            return res.status(404).render("company/company_product_details", {
                activePage: 'company',
                activeRoute: 'product_details',
                product: null
            });
        }
        res.render("company/company_product_details", {
            activePage: 'company',
            activeRoute: 'product_details',
            product: product
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send("Internal Server Error");
    }
}
async function renderAddProductForm(req, res) {
    try {
        res.render("company/add_product", {
            activePage: 'company',
            activeRoute: 'add_product'
        });
    } catch (error) {
        console.error("Error rendering add product form:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function addProduct(req, res) {
    try {
        const { prod_id, Prod_name, Com_id, Model_no, com_name, prod_year, stock, Status, prod_description, Retail_price, warrantyperiod, installation, installationType, installationcharge } = req.body;

        // Handle file uploads (simulated paths for now)
        const prod_photos = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

        const newProduct = {
            prod_id,
            Prod_name,
            Com_id,
            Model_no,
            com_name,
            prod_year,
            stock,
            Status,
            prod_description,
            Retail_price, // Used as Company Selling Price
            warrantyperiod,
            installation,
            installationType,
            installationcharge,
            prod_photos,
            createdAt: new Date().toISOString().split('T')[0], // Current date
            approvedAt: null // Will be set by admin
        };

        companyproductData.push(newProduct);
        res.redirect("/company/products");
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).send("Internal Server Error");
    }
}
async function getinventory(req, res) {
    try {
        // Assuming the sales manager's company ID is passed via session or query
        // For this example, we'll hardcode a company ID; in a real app, you'd get this dynamically
        const companyid = "C002"; // Replace with dynamic value (e.g., req.session.companyid)

        // Filter products by company ID
        const products = companyproductData.filter(p => p.Com_id === companyid);

        res.render("company/inventory_feature/display_inventory", {
            companyid: companyid,
            products: products,
            activePage: 'company',
            activeRoute: 'stocks'
        });
    } catch (error) {
        console.error("Error fetching products for sales manager:", error);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = {
    getProductById,
    companyproducts_display,
    renderAddProductForm,
    addProduct,
    getinventory
};
