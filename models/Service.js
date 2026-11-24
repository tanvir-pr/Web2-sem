const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    wtype: {
        type: String,
        required: [true, "Waste type abbreviation is required."],
        trim: true,
        maxlength: [20, "Waste type can be at most 20 characters."]
    },
    description: {
        type: String,
        required: [true, "Description is required."],
        trim: true,
        maxlength: [300, "Description can be at most 300 characters."]
    }
});

module.exports = mongoose.model("Service", serviceSchema);
