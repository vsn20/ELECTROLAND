const orderdata = [
    {
        oid: "1",
        bid: "2",
        pid: "p001",
        quantity: "19",
        status: "shipped",
        orderdate: "12/02/2025",
        deliverydate: "13/02/2025",
        installationtype: "Paid" // Added installationtype
    },
    {
        oid: "134",
        bid: "1",
        pid: "p101",
        quantity: "105",
        status: "peding",
        orderdate: "12/03/2025",
        deliverydate: "-",
        installationtype: "Free" // Added installationtype
    },
    {
        oid: "125",
        bid: "2",
        pid: "p121",
        quantity: "100",
        status: "delivered",
        orderdate: "19/12/2024",
        deliverydate: "13/02/2025",
        installationtype: "Paid" // Added installationtype
    },
    {
        oid: "10",
        bid: "12",
        pid: "p111",
        quantity: "11",
        status: "cancelled",
        orderdate: "1/11/2024",
        deliverydate: "-",
        installationtype: "Free" // Added installationtype
    },
];

async function orders_display(req, res) {
    try {
        const ordersdata = orderdata;
        res.render("company/orders_feature/orderdata", {
            orders: ordersdata,
            activePage: 'employee',
            activeRoute: 'orders'
        });
    } catch (error) {
        console.error("Error rendering orders:", error); // Updated error message for clarity
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    orders_display,
};