const Product = require("../models/products");

async function newproducts_display(req, res) {
    try {
        // Current date: May 04, 2025
        const currentDate = new Date("2025-05-04");
        
        // Calculate the date 1 month ago
        const oneMonthAgo = new Date(currentDate);
        oneMonthAgo.setMonth(currentDate.getMonth() - 1);

        // Fetch products that are accepted and approved within the last month
        const acceptedProducts = await Product.find({
            Status: "Accepted",
            approvedAt: { $gte: oneMonthAgo, $lte: currentDate }
        }).lean();

        // Check if any products were found
        if (!acceptedProducts || acceptedProducts.length === 0) {
            return res.render("newproducts", {
                newproductData: [],
                activePage: 'new-products',
                activeRoute: '',
                error: "No new products available"
            });
        }

        // Render the page with the fetched products
        res.render("newproducts", {
            newproductData: acceptedProducts,
            activePage: 'new-products',
            activeRoute: '',
            error: null
        });
    } catch (error) {
        console.error("Error fetching new products:", error);
        res.status(500).render("newproducts", {
            newproductData: [],
            activePage: 'new-products',
            activeRoute: '',
            error: "Internal Server Error"
        });
    }
}

module.exports = { newproducts_display };