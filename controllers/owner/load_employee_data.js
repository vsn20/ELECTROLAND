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
    const allBranches = await Branch.find({ active: "active" }).lean();
    const unassignedBranches = await Branch.find({
      active: "active",
      manager_assigned: false
    }).lean();
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

    const employee = await Employee.findOne({ e_id });
    if (!employee) {
      return res.status(404).send('Employee not found');
    }

    if (role === 'Sales Manager' && bid && bid !== 'null') {
      const branch = await Branch.findOne({ bid });
      if (!branch) {
        return res.status(404).send(`Branch ${bid} not found.`);
      }
      if (branch.manager_assigned && branch.manager_id && branch.manager_id.toString() !== employee._id.toString()) {
        return res.status(400).send(`Branch ${bid} already has a Sales Manager assigned.`);
      }
    }

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

    if (role === 'Sales Manager') {
      if (bid && bid !== 'null') {
        await Branch.findOneAndUpdate(
          { bid },
          {
            manager_id: updatedEmployee._id,
            manager_name: `${f_name} ${last_name}`,
            manager_email: email,
            manager_ph_no: phone_no || 'N/A',
            manager_assigned: true
          }
        );
      }
      if (employee.bid && (bid !== employee.bid || !bid || bid === 'null')) {
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
    } else if (employee.role === 'Sales Manager') {
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

async function syncEmployeeBranchData(req, res) {
  try {
    // Fetch all branches and employees
    const branches = await Branch.find();
    const employees = await Employee.find();

    // Reset all branches to "Not Assigned"
    await Branch.updateMany({}, {
      manager_id: null,
      manager_name: 'Not Assigned',
      manager_email: 'N/A',
      manager_ph_no: 'N/A',
      manager_assigned: false
    });

    // Check for orphaned manager assignments (branches with non-existent managers)
    for (const branch of branches) {
      if (branch.manager_assigned && branch.manager_id) {
        const managerExists = employees.some(emp => emp._id.toString() === branch.manager_id.toString());
        if (!managerExists) {
          // Clear details for branches with non-existent managers
          await Branch.findOneAndUpdate(
            { bid: branch.bid },
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
    }

    // Assign valid Sales Managers to branches
    for (const employee of employees) {
      if (employee.role === 'Sales Manager' && employee.bid) {
        const branch = await Branch.findOne({ bid: employee.bid });
        if (branch && !branch.manager_assigned) {
          await Branch.findOneAndUpdate(
            { bid: employee.bid },
            {
              manager_id: employee._id,
              manager_name: `${employee.f_name} ${employee.last_name}`,
              manager_email: employee.email,
              manager_ph_no: employee.phone_no || 'N/A',
              manager_assigned: true
            }
          );
        }
      }
    }

    res.status(200).send('Employee and branch data synced successfully');
  } catch (error) {
    console.error('Error syncing employee and branch data:', error);
    res.status(500).send('Error syncing data: ' + error.message);
  }
}

module.exports = { 
  loademployeedata, 
  getEmployeeDetails, 
  getEditEmployee, 
  updateEmployee, 
  syncEmployeeBranchData 
};