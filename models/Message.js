const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
        trim: true,
        minlength: [2, "Name must be at least 2 characters."],
        maxlength: [80, "Name can be at most 80 characters."]
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address."]
    },
    subject: {
        type: String,
        required: [true, "Subject is required."],
        trim: true,
        maxlength: [120, "Subject can be at most 120 characters."]
    },
    body: {
        type: String,
        required: [true, "Message body is required."],
        trim: true,
        minlength: [10, "Message must be at least 10 characters."],
        maxlength: [2000, "Message can be at most 2000 characters."]
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", messageSchema);
