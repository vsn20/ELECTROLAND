const Product = require('../../models/products');
const path = require('path');
const Sale = require("../../models/sale");
const Company = require("../../models/company");
const Branch = require("../../models/branches");

// Function to get all products for the logged-in company
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

// Function to get details of a specific product
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

// Function to render the add product form
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

// Function to handle adding a new product
async function addProduct(req, res) {
  try {
    const { Prod_name, Model_no, prod_year, stock, stockStatus, prod_description, Retail_price, warrantyperiod, installation, installationType, installationcharge } = req.body;

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
      stockStatus: stockStatus || 'InStock', // Use form value or fallback to default
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

// Function to render the edit product form
async function renderEditProductForm(req, res) {
  try {
    const user = res.locals.user;
    if (!user || user.type !== 'company') {
      return res.status(403).send("Unauthorized: Company access required");
    }
    const prod_id = req.params.prod_id;
    const product = await Product.findOne({ prod_id }).lean();
    if (!product) {
      return res.status(404).render("company/edit_product", {
        activePage: 'company',
        activeRoute: 'edit_product',
        product: null
      });
    }
    res.render("company/edit_product", {
      activePage: 'company',
      activeRoute: 'edit_product',
      product: product
    });
  } catch (error) {
    console.error("Error rendering edit product form:", error.stack);
    res.status(500).send("Internal Server Error: " + error.message);
  }
}

// Function to handle updating a product
async function updateProduct(req, res) {
  try {
    const user = res.locals.user;
    if (!user || user.type !== 'company') {
      return res.status(403).send("Unauthorized: Company access required");
    }
    const prod_id = req.params.prod_id;
    const { Prod_name, Model_no, prod_year, stock, stockStatus, prod_description, Retail_price, warrantyperiod, installation, installationType, installationcharge } = req.body;

    // Fetch the existing product
    const product = await Product.findOne({ prod_id });
    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Handle file uploads (only update if new files are uploaded)
    let prod_photos = product.prod_photos; // Keep existing photos by default
    if (req.files && req.files.length > 0) {
      prod_photos = req.files.map(file => `/uploads/${file.filename}`);
    }

    // Conditionally set installationType and installationcharge
    const processedInstallationType = installation === 'Required' ? installationType || undefined : undefined;
    const processedInstallationCharge = installation === 'Required' && installationType === 'Paid' ? installationcharge || undefined : undefined;

    // Update the product fields
    product.Prod_name = Prod_name;
    product.Model_no = Model_no;
    product.prod_year = prod_year;
    product.stock = stock;
    product.stockStatus = stockStatus || 'InStock';
    product.prod_description = prod_description;
    product.Retail_price = Retail_price;
    product.warrantyperiod = warrantyperiod;
    product.installation = installation;
    product.installationType = processedInstallationType;
    product.installationcharge = processedInstallationCharge;
    product.prod_photos = prod_photos;

    await product.save();
    res.redirect(`/company/products/details/${prod_id}`);
  } catch (error) {
    console.error("Error updating product:", error.stack);
    res.status(500).send("Internal Server Error: " + error.message);
  }
}

// Function to get inventory for the logged-in company
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

// Existing sales-related functions
async function sales_display(req, res) {
  try {
    const user = res.locals.user;
    console.log('[sales_display] Logged-in company user:', user);

    // Fetch the company associated with the logged-in user
    const company = await Company.findOne({ c_id: user.c_id }).lean();
    if (!company) {
      console.log('[sales_display] Company not found for c_id:', user.c_id);
      return res.status(404).send("Company not found");
    }

    // Fetch sales for this company
    const sales = await Sale.find({ company_id: company.c_id }).lean();
    console.log('[sales_display] Raw sales data:', sales);

    // Map sales data to include additional details
    const mappedSales = await Promise.all(
      sales.map(async (sale) => {
        // Fetch product details
        let productName = "Unknown Product";
        let modelNumber = "N/A";
        if (typeof sale.product_id === "string") {
          const product = await Product.findOne({ prod_id: sale.product_id }).lean();
          if (product) {
            productName = product.Prod_name;
            modelNumber = product.Model_no;
          }
        }

        // Fetch branch details
        let branchName = "Unknown Branch";
        if (typeof sale.branch_id === "string") {
          const branch = await Branch.findOne({ bid: sale.branch_id }).lean();
          if (branch) {
            branchName = branch.b_name;
          }
        }

        return {
          ...sale,
          branch_name: branchName,
          product_name: productName,
          model_number: modelNumber,
          company_name: company.cname,
          amount: sale.amount ?? 0, // Ensure amount is defined
          sales_date: sale.sales_date ? new Date(sale.sales_date).toISOString().split('T')[0] : "N/A", // Format date
        };
      })
    );

    console.log('[sales_display] Mapped sales data:', mappedSales);

    res.render("company/sales_feature/sales", {
      salers: mappedSales,
      activePage: 'company',
      activeRoute: 'sales',
    });
  } catch (error) {
    console.error("[sales_display] Error rendering sales:", error);
    res.status(500).send("Internal server error");
  }
}

async function salesdetaildisplay(req, res) {
  try {
    const user = res.locals.user;
    const id = req.params.salesid;

    // Fetch the company associated with the logged-in user
    const company = await Company.findOne({ c_id: user.c_id }).lean();
    if (!company) {
      console.log('[salesdetaildisplay] Company not found for c_id:', user.c_id);
      return res.status(404).send("Sale not found");
    }

    // Fetch the sale by sales_id and ensure it belongs to this company
    const sale = await Sale.findOne({ sales_id: id, company_id: company.c_id }).lean();
    if (!sale) {
      console.log('[salesdetaildisplay] Sale not found for sales_id:', id);
      return res.status(404).send("Sale not found");
    }

    // Fetch product details
    let productName = "Unknown Product";
    let modelNumber = "N/A";
    let warrantyPeriod = "N/A";
    let installation = "N/A";
    let installationTypeFromProduct = "N/A";
    let installationCharge = "N/A";
    if (typeof sale.product_id === "string") {
      const product = await Product.findOne({ prod_id: sale.product_id }).lean();
      if (product) {
        productName = product.Prod_name;
        modelNumber = product.Model_no;
        warrantyPeriod = product.warrantyperiod ?? "N/A";
        installation = product.installation ?? "N/A";
        installationTypeFromProduct = product.installationType ?? "N/A";
        installationCharge = product.installationcharge ?? "N/A";
      }
    }

    // Fetch branch details
    let branchName = "Unknown Branch";
    if (typeof sale.branch_id === "string") {
      const branch = await Branch.findOne({ bid: sale.branch_id }).lean();
      if (branch) {
        branchName = branch.b_name;
      }
    }

    // Prepare the sale object for the template
    const saleDetails = {
      ...sale,
      branch_name: branchName,
      product_name: productName,
      model_number: modelNumber,
      company_name: company.cname,
      amount: sale.amount ?? 0,
      profit_or_loss: sale.profit_or_loss ?? 0,
      sales_date: sale.sales_date ? new Date(sale.sales_date).toISOString().split('T')[0] : "N/A",
      purchased_price: sale.purchased_price ?? 0,
      sold_price: sale.sold_price ?? 0,
      quantity: sale.quantity ?? 0,
      customer_name: sale.customer_name ?? "N/A",
      phone_number: sale.phone_number ?? "N/A",
      address: sale.address ?? "N/A",
      rating: sale.rating ?? null,
      review: sale.review ?? "No review provided",
      installationType: sale.installationType ?? installationTypeFromProduct, // Use Sale's installationType, fallback to Product's
      warrantyperiod: warrantyPeriod,
      installation: installation,
      installationcharge: installationCharge
    };

    console.log('[salesdetaildisplay] Sale details:', saleDetails);

    res.render("company/sales_feature/salesdetails", {
      sale: saleDetails,
      activePage: 'company',
      activeRoute: 'sales',
    });
  } catch (error) {
    console.error("[salesdetaildisplay] Error rendering sale details:", error);
    res.status(500).send("Internal server error");
  }
}

module.exports = {
  getProductById,
  companyproducts_display,
  renderAddProductForm,
  addProduct,
  renderEditProductForm,
  updateProduct,
  getinventory,
  sales_display,
  salesdetaildisplay
};