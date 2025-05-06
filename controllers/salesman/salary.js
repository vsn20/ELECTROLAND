const salarydata=[{
    salary:"12000",
    commission:"1300",
    totalsalary:"13300",
},];
async function salary_display(req,res){
    try{
        const salary=salarydata;
        res.render("salesman/salaries_feature/display_salary", {
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