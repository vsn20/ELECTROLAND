const Employee = require('../../models/employees');

async function addemployee(req, res) {
  try {
    // Extract form data from request body
    const {
      f_name,
      last_name,
      role,
      bid: bidFromForm, // Rename to avoid shadowing
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
      status: 'active', // Default to "active"
      bid, // Store null for "Not Assigned"
      email,
      phone_no,
      address,
      acno,
      ifsc,
      bankname,
      base_salary,
      createdBy, // From cookies or default
      hiredAt: new Date(), // Default to now
      resignation_date: null, // Default
      fired_date: null,      // Default
      reason_for_exit: null  // Default
    });

    // Save to MongoDB
    await newEmployee.save();

    // Send JSON success response instead of rendering
    res.status(201).json({
      success: true,
      message: 'Employee added successfully',
      redirect: '/admin/employees' // Client can use this URL for GET request
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