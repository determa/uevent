const ApiError = require("../error/ApiError");
const { Account, AccountFavorite, Event } = require("../models/models");

class AccountFavoritefController {
    async get_events(req, res, next) {
        try {
            const { accountId } = req.account;
            const favorite = await Event.findAll({ include: [{ model: AccountFavorite, where: { accountId } }] });
            res.json(favorite)
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest("Ошибка получения избранных ивэнтов!"));
        }
    }


    async state(req, res, next) {
        try {
            const { eventId } = req.query;
            const { accountId } = req.account;
            let bool = false;
            if (await AccountFavorite.findOne({ where: { accountId, eventId } }))
                bool = true;
            res.json(bool);
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest("Ошибка получения состояния избранного!"));
        }
    }

    async subscribe(req, res, next) {
        try {
            const { eventId } = req.query;
            const { accountId } = req.account;
            let notif = await AccountFavorite.create({ accountId, eventId });
            res.json(notif);
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest("Ошибка добавления в избранное!"));
        }
    }

    async unsubscribe(req, res, next) {
        try {
            const { eventId } = req.query;
            const { accountId } = req.account;
            await AccountFavorite.destroy({ where: { accountId, eventId } });
            return res.json({ message: "Подпись на компанию удалена!" });
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest("Ошибка удаления избранного!"));
        }
    }
}

module.exports = new AccountFavoritefController();
