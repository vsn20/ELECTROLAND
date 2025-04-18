const Employee = require('../../models/employees');
const Branch = require('../../models/branches');

async function loademployeedata(req, res) {
  try {
    const employees = await Employee.find().lean(); // Use lean for performance
    console.log('Employees fetched for homepage:', employees.map(emp => ({
      e_id: emp.e_id,
      role: emp.role,
      status: emp.status,
      bid: emp.bid
    })));
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
    const isEditable = employee.status === 'active';
    res.render('owner/employee_feature/edit_employee.ejs', {
      activePage: 'employee',
      activeRoute: 'employees',
      employee,
      allBranches,
      unassignedBranches,
      currentBranch,
      isEditable
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

    const employee = await Employee.findOne({ e_id });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Determine final bid
    let finalBid = bidFromForm === 'null' ? null : bidFromForm;
    if (role === 'Sales Manager' && (status === 'resigned' || status === 'fired')) {
      finalBid = null; // Automatically unassign branch
      if (employee.bid) {
        // Clear branch manager details
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

    // Validate Sales Manager branch assignment for active status
    if (role === 'Sales Manager' && finalBid && status === 'active') {
      const branch = await Branch.findOne({ bid: finalBid });
      if (!branch) {
        return res.status(404).json({ message: `Branch ${finalBid} not found` });
      }
      if (branch.manager_assigned && branch.manager_id && branch.manager_id.toString() !== employee._id.toString()) {
        return res.status(400).json({ message: `Branch ${finalBid} already has a Sales Manager assigned` });
      }
    }

    // Update employee
    const updatedEmployee = await Employee.findOneAndUpdate(
      { e_id },
      {
        f_name,
        last_name,
        role,
        bid: finalBid,
        status,
        email,
        phone_no: phone_no || null,
        acno,
        ifsc,
        bankname,
        base_salary,
        address: address || null,
        ...(status === 'resigned' ? { resignation_date: new Date() } : {}),
        ...(status === 'fired' ? { fired_date: new Date() } : {})
      },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Debug: Log updated employee data
    console.log('Updated employee:', {
      e_id: updatedEmployee.e_id,
      role: updatedEmployee.role,
      status: updatedEmployee.status,
      bid: updatedEmployee.bid
    });

    // Update branch if Sales Manager is active and assigned
    if (role === 'Sales Manager' && status === 'active' && finalBid) {
      await Branch.findOneAndUpdate(
        { bid: finalBid },
        {
          manager_id: updatedEmployee._id,
          manager_name: `${f_name} ${last_name}`,
          manager_email: email,
          manager_ph_no: phone_no || 'N/A',
          manager_assigned: true
        }
      );
    } else if (employee.role === 'Sales Manager' && (role !== 'Sales Manager' || !finalBid)) {
      // Clear branch if role changes from Sales Manager or branch is unassigned
      if (employee.bid && employee.bid !== finalBid) {
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
    res.status(500).json({ message: 'Error updating employee: ' + error.message });
  }
}

async function syncEmployeeBranchData(req, res) {
  try {
    const branches = await Branch.find();
    const employees = await Employee.find();

    await Branch.updateMany({}, {
      manager_id: null,
      manager_name: 'Not Assigned',
      manager_email: 'N/A',
      manager_ph_no: 'N/A',
      manager_assigned: false
    });

    for (const branch of branches) {
      if (branch.manager_assigned && branch.manager_id) {
        const managerExists = employees.some(emp => emp._id.toString() === branch.manager_id.toString());
        if (!managerExists) {
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

    for (const employee of employees) {
      if (employee.role === 'Sales Manager' && employee.bid && employee.status === 'active') {
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