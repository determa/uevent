const Router = require('express');
const router = new Router();
const TicketController = require('../controllers/ticket_controller');
const EventController = require("../controllers/event_controller");
const PaymentCallbackMiddleware = require('../middleware/PaymentCallbackMiddleware');
const mailService = require('../service/mailService');
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, TicketController.get_all);
router.post('/callback', PaymentCallbackMiddleware, EventController.tickets_count_decrement, TicketController.create, mailService.sendPDF);

module.exports = router;