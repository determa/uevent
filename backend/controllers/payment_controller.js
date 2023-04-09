const ApiError = require('../error/ApiError');

class PaymentController {
    async paymentCallback(req, res, next) {
        try {
            console.log(req.body);
        } catch (error) {
            console.log(e)
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new PaymentController();