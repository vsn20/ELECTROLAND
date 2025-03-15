const salarydata=[
    {
      eid:"E001",
      ename:"Albert",
      role:"sales manager",
      salary:"12000",
      commission:"1200",
      totalsalary:"21000",
    },
    {
        eid:"E002",
        ename:"Einstein",
        role:"sales man",
        salary:"8900",
        commission:"200",
        totalsalary:"11000",
  
    },
    {
        eid:"E003",
        ename:"rolex",
        role:"sales manager",
        salary:"22000",
        commission:"2200",
        totalsalary:"24000",
    },
    {
        eid:"E004",
        ename:"scrpio",
        role:"sales man",
        salary:"2000",
        commission:"100",
        totalsalary:"21000",
    },
];

async function salary_display(req,res){
    try{
        const salary=salarydata;
        res.render("owner/salaries_feature/display_salary", {
            salary:salary,
            activePage: 'employee',
            activeRoute: 'salaries',
        });
    } 
    catch (error) {
        console.log("error rendering companies:", error);
        res.status(500).send("internal server error");
    }
}

module.exports = {salary_display};