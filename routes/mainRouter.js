const router = require("express").Router();
const { isLoggedIn, isAdmin } = require("../middleware/auth");

const homeController = require("../controllers/homeController");
const authController = require("../controllers/authController");
const databaseController = require("../controllers/databaseController");
const contactController = require("../controllers/contactController");
const messageController = require("../controllers/messageController");
const graphController = require("../controllers/graphController");
const crudController = require("../controllers/crudController");

// Guest can open: Mainpage, Database, Contact, Login, Registration
// Graph: no role rule in the task → public (like Database)
router.get("/", homeController.index);
router.get("/database", databaseController.index);
router.get("/contact", contactController.getForm);
router.post("/contact", contactController.postForm);
router.get("/graph", graphController.index);

router.get("/register", authController.registerGet);
router.post("/register", authController.registerPost);
router.get("/login", authController.loginGet);
router.post("/login", authController.loginPost);
router.get("/logout", authController.logout);

// Only logged-in user (registered visitor + admin)
router.get("/messages", isLoggedIn, messageController.index);

// Only Admin
router.get("/crud", isAdmin, crudController.index);
router.get("/crud/new", isAdmin, crudController.newForm);
router.post("/crud", isAdmin, crudController.create);
router.get("/crud/:id/edit", isAdmin, crudController.editForm);
router.post("/crud/:id", isAdmin, crudController.update);
router.post("/crud/:id/delete", isAdmin, crudController.remove);

module.exports = router;
