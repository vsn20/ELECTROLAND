const Sale = require("../../models/sale");
const Company = require("../../models/company");
const Product = require("../../models/products");
const Employee = require("../../models/employees");
const Branch = require("../../models/branches");

async function sales_display(req, res) {
  try {
    const user = res.locals.user;
    const employee = await Employee.findOne({ e_id: user.emp_id });
    if (!employee) {
      return res.status(404).send("Salesman not found");
    }

    const branch = await Branch.findOne({ bid: employee.bid }).lean();
    const branchName = branch ? branch.b_name : "Unknown Branch";

    const sales = await Sale.find({ salesman_id: employee.e_id }).lean();

    const realsales = await Promise.all(
      sales.map(async (sale) => {
        let companyName = "Unknown Company";
        let productName = "Unknown Product";
        let modelNumber = "N/A";

        if (typeof sale.company_id === "string") {
          const company = await Company.findOne({ c_id: sale.company_id }).lean();
          if (company) {
            companyName = company.cname;
          }
        } else {
          const company = await Company.findById(sale.company_id).lean();
          if (company) {
            companyName = company.cname;
          }
        }

        if (typeof sale.product_id === "string") {
          const product = await Product.findOne({ prod_id: sale.product_id }).lean();
          if (product) {
            productName = product.Prod_name;
            modelNumber = product.Model_no;
          }
        } else {
          const product = await Product.findById(sale.product_id).lean();
          if (product) {
            productName = product.Prod_name;
            modelNumber = product.Model_no;
          }
        }

        return {
          ...sale,
          company_name: companyName,
          product_name: productName,
          model_number: modelNumber,
          total_amount: sale.amount,
          saledate: sale.sales_date,
        };
      })
    );

    res.render("salesman/sales_features/sales", {
      salers: realsales,
      branchName: branchName,
      activePage: 'employee',
      activeRoute: 'sales',
    });
  } catch (error) {
    console.error("error rendering sales", error);
    res.status(500).send("Internal server error");
  }
}

async function salesdetaildisplay(req, res) {
  try {
    const user = res.locals.user;
    const employee = await Employee.findOne({ e_id: user.emp_id });
    if (!employee) {
      return res.status(404).send("Salesman not found");
    }

    const id = req.params.sales_id;
    const sale = await Sale.findOne({ sales_id: id, salesman_id: employee.e_id }).lean();

    if (!sale) {
      return res.status(404).send("Sale not found");
    }

    const branch = await Branch.findOne({ bid: employee.bid }).lean();
    const branchName = branch ? branch.b_name : "Unknown Branch";

    let companyName = "Unknown Company";
    let productName = "Unknown Product";
    let modelNumber = "N/A";

    if (typeof sale.company_id === "string") {
      const company = await Company.findOne({ c_id: sale.company_id }).lean();
      if (company) {
        companyName = company.cname;
      }
    } else {
      const company = await Company.findById(sale.company_id).lean();
      if (company) {
        companyName = company.cname;
      }
    }

    if (typeof sale.product_id === "string") {
      const product = await Product.findOne({ prod_id: sale.product_id }).lean();
      if (product) {
        productName = product.Prod_name;
        modelNumber = product.Model_no;
      }
    } else {
      const product = await Product.findById(sale.product_id).lean();
      if (product) {
        productName = product.Prod_name;
        modelNumber = product.Model_no;
      }
    }

    res.render("salesman/sales_features/sales_details", {
      sale: {
        ...sale,
        company_name: companyName,
        product_name: productName,
        model_number: modelNumber,
        salesman_name: `${employee.f_name} ${employee.last_name}`,
        branch_name: branchName,
        total_amount: sale.amount,
        saledate: sale.sales_date,
        price: sale.sold_price,
      },
      activePage: 'employee',
      activeRoute: 'sales',
      showForm: req.query.add === 'true'
    });
  } catch (error) {
    console.error("error rendering sales details", error);
    res.status(500).send("Internal server error");
  }
}

async function renderAddSaleForm(req, res) {
  try {
    const user = res.locals.user;
    const employee = await Employee.findOne({ e_id: user.emp_id });
    if (!employee) {
      return res.status(404).send("Salesman not found");
    }

    const branch = await Branch.findOne({ bid: employee.bid }).lean();
    const branchName = branch ? branch.b_name : "Unknown Branch";

    const companies = await Company.find({ active: "active" }).lean();
    res.render("salesman/sales_features/addsale", {
      companies,
      branchName: branchName,
      activePage: 'employee',
      activeRoute: 'sales',
      error: req.query.error || null,
      user: employee
    });
  } catch (error) {
    console.error("error rendering add sale form", error);
    res.status(500).send("Internal server error");
  }
}

async function addSale(req, res) {
  try {
    const user = res.locals.user;
    const employee = await Employee.findOne({ e_id: user.emp_id });
    if (!employee) {
      return res.status(400).json({ success: false, message: "Salesman not found" });
    }

    const {
      customer_name,
      sales_date,
      unique_code,
      company_id,
      product_id,
      purchased_price,
      sold_price,
      quantity,
      phone_number,
      address,
      installation,
      installationType,
      installationcharge
    } = req.body;

    const existingSale = await Sale.findOne({ unique_code });
    if (existingSale) {
      return res.status(400).json({
        success: false,
        message: `Unique code ${unique_code} already exists. Please use a different code.`
      });
    }

    const company = await Company.findOne({ c_id: company_id }).lean();
    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    const product = await Product.findOne({ prod_id: product_id }).lean();
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const count = await Sale.countDocuments() + 1;
    const sales_id = `S${String(count).padStart(3, '0')}`;

    const amount = parseFloat(sold_price) * parseInt(quantity);
    const profit_or_loss = (parseFloat(sold_price) - parseFloat(purchased_price)) * parseInt(quantity);

    const newSale = new Sale({
      sales_id,
      branch_id: employee.bid,
      salesman_id: employee.e_id,
      company_id: company.c_id,
      product_id: product.prod_id,
      customer_name,
      sales_date,
      unique_code,
      purchased_price: parseFloat(purchased_price),
      sold_price: parseFloat(sold_price),
      quantity: parseInt(quantity),
      amount,
      profit_or_loss,
      phone_number,
      address,
      installation,
      installationType,
      installationcharge
    });

    await newSale.save();
    res.status(200).json({
      success: true,
      redirect: "/salesman/sales?success=true"
    });
  } catch (error) {
    console.error("error adding sale", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while adding sale"
    });
  }
}

async function getCompanies(req, res) {
  try {
    console.log('[getCompanies] Fetching active companies');
    const companies = await Company.find({ active: "active" }).lean();
    console.log('[getCompanies] Found companies:', companies);
    if (!companies || companies.length === 0) {
      console.log('[getCompanies] No active companies found');
      return res.status(404).json({ message: "No active companies found" });
    }
    res.json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Internal server error while fetching companies" });
  }
}

async function getProductsByCompany(req, res) {
  try {
    const companyId = req.params.companyId;
    console.log('[getProductsByCompany] Fetching products for companyId:', companyId);
    const products = await Product.find({ c_id: companyId }).lean();
    console.log('[getProductsByCompany] Found products:', products);
    if (!products || products.length === 0) {
      console.log('[getProductsByCompany] No products found for companyId:', companyId);
      return res.status(404).json({ message: "No products found for this company" });
    }
    res.json(products);
  } catch (error) {
    console.error("Error fetching products by company:", error);
    res.status(500).json({ message: "Internal server error while fetching products" });
  }
}

module.exports = { sales_display, salesdetaildisplay, renderAddSaleForm, addSale, getCompanies, getProductsByCompany };