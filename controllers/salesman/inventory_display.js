const inventorydata=[
    {
        pid:"P001",
        pname:"Mobile phone",
        cname:"Samsung",
        modelno:"S123",
        quantity:"100",
    },
    {
        pid:"P002",
        pname:"Washing Machine",
        cname:"LG",
        modelno:"LG321",
        quantity:"50",
    },
    {
        pid:"P124",
        pname:"Mobile phone",
        cname:"APPLE",
        modelno:"I126",
        quantity:"10",
    },
    {
        pid:"P001",
        pname:"Mobile phone",
        cname:"Samsung",
        modelno:"S123",
        quantity:"300",
    },
    {
        pid:"P124",
        pname:"Washing Machine",
        cname:"LG",
        modelno:"LG321",
        quantity:"1",
    },
];

async function inventory_display(req,res){
    try{
        const stocks=inventorydata;
        const branchname="Hyderabad";
        const branchid="B001";
        res.render("salesman/inventory_feature/display_inventory",{
            stocks:stocks,
            branchid:branchid,
            branchname:branchname,
            activePage: 'employee',
            activeRoute: 'stocks',
        });
    }catch (error) {
        console.log("error rendering companies:", error);
        res.status(500).send("internal server error");
    }
}

module.exports={inventory_display};