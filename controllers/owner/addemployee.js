const Employee = require('../../models/employees');
const Branch = require('../../models/branches');

async function addemployee(req, res) {
  try {
    // Extract form data from request body
    const {
      f_name,
      last_name,
      role,
      bid: bidFromForm,
      email,
      phone_no,
      acno,
      ifsc,
      bankname,
      base_salary,
      address
    } = req.body;

    // Get createdBy from cookies, default to "owner"
    const createdBy = req.cookies.createdBy || 'owner';

    // Simple auto-increment: Count existing employees and add 1
    const employeeCount = await Employee.countDocuments();
    const e_id = `EMP${employeeCount + 1}`; // e.g., EMP1, EMP2, etc.

    // Handle "Not Assigned" (convert "null" string to actual null)
    const bid = bidFromForm === 'null' ? null : bidFromForm;

    // Create new employee instance
    const newEmployee = new Employee({
      e_id,
      f_name,
      last_name,
      role,
      status: 'active',
      bid,
      email,
      phone_no,
      address,
      acno,
      ifsc,
      bankname,
      base_salary,
      createdBy,
      hiredAt: new Date(),
      resignation_date: null,
      fired_date: null,
      reason_for_exit: null
    });

    // Save to MongoDB
    await newEmployee.save();

    // If the employee is a Sales Manager and a branch is assigned, update the branch
    if (role === 'Sales Manager' && bid && bid !== 'null') {
      const branch = await Branch.findOne({ bid });
      if (branch) {
        // Check if another Sales Manager is already assigned
        if (branch.manager_assigned) {
          return res.status(400).json({
            success: false,
            message: `Branch ${bid} already has a Sales Manager assigned.`
          });
        }
        branch.manager_id = newEmployee._id;
        branch.manager_name = `${f_name} ${last_name}`;
        branch.manager_email = email;
        branch.manager_ph_no = phone_no || 'N/A';
        branch.manager_assigned = true;
        await branch.save();
      } else {
        console.warn(`Branch with bid ${bid} not found.`);
      }
    }

    // Send JSON success response
    res.status(201).json({
      success: true,
      message: 'Employee added successfully',
      redirect: '/admin/employees'
    });

  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding employee: ' + error.message
    });
  }
}

module.exports = { addemployee };