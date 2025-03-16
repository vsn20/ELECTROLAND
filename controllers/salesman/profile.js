// Sample salesman data (replace with database query in a real app)
const salesman = {
    salesmanId: "S001",
    firstName: "John",
    lastName: "Doe",
    role: "Salesman",
    status: "Active",
    branch: "North Branch",
    email: "john.doe@electroland.com",
    phoneNumber: "+1-555-123-4567",
    registrationDate: "2025-03-01",
    accountNumber: "123456789012",
    ifscCode: "ELECT001",
    bank: "ElectroBank",
    hireDate: "2023-05-15",
    monthlySalary: 5000,
    address: "123 Elm Street, Springfield, IL 62701"
  };
  
  async function getSalesmanDetails(req, res) {
    try {
      res.render("salesman/Employee_details/employee_details", {
        salesman: {
          ...salesman,
          formattedRegistrationDate: new Date(salesman.registrationDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          }),
          formattedHireDate: new Date(salesman.hireDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          })
        },
        activePage: 'employee',
        activeRoute: 'employees'
      });
    } catch (error) {
      console.log("Error rendering employee details:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  
  module.exports = { getSalesmanDetails };