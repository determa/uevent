const ApiError = require("../error/ApiError");
const { User, Company, CompanyNotification } = require("../models/models");

class CompanyNotifController {
    async state(req, res, next) {
        try {
            let { companyId } = req.query;
            const { id } = req.account;
            let bool = false;
            if (await CompanyNotification.findOne({ where: { userId: id, companyId } }))
                bool = true;
            res.json(bool);
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest("Ошибка получения состояния подписи на компанию!"));
        }
    }

    async subscribe(req, res, next) {
        try {
            let { companyId } = req.query;
            const { id } = req.account;
            let notif = await CompanyNotification.create({ userId: id, companyId });
            res.json(notif);
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest("Ошибка подписи на эвент!"));
        }
    }

    async unsubscribe(req, res, next) {
        try {
            let { companyId } = req.query;
            const { id } = req.account;
            await CompanyNotification.destroy({ where: { userId: id, companyId } });
            return res.json({ message: "Подпись на компанию удалена!" });
        } catch (error) {
            return next(ApiError.badRequest("Ошибка удаления подписи на компанию!"));
        }
    }
}

module.exports = new CompanyNotifController();