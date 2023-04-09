const Router = require('express');
const router = new Router();
const paymentController = require('../controllers/payment_controller');

router.post('/callback', paymentController.paymentCallback);

module.exports = router;