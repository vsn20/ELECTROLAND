const db = require('../../sqliteConnection');

const orders_display = (req, res) => {
    db.all('SELECT order_id, branch_name, company_name, product_name, status FROM orders', [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal Server Error');
        }
        res.render('salesmanager/orders_feature/ordersdisplay', {
            activePage: 'employee',
            activeRoute: 'orders',
            orders: rows
        });
    });
};

const order_details = (req, res) => {
    const orderId = req.params.id;
    db.get('SELECT * FROM orders WHERE order_id = ?', [orderId], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal Server Error');
        }
        if (!row) {
            return res.status(404).send('Order not found');
        }
        res.render('salesmanager/orders_feature/orderdetails', {
            activePage: 'employee',
            activeRoute: 'orders',
            order: row
        });
    });
};

const order_edit = (req, res) => {
    const orderId = req.params.id;
    db.get('SELECT * FROM orders WHERE order_id = ?', [orderId], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal Server Error');
        }
        if (!row) {
            return res.status(404).send('Order not found');
        }
        res.render('salesmanager/orders_feature/orderedit', {
            activePage: 'employee',
            activeRoute: 'orders',
            order: row
        });
    });
};

const order_update = (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;
    db.run(
        `UPDATE orders SET status = ? WHERE order_id = ?`,
        [status, orderId],
        (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ success: false, message: 'Error updating order status' });
            }
            res.json({ success: true, redirect: '/salesmanager/orders' });
        }
    );
};

module.exports = {
    orders_display,
    order_details,
    order_edit,
    order_update
};