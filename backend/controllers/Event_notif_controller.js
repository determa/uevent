const ApiError = require("../error/ApiError");
const { User, Event, EventNotification } = require("../models/models");

class EventNotifController {
    async state(req, res, next) {
        try {
            const { eventId } = req.query;
            const { id } = req.account;
            let bool = false;
            if (await EventNotification.findOne({ where: { userId: id, eventId } }))
                bool = true;
            res.json(bool);
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest("Ошибка получения состояния подписи на эвент!"));
        }
    }

    async subscribe(req, res, next) {
        try {
            const { eventId } = req.query;
            const { id } = req.account;
            let notif = await EventNotification.create({ userId: id, eventId });
            res.json(notif);
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest("Ошибка подписи на эвент!"));
        }
    }

    async unsubscribe(req, res, next) {
        try {
            const { eventId } = req.query;
            const { id } = req.account;
            await EventNotification.destroy({ where: { userId: id, eventId } });
            return res.json({ message: "Ошибка удаления подписи на эвент!" });
        } catch (error) {
            return next(ApiError.badRequest("Ошибка удаления подписи на эвента!"));
        }
    }
}

module.exports = new EventNotifController();