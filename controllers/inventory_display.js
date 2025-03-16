const inventorydata=[
    {
        bid:"1",
        bname:"mumbai central",
        pid:"P001",
        pname:"Mobile phone",
        cname:"Samsung",
        modelno:"S123",
        quantity:"100",
    },
    {
        bid:"1",
        bname:"mumbai central",
        pid:"P002",
        pname:"Washing Machine",
        cname:"LG",
        modelno:"LG321",
        quantity:"50",
    },
    {
        bid:"2",
        bname:"Nizamabad",
        pid:"P124",
        pname:"Mobile phone",
        cname:"APPLE",
        modelno:"I126",
        quantity:"10",
    },
    {
        bid:"3",
        bname:"Chennai",
        pid:"P001",
        pname:"Mobile phone",
        cname:"Samsung",
        modelno:"S123",
        quantity:"300",
    },
    {
        bid:"4",
        bname:"Hyderabad",
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
        res.render("owner/inventory_feature/display_inventory",{
            stocks:stocks,
            activePage: 'employee',
            activeRoute: 'stocks',
        });
    }catch (error) {
        console.log("error rendering companies:", error);
        res.status(500).send("internal server error");
    }
}

module.exports={inventory_display};