const ApiError = require("../error/ApiError");
const { Account, AccountFavorite } = require("../models/models");

class AccountFavoritefController {
    async subscribe(req, res, next) {
        try {
            let { eventId } = req.query;
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
            let { eventId } = req.query;
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