const Product = require("../../models/products");

async function getProductsByCompany(req, res) {
  try {
    const products = await Product.find({ Com_id: req.params.companyId }).lean();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getProductsByCompany };