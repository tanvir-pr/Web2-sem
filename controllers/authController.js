const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.registerGet = (req, res) => {
    res.render("register", { title: "Registration" });
};

exports.registerPost = async (req, res) => {
    const username = (req.body.username || "").trim();
    const password = req.body.password || "";

    if (!username || username.length < 3) {
        req.session.message = "Username must be at least 3 characters.";
        return res.redirect("/register");
    }
    if (!password || password.length < 4) {
        req.session.message = "Password must be at least 4 characters.";
        return res.redirect("/register");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        req.session.message = "This username already exists!";
        return res.redirect("/register");
    }

    const hash = await bcrypt.hash(password, 10);
    await User.create({ username, password: hash, role: "user" });
    req.session.message = "Successful registration! You can log in.";
    res.redirect("/login");
};

exports.loginGet = (req, res) => {
    res.render("login", { title: "Login" });
};

exports.loginPost = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        req.session.message = "Login failed!";
        return res.redirect("/login");
    }
    const ok = await bcrypt.compare(req.body.password || "", user.password);
    if (!ok) {
        req.session.message = "Login failed!";
        return res.redirect("/login");
    }
    req.session.user = {
        id: user._id,
        username: user.username,
        role: user.role
    };
    if (user.role === "admin") {
        return res.redirect("/crud");
    }
    res.redirect("/messages");
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};
