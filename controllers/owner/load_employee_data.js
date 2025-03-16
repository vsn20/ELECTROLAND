const Employee = require('../../models/employees');

async function loademployeedata(req, res) {
  try {
    const employees = await Employee.find();
    res.render('owner/employee_feature/home.ejs', {
      activePage: 'employee',
      activeRoute: 'employees',
      employees: employees
    });
  } catch (error) {
    console.error('Error loading employee data:', error);
    res.status(500).send('Error loading employee data: ' + error.message);
  }
}

async function getEmployeeDetails(req, res) {
  try {
    const employee = await Employee.findOne({ e_id: req.params.e_id });
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    res.render('owner/employee_feature/employee_details.ejs', {
      activePage: 'employee',
      activeRoute: 'employees',
      employee: employee
    });
  } catch (error) {
    console.error('Error loading employee details:', error);
    res.status(500).send('Error loading employee details: ' + error.message);
  }
}

async function getEditEmployee(req, res) {
  try {
    const employee = await Employee.findOne({ e_id: req.params.e_id });
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    res.render('owner/employee_feature/edit_employee.ejs', {
      activePage: 'employee',
      activeRoute: 'employees',
      employee: employee
    });
  } catch (error) {
    console.error('Error loading edit employee page:', error);
    res.status(500).send('Error loading edit employee page: ' + error.message);
  }
}

async function updateEmployee(req, res) {
  try {
    const { e_id } = req.params;
    const {
      f_name,
      last_name,
      role,
      bid: bidFromForm,
      status,
      email,
      phone_no,
      acno,
      ifsc,
      bankname,
      base_salary,
      address
    } = req.body;

    const bid = bidFromForm === 'null' ? null : bidFromForm;

    const updatedEmployee = await Employee.findOneAndUpdate(
      { e_id },
      {
        f_name,
        last_name,
        role,
        bid,
        status,
        email,
        phone_no: phone_no || null, // Allow null if empty
        acno,
        ifsc,
        bankname,
        base_salary,
        address: address || null // Allow null if empty
      },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).send('Employee not found');
    }

    res.redirect(`/admin/employee/${e_id}`);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).send('Error updating employee: ' + error.message);
  }
}

module.exports = { loademployeedata, getEmployeeDetails, getEditEmployee, updateEmployee };