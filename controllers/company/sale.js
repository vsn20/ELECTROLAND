const Sale = require("../../models/sale");
const Company = require("../../models/company");
const Product = require("../../models/products");
const Branch = require("../../models/branches");

// Function to get all sales for the logged-in company
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

// Function to get details of a specific sale
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

module.exports = { sales_display, salesdetaildisplay };