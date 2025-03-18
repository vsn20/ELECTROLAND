const db = require('../../sqliteConnection');

const sales_display = (req, res) => {
    db.all('SELECT sales_id, salesman_name, customer_name, total_amount, saledate FROM sales_manager_sales', [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal Server Error');
        }
        res.render('salesmanager/sales_feature/salesdisplay', {
            activePage: 'employee',
            activeRoute: 'sales',
            sales: rows,
            branchid: 'B001',
            branchname: 'Hyderabad Branch'
        });
    });
};

const sales_details = (req, res) => {
    const salesId = req.params.id;
    db.get('SELECT * FROM sales_manager_sales WHERE sales_id = ?', [salesId], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal Server Error');
        }
        if (!row) {
            return res.status(404).send('Sale not found');
        }
        res.render('salesmanager/sales_feature/salesdetails', {
            activePage: 'employee',
            activeRoute: 'sales',
            sale: row
        });
    });
};

const addsale_post = (req, res) => {
    const { branch_name, salesman_name, customer_name, product_name, quantity, total_amount, saledate, price, phone_number } = req.body;
    db.run(
        `INSERT INTO sales_manager_sales (branch_name, salesman_name, customer_name, product_name, quantity, total_amount, saledate, price, profit_loss, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [branch_name, salesman_name, customer_name, product_name, quantity, total_amount, saledate, price, 0, phone_number],
        (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ success: false, message: 'Error adding sale' });
            }
            res.json({ success: true, redirect: '/salesmanager/sales' });
        }
    );
};

module.exports = {
    sales_display,
    sales_details,
    addsale_post
};