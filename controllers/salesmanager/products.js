const Product = require("../../models/products");

async function getProductsByCompany(req, res) {
  try {
    const companyId = req.params.companyId;
    const products = await Product.find({ 
      Com_id: companyId, 
      Status: { $ne: "Rejected" } 
    }).lean();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products by company:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { getProductsByCompany };