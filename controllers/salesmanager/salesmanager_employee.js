// controllers/employeeController.js
const employeeData = [
    {
      e_id: "emp001",
      f_name: "Naman",
      last_name: "Sai",
      role: "salesman",
      bid: "Not Assigned",
      status: "active",
      email: "owner@gmail.com",
      phone_no: "N/A",
      acno: "123",
      ifsc: "1234",
      bankname: "hdfc",
      base_salary: "1234",
      address: "N/A",
      createdBy: "naman",
      reason_for_exit: "N/A",
    },
    {
      e_id: "emp002",
      f_name: "Priya",
      last_name: "Sharma",
      role: "salesman",
      bid: "Branch A",
      status: "active",
      email: "priya.sharma@gmail.com",
      phone_no: "9876543210",
      acno: "456",
      ifsc: "7890",
      bankname: "icici",
      base_salary: "5000",
      address: "123 Main St",
      createdBy: "admin",
      reason_for_exit: "N/A",
    },
    {
      e_id: "emp003",
      f_name: "Ravi",
      last_name: "Kumar",
      role: "salesman",
      bid: "Branch B",
      status: "inactive",
      email: "ravi.kumar@gmail.com",
      phone_no: "9123456789",
      acno: "789",
      ifsc: "1234",
      bankname: "sbi",
      base_salary: "4000",
      address: "456 Park Ave",
      createdBy: "hr",
      reason_for_exit: "Personal Reasons",
    },
    {
      e_id: "emp004",
      f_name: "Sneha",
      last_name: "Patel",
      role: "salesman",
      bid: "Branch A",
      status: "active",
      email: "sneha.patel@gmail.com",
      phone_no: "9988776655",
      acno: "101",
      ifsc: "5678",
      bankname: "hdfc",
      base_salary: "3500",
      address: "789 Hill Rd",
      createdBy: "naman",
      reason_for_exit: "N/A",
    },
    {
      e_id: "emp005",
      f_name: "Amit",
      last_name: "Singh",
      role: "salesman",
      bid: "Branch C",
      status: "active",
      email: "amit.singh@gmail.com",
      phone_no: "9456789123",
      acno: "202",
      ifsc: "9012",
      bankname: "axis",
      base_salary: "3000",
      address: "321 Oak St",
      createdBy: "hr",
      reason_for_exit: "N/A",
    },
  ];
  
  async function employeeDisplay(req, res) {
    try {
      const activeEmployees = employeeData;
      res.render("salesmanager/employee_features/employee_display", {
        employeeData: activeEmployees,
        activePage: "employee",
        activeRoute: "employees",
      });
    } catch (error) {
      console.error("Error rendering employees:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  
  async function employeeDetail(req, res) {
    try {
      const e_id = req.params.e_id;
      const employee = employeeData.find(emp => emp.e_id === e_id);
      if (!employee) {
        return res.status(404).send("Employee not found");
      }
      res.render("salesmanager/employee_features/employee_details", {
        employee: employee,
        activePage: "employee",
        activeRoute: "employees",
      });
    } catch (error) {
      console.error("Error rendering employee details:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  
  module.exports = { employeeDisplay, employeeDetail };