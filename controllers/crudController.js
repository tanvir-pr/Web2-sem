const Service = require("../models/Service");

exports.index = async (req, res) => {
    const services = await Service.find().sort({ id: 1 }).lean();
    res.render("crud/index", { title: "CRUD — Services", services });
};

exports.newForm = (req, res) => {
    res.render("crud/form", {
        title: "Add service",
        mode: "create",
        service: { id: "", wtype: "", description: "" },
        action: "/crud"
    });
};

exports.create = async (req, res) => {
    try {
        const max = await Service.findOne().sort({ id: -1 }).lean();
        const nextId = max ? max.id + 1 : 1;
        await Service.create({
            id: nextId,
            wtype: req.body.wtype,
            description: req.body.description
        });
        req.session.message = "Service created.";
        res.redirect("/crud");
    } catch (err) {
        if (err.name === "ValidationError") {
            req.session.message = Object.values(err.errors).map((e) => e.message).join(" ");
            req.session.formData = req.body;
            return res.redirect("/crud/new");
        }
        console.error(err);
        req.session.message = "Could not create service.";
        res.redirect("/crud");
    }
};

exports.editForm = async (req, res) => {
    const service = await Service.findById(req.params.id).lean();
    if (!service) {
        req.session.message = "Service not found.";
        return res.redirect("/crud");
    }
    res.render("crud/form", {
        title: "Edit service",
        mode: "edit",
        service,
        action: `/crud/${service._id}`
    });
};

exports.update = async (req, res) => {
    try {
        await Service.findByIdAndUpdate(
            req.params.id,
            {
                wtype: req.body.wtype,
                description: req.body.description
            },
            { runValidators: true }
        );
        req.session.message = "Service updated.";
        res.redirect("/crud");
    } catch (err) {
        if (err.name === "ValidationError") {
            req.session.message = Object.values(err.errors).map((e) => e.message).join(" ");
            return res.redirect(`/crud/${req.params.id}/edit`);
        }
        console.error(err);
        req.session.message = "Could not update service.";
        res.redirect("/crud");
    }
};

exports.remove = async (req, res) => {
    await Service.findByIdAndDelete(req.params.id);
    req.session.message = "Service deleted.";
    res.redirect("/crud");
};
