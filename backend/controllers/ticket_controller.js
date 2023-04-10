const ApiError = require('../error/ApiError');

class TicketController {
    async create(req, res, next) {
        try {
            console.log(req.answer);
            let dae = Buffer.from(req.answer.dae, 'base64').toString('ascii');
            dae = JSON.parse(dae);
            console.log(dae);
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new TicketController();