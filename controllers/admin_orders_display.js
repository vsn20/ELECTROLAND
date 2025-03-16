const orderdata=[
    {
    oid:"1",
    bid:"2",
    cid:"2",
    pid:"p001",
    quantity:"19",
    status:"shipped",
    orderdate:"12/02/2025",
    deliverydate:"13/02/2025",
},
{
    oid:"134",
    bid:"1",
    cid:"6",
    pid:"p101",
    quantity:"105",
    status:"peding",
    orderdate:"12/03/2025",
    deliverydate:"-",
},
{
    oid:"125",
    bid:"2",
    cid:"9",
    pid:"p121",
    quantity:"100",
    status:"delivered",
    orderdate:"19/12/2024",
    deliverydate:"13/02/2025",
},
{
    oid:"10",
    bid:"12",
    cid:"9",
    pid:"p111",
    quantity:"11",
    status:"cancelled",
    orderdate:"1/11/2024",
    deliverydate:"-",
},
];
async function orders_display(req, res) {
    try {
        const ordersdata = orderdata;
        res.render("owner/order_feature/order_admin", {
            orders:ordersdata,
            activePage: 'employee',
            activeRoute: 'orders'
        });
    } catch (error) {
        console.error("Error rendering branches:", error);
        res.status(500).send("Internal Server Error");
    }
}
module.exports={
    orders_display,
}
