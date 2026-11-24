const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    sdate: { type: Date, required: true },
    servid: { type: Number, required: true }
});

module.exports = mongoose.model("Calendar", calendarSchema);
