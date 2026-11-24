const Message = require("../models/Message");

exports.index = async (req, res) => {
    const messages = await Message.find().sort({ createdAt: -1 }).lean();
    res.render("messages", {
        title: "Messages",
        messages
    });
};
