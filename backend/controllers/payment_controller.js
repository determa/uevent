const ApiError = require('../error/ApiError');

class PaymentController {
    async paymentCallback(req, res, next) {
        try {
            console.log(req.body)
            console.log(Buffer.from(req.body.data.toString('utf8'), 'base64').toString('ascii'));
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new PaymentController();