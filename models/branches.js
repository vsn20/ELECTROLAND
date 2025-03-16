const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
    bid: { 
        type: String, 
        unique: true, 
        required: true 
    }, // Branch ID, unique identifier
    b_name: { 
        type: String, 
        required: true 
    }, // Branch name
    location: { 
        type: String, 
        required: true 
    }, // Branch location (e.g., city or address)
    manager_assigned: { 
        type: Boolean, 
        default: false 
    }, // Boolean to indicate if a manager is assigned
    createdAt: { 
        type: Date, 
        default: Date.now 
    }, // Creation timestamp
    active: { 
        type: String, 
        enum: ["active", "inactive"], 
        default: "active" 
    } // Status: active or inactive
});

const Branch = mongoose.model("Branch", BranchSchema);
module.exports = Branch;