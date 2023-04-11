const Router = require("express");
const router = new Router();
const EventController = require("../controllers/event_controller");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", EventController.get_all);
router.get("/:id", EventController.get_one);
router.get("/payment-data/:id", authMiddleware, EventController.get_payment_data);
router.get("/category/:id", EventController.get_events_by_category);
router.post("/", authMiddleware, EventController.create);
router.patch("/:id", authMiddleware, EventController.update);
router.delete("/:id", authMiddleware, EventController.delete);

module.exports = router;
