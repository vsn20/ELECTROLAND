const Product = require('../../models/products');
const path = require('path');

async function companyproducts_display(req, res) {
  try {
    const user = res.locals.user;
    if (!user || user.type !== 'company') {
      return res.status(403).send("Unauthorized: Company access required");
    }
    const companyId = user.c_id || "C002"; // Fallback for testing
    const activeProducts = await Product.find({ Com_id: companyId }).lean();
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
    const product = await Product.findOne({ prod_id }).lean();
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
    console.log("JWT User Data:", res.locals.user);
    const user = res.locals.user;
    if (!user || user.type !== 'company') {
      return res.status(403).send("Unauthorized: Company access required");
    }
    const companyId = user.c_id || "C002"; // Fallback for testing
    const companyName = user.cname || "DefaultCompany"; // Fallback for testing
    res.render("company/add_product", {
      activePage: 'company',
      activeRoute: 'add_product',
      companyId: companyId,
      companyName: companyName
    });
  } catch (error) {
    console.error("Error rendering add product form:", error.stack);
    res.status(500).send("Internal Server Error: " + error.message);
  }
}

async function addProduct(req, res) {
  try {
    const { Prod_name, Model_no, prod_year, stock, prod_description, Retail_price, warrantyperiod, installation, installationType, installationcharge } = req.body;

    // Auto-generate prod_id
    const count = await Product.countDocuments() + 1;
    const prod_id = `P${String(count).padStart(3, '0')}`;

    // Get company details from JWT
    const user = res.locals.user;
    if (!user || user.type !== 'company') {
      return res.status(403).send("Unauthorized: Company access required");
    }
    const Com_id = user.c_id || "C002"; // Fallback for testing
    const com_name = user.cname || "DefaultCompany"; // Fallback for testing

    // Handle file uploads
    const prod_photos = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    // Conditionally set installationType and installationcharge
    const processedInstallationType = installation === 'Required' ? installationType || undefined : undefined;
    const processedInstallationCharge = installation === 'Required' && installationType === 'Paid' ? installationcharge || undefined : undefined;

    const newProduct = new Product({
      prod_id,
      Prod_name,
      Com_id,
      Model_no,
      com_name,
      prod_year,
      stock,
      Status: 'Hold',
      prod_description,
      Retail_price,
      miniselling: "1",
      warrantyperiod,
      installation,
      installationType: processedInstallationType,
      installationcharge: processedInstallationCharge,
      prod_photos
    });
    await newProduct.save();
    res.redirect("/company/products");
  } catch (error) {
    console.error("Error adding product:", error.stack);
    res.status(500).send("Internal Server Error: " + error.message);
  }
}

async function getinventory(req, res) {
  try {
    const user = res.locals.user;
    if (!user || user.type !== 'company') {
      return res.status(403).send("Unauthorized: Company access required");
    }
    const companyid = user.c_id || "C002"; // Fallback for testing
    const products = await Product.find({ Com_id: companyid }).lean();
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