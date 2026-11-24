const Message = require("../models/Message");

exports.getForm = (req, res) => {
    res.render("contact", { title: "Contact" });
};

exports.postForm = async (req, res) => {
    const payload = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        body: req.body.body
    };

    try {
        await Message.create(payload);
        req.session.message = "Thank you! Your message was sent.";
        res.redirect("/contact");
    } catch (err) {
        if (err.name === "ValidationError") {
            const errors = {};
            Object.keys(err.errors).forEach((key) => {
                errors[key] = err.errors[key].message;
            });
            req.session.errors = errors;
            req.session.formData = payload;
            req.session.message = "Please fix the highlighted fields.";
            return res.redirect("/contact");
        }
        console.error(err);
        req.session.message = "Server error. Please try again later.";
        res.redirect("/contact");
    }
};
