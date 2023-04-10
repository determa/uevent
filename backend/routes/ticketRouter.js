const Router = require('express');
const router = new Router();
const TicketController = require('../controllers/ticket_controller');
const EventController = require("../controllers/event_controller");
const PaymentCallbackMiddleware = require('../middleware/PaymentCallbackMiddleware');

router.post('/callback', PaymentCallbackMiddleware, EventController.tickets_count_decrement, TicketController.create);

module.exports = router;