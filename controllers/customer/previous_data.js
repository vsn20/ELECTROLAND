const previous=[
{
    sale_id:"S001",
    prod_id: "P001",
    Prod_name: "Smart TV",
    Com_id: "C001",
    Model_no: "STV-55X",
    com_name: "TechCorp",
    warrantyperiod: "2 Years",
    purchasedate:"12-02-2024",
    prod_description: "55-inch 4K Ultra HD Smart TV with HDR10 support.",
    installation:"Done",
    price: "$29",
},
{ sale_id:"S002",
    prod_id: "P001",
    Prod_name: "Smart TV",
    Com_id: "C001",
    Model_no: "STV-55X",
    com_name: "TechCorp",
    warrantyperiod: "2 Years",
    purchasedate:"12-02-2024",
    prod_description: "55-inch 4K Ultra HD Smart TV with HDR10 support.",
    installation:"Pending",
    price: "$29",
},
{ sale_id:"S003",
    prod_id: "P001",
    Prod_name: "Smart TV",
    Com_id: "C001",
    Model_no: "STV-55X",
    com_name: "TechCorp",
    warrantyperiod: "2 Years",
    purchasedate:"12-02-2024",
    prod_description: "55-inch 4K Ultra HD Smart TV with HDR10 support.",
    installation:"None",
    price: "$29",
},
];


async function previous_data_display(req,res){
   try{
        const pdata=previous;
        res.render("customer/previousdata_feature/previousdata",{
            data:pdata,
            activePage:'customer',
            activeRoute:'previouspurchases',
        })
   }
   catch(error){
    console.error("Error rendering data:", error);
        res.status(500).send("Internal Server Error");
   }
}

async function total_previous_data_display(req,res){
    try{
        const saleid=req.params.saleid;
         const pdata=previous.find(s=>s.sale_id===saleid);
         res.render("customer/previousdata_feature/total_previous_data_display",{
             sale:pdata,
             activePage:'customer',
             activeRoute:'previouspurchases',
         })
    }
    catch(error){
     console.error("Error rendering data:", error);
         res.status(500).send("Internal Server Error");
    }
 }
 

module.exports={
    previous_data_display,
    total_previous_data_display,
}
