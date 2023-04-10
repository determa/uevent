const Router = require('express');
const router = new Router();
const tickettController = require('../controllers/ticket_controller');
const PaymentCallbackMiddleware = require('../middleware/PaymentCallbackMiddleware');

router.post('/callback', PaymentCallbackMiddleware, tickettController.create);

module.exports = router;