require("dotenv").config();
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("./models/User");
const Service = require("./models/Service");
const Calendar = require("./models/Calendar");
const Resdem = require("./models/Resdem");

function parseHuDate(text) {
    // 2018.01.04 -> Date
    const [y, m, d] = text.trim().split(".").map(Number);
    return new Date(Date.UTC(y, m - 1, d));
}

function readTsv(fileName) {
    const raw = fs.readFileSync(path.join(__dirname, "data", fileName), "utf8");
    const lines = raw.split(/\r?\n/).filter((line) => line.trim().length > 0);
    const headers = lines[0].split("\t").map((h) => h.trim());
    return lines.slice(1).map((line) => {
        const cols = line.split("\t");
        const row = {};
        headers.forEach((h, i) => {
            row[h] = (cols[i] || "").trim();
        });
        return row;
    });
}

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected. Seeding...");

    await Promise.all([
        Service.deleteMany({}),
        Calendar.deleteMany({}),
        Resdem.deleteMany({}),
        User.deleteMany({})
    ]);

    const serviceRows = readTsv("services.txt").map((r) => ({
        id: Number(r.id),
        wtype: r.wtype,
        description: r.description
    }));
    await Service.insertMany(serviceRows);
    console.log(`Services: ${serviceRows.length}`);

    const calendarRows = readTsv("calendar.txt").map((r, index) => ({
        id: index + 1,
        sdate: parseHuDate(r.sdate),
        servid: Number(r.servid)
    }));
    await Calendar.insertMany(calendarRows);
    console.log(`Calendar: ${calendarRows.length}`);

    const resdemRows = readTsv("resdems.txt").map((r, index) => ({
        id: index + 1,
        demand: parseHuDate(r.demand),
        servid: Number(r.servid),
        quantity: Number(r.quantity)
    }));
    await Resdem.insertMany(resdemRows);
    console.log(`Resident demands: ${resdemRows.length}`);

    const adminHash = await bcrypt.hash("admin123", 10);
    const userHash = await bcrypt.hash("user123", 10);
    await User.create([
        { username: "admin", password: adminHash, role: "admin" },
        { username: "demo", password: userHash, role: "user" }
    ]);
    console.log("Users: admin / admin123  |  demo / user123");

    await mongoose.disconnect();
    console.log("Seed finished.");
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
