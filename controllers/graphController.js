const Service = require("../models/Service");
const Resdem = require("../models/Resdem");

exports.index = async (req, res) => {
    const services = await Service.find().sort({ id: 1 }).lean();
    const serviceMap = {};
    services.forEach((s) => {
        serviceMap[s.id] = s.wtype;
    });

    const quantityByType = await Resdem.aggregate([
        { $group: { _id: "$servid", totalQuantity: { $sum: "$quantity" } } },
        { $sort: { _id: 1 } }
    ]);

    const labels = quantityByType.map((row) => serviceMap[row._id] || String(row._id));
    const data = quantityByType.map((row) => row.totalQuantity);

    res.render("graph", {
        title: "Graph",
        chartPayload: JSON.stringify({ labels, data })
    });
};
