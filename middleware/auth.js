exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    req.session.message = "Please log in to continue.";
    res.redirect("/login");
};

exports.isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === "admin") {
        return next();
    }
    req.session.message = "Admin access required.";
    res.redirect("/");
};
