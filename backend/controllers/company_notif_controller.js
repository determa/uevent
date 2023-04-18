const ApiError = require("../error/ApiError");
const { User, Company, CompanyNotification, Account } = require("../models/models");

class CompanyNotifController {
    async get_companies(req, res, next) {
        try {
            const { id } = req.account;
            let user = await User.findAll({ where: { id }, include: { model: Company, include: { model: Account, attributes: ['email'] } } });
            console.log(user);
            res.json(user[0].companies);
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest("Ошибка получения состояния подписи на компанию!"));
        } 
    }

    async state(req, res, next) {
        try {
            const { companyId } = req.query;
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
            const { companyId } = req.query;
            const { id, type } = req.account;
            console.log(type);
            if (type == "COMPANY") {
                return next(ApiError.badRequest("Компанию не могу подписывать на другие компании!"));
            }
            let notif = await CompanyNotification.create({ userId: id, companyId });
            res.json(notif);
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest("Ошибка подписи на эвент!"));
        }
    }

    async unsubscribe(req, res, next) {
        try {
            const { companyId } = req.query;
            const { id, type } = req.account;
            if (type == "COMPANY") {
                return next(ApiError.badRequest("Компанию не могут удалять подписки на другие компании!"));
            }
            await CompanyNotification.destroy({ where: { userId: id, companyId } });
            return res.json({ message: "Подпись на компанию удалена!" });
        } catch (error) {
            return next(ApiError.badRequest("Ошибка удаления подписи на компанию!"));
        }
    }
}

module.exports = new CompanyNotifController();
