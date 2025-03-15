const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    e_id: {
        type: String,
        unique: true,
        required: true
    }, // Employee ID, unique identifier
    f_name: {
        type: String,
        required: true
    }, // First name
    last_name: {
        type: String,
        required: true
    }, // Last name
    role: {
        type: String,
        enum: ["sales_manager", "salesman"],
        required: true
    }, // Role: Sales Manager or Salesman
    bid: {
        type: String,
        ref: "Branch",
        required: true
    }, // Foreign key referencing Branches.bid
    email: {
        type: String,
        unique: true,
        required: true
    }, // Employee email
    phone_no: {
        type: String,
        default: null
    }, // Phone number, nullable
    hiredAt: {
        type: Date,
        default: Date.now
    }, // Date of hiring
    address: {
        type: String,
        default: null
    }, // Employee address, nullable
    status: {
        type: String,
        enum: ["active", "resigned", "fired"],
        default: "active"
    }, // Status: active, resigned, or fired
    resignation_date: {
        type: Date,
        default: null
    }, // Date of resignation (if applicable)
    fired_date: {
        type: Date,
        default: null
    }, // Date of firing (if applicable)
    reason_for_exit: {
        type: String,
        default: null
    }, // Reason for resignation or firing
    acno: {
        type: String,
        required: true
    }, // Account number
    ifsc: {
        type: String,
        required: true
    }, // IFSC code
    bankname: {
        type: String,
        required: true
    }, // Bank name
    base_salary: {
        type: Number,
        required: true
    }, // Base salary
    createdBy: {
        type: String,
        required: true
    } // Creator as String
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;