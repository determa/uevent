const ApiError = require("../error/ApiError");
const { Event, EventNotification } = require("../models/models");

class EventNotifController {
    async get_events(req, res, next) {
        try {
            const { accountId } = req.account;
            let notif = await EventNotification.findOne({ where: { accountId }, include: Event });
            console.log(notif);
            res.json(notif.events);
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest("Ошибка получения состояния подписи на компанию!"));
        }
    }

    async state(req, res, next) {
        try {
            const { eventId } = req.query;
            const { accountId } = req.account;
            let bool = false;
            if (await EventNotification.findOne({ where: { accountId, eventId } }))
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
            const { accountId } = req.account;
            let notif = await EventNotification.create({ accountId, eventId });
            res.json(notif);
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest("Ошибка подписи на эвент!"));
        }
    }

    async unsubscribe(req, res, next) {
        try {
            const { eventId } = req.query;
            const { accountId } = req.account;
            await EventNotification.destroy({ where: { accountId, eventId } });
            return res.json({ message: "Ошибка удаления подписи на эвент!" });
        } catch (error) {
            return next(ApiError.badRequest("Ошибка удаления подписи на эвента!"));
        }
    }
}

module.exports = new EventNotifController();