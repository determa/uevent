const Router = require("express");
const router = new Router();
const EventController = require("../controllers/event_controller");
const authMiddleware = require("../middleware/authMiddleware");
const mailService = require("../service/mailService");

router.get("/", EventController.get_all);
router.get("/:id", EventController.get_one);
router.get("/company/:id", EventController.get_all_by_company);
router.get("/payment-data/:id", authMiddleware, EventController.get_payment_data);
router.get("/category/:id", EventController.get_events_by_category);
router.post("/", authMiddleware, EventController.create, mailService.sendNotificationByCompany);
router.patch("/:id", authMiddleware, EventController.update);
router.delete("/:id", authMiddleware, EventController.delete);

module.exports = router;
