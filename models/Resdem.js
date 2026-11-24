const mongoose = require("mongoose");

const resdemSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    demand: { type: Date, required: true },
    servid: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 }
});

module.exports = mongoose.model("Resdem", resdemSchema);
