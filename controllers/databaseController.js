const Service = require("../models/Service");
const Calendar = require("../models/Calendar");
const Resdem = require("../models/Resdem");

function fmtDate(d) {
    if (!d) return "";
    const x = new Date(d);
    const y = x.getUTCFullYear();
    const m = String(x.getUTCMonth() + 1).padStart(2, "0");
    const day = String(x.getUTCDate()).padStart(2, "0");
    return `${y}.${m}.${day}`;
}

exports.index = async (req, res) => {
    const [services, calendar, resdems] = await Promise.all([
        Service.find().sort({ id: 1 }).lean(),
        Calendar.find().sort({ sdate: 1 }).limit(40).lean(),
        Resdem.find().sort({ demand: 1 }).limit(40).lean()
    ]);

    const serviceMap = {};
    services.forEach((s) => {
        serviceMap[s.id] = s;
    });

    res.render("database", {
        title: "Database",
        services,
        calendar: calendar.map((c) => ({
            ...c,
            sdateLabel: fmtDate(c.sdate),
            serviceLabel: serviceMap[c.servid]
                ? `${serviceMap[c.servid].wtype} — ${serviceMap[c.servid].description}`
                : c.servid
        })),
        resdems: resdems.map((r) => ({
            ...r,
            demandLabel: fmtDate(r.demand),
            serviceLabel: serviceMap[r.servid]
                ? serviceMap[r.servid].wtype
                : r.servid
        })),
        calendarTotal: await Calendar.countDocuments(),
        resdemTotal: await Resdem.countDocuments()
    });
};
