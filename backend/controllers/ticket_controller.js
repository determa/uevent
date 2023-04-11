const ApiError = require('../error/ApiError');
const { Ticket } = require('../models/models');

class TicketController {
    async create(req, res, next) {
        try {
            const { accountId, eventId } = req.dae;
            const { transaction_id } = req.answer;
            const ticket = await Ticket.create({ accountId: accountId, eventId: eventId, transaction_id: transaction_id });
            return res.json(ticket);
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new TicketController();