const Employee = require('../../models/employees');
const Branch = require('../../models/branches');

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
    const employee = await Employee.findOne({ e_id: req.params.e_id }).lean();
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    // Fetch all active branches
    const allBranches = await Branch.find({ active: "active" }).lean();
    // Fetch unassigned branches for Sales Manager role
    const unassignedBranches = await Branch.find({
      active: "active",
      $or: [
        { manager_assigned: false },
        { manager_assigned: { $exists: false } }
      ]
    }).lean();
    // Fetch the current branch if assigned
    let currentBranch = null;
    if (employee.bid) {
      currentBranch = await Branch.findOne({ bid: employee.bid }).lean();
    }
    res.render('owner/employee_feature/edit_employee.ejs', {
      activePage: 'employee',
      activeRoute: 'employees',
      employee,
      allBranches,
      unassignedBranches,
      currentBranch
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

    // Find the employee to get the current bid and role
    const employee = await Employee.findOne({ e_id });
    if (!employee) {
      return res.status(404).send('Employee not found');
    }

    // Update employee details
    const updatedEmployee = await Employee.findOneAndUpdate(
      { e_id },
      {
        f_name,
        last_name,
        role,
        bid,
        status,
        email,
        phone_no: phone_no || null,
        acno,
        ifsc,
        bankname,
        base_salary,
        address: address || null
      },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).send('Employee not found');
    }

    // Handle branch manager updates
    if (role === 'Sales Manager') {
      // If branch is assigned, update the branch
      if (bid && bid !== 'null') {
        const branch = await Branch.findOne({ bid });
        if (branch) {
          // Check if another Sales Manager is already assigned (and it's not the current employee)
          if (branch.manager_assigned && branch.manager_id && branch.manager_id.toString() !== updatedEmployee._id.toString()) {
            return res.status(400).send(`Branch ${bid} already has a Sales Manager assigned.`);
          }
          branch.manager_id = updatedEmployee._id;
          branch.manager_name = `${f_name} ${last_name}`;
          branch.manager_email = email;
          branch.manager_ph_no = phone_no || 'N/A';
          branch.manager_assigned = true;
          await branch.save();
        } else {
          console.warn(`Branch with bid ${bid} not found.`);
        }
      }
      // If branch is unassigned, clear manager details from the old branch
      if (employee.bid && (!bid || bid === 'null')) {
        await Branch.findOneAndUpdate(
          { bid: employee.bid },
          {
            manager_id: null,
            manager_name: 'Not Assigned',
            manager_email: 'N/A',
            manager_ph_no: 'N/A',
            manager_assigned: false
          }
        );
      }
    } else if (employee.role === 'Sales Manager' && role !== 'Sales Manager') {
      // If role changed from Sales Manager to something else, clear manager details
      if (employee.bid) {
        await Branch.findOneAndUpdate(
          { bid: employee.bid },
          {
            manager_id: null,
            manager_name: 'Not Assigned',
            manager_email: 'N/A',
            manager_ph_no: 'N/A',
            manager_assigned: false
          }
        );
      }
    }

    res.redirect(`/admin/employee/${e_id}`);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).send('Error updating employee: ' + error.message);
  }
}

module.exports = { loademployeedata, getEmployeeDetails, getEditEmployee, updateEmployee };