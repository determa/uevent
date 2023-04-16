const ApiError = require('../error/ApiError');
const { Ticket, Event } = require('../models/models');
const pdfGenerate = require('../service/pdfGenerate');

class TicketController {
    async get_all(req, res, next) {
        try {
            const { accountId } = req.account;
            const favorite = await Ticket.findAll({
                where: { accountId }, 
                include: [{ 
                    model: Event, 
                    attributes: ['id', 'title', 'date', 'location', 'picture'],
                }]
            });
            res.json(favorite)
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest(error.message));
        }
    }

    async create(req, res, next) {
        try {
            const { accountId, eventId } = req.dae;
            const { transaction_id } = req.answer;
            await Ticket.create({ accountId: accountId, eventId: eventId, transaction_id: transaction_id });
            const { fileName, html, error } = await pdfGenerate.create(eventId, transaction_id);
            if (error) {
                console.log(error)
                return next(ApiError.internal(error.message));
            }
            req.html = html;
            req.pdf = fileName;
            return next();
        } catch (error) {
            console.log(error)
            return next(ApiError.internal(error.message));
        }
    }
}

module.exports = new TicketController();