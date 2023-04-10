const ApiError = require('../error/ApiError');

class TicketController {
    async create(req, res, next) {
        try {
            console.log(req.answer);
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new TicketController();