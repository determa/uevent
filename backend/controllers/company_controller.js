const ApiError = require('../error/ApiError');
const { Company, Account } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const imageUpload = require('../service/imageUpload');

class CompanyController {
    async get_companys(req, res) {
        try {
            let { limit, page } = req.query;
            page = page || 1;
            limit = limit || 10;
            let offset = page * limit - limit;
            let companys = await Company.findAll({ limit, offset });
            return res.json(companys);
        } catch (error) {
            console.log(error);
            return next(ApiError.internal("Server error! Try again later!"));
        }
    }

    async get_one_company(req, res, next) {
        try {
            const { id } = req.params;
            let company = await Company.findOne({ where: { id }, include: [{ model: Account, attributes: ['email'] }] });
            if (!company) {
                return next(ApiError.badRequest("Пользователь не найден!"));
            }
            return res.json(company);
        } catch (error) {
            console.log(error);
            return next(ApiError.internal("Server error! Try again later!"));
        }
    }

    async update_data(req, res, next) {
        try {
            const { id: company_id } = req.params;
            const { accountId } = req.account;
            let { name, location, description } = req.body;
            let location_parsed = {};
            try {
                location_parsed = JSON.parse(location);
            } catch (error) {
                return next(ApiError.badRequest("Некорректное поле для локации!"));
            }
            if (!name || !description || !location_parsed.name || !location_parsed.location) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            const company = await Company.findOne({ where: { id: company_id } });
            if (!company) {
                return next(ApiError.forbidden("Компании не существует!"));
            }
            if (company.accountId != accountId) {
                return next(ApiError.forbidden("Нет доступа!"));
            }
            let picture = company.picture;
            if (req.files?.avatar) {
                picture = imageUpload(req.files.avatar)
            }
            await Company.update({ name, location, description, picture }, { where: { id: company_id } });
            return res.json({ message: "Данные изменены!" });
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest("Update data error!"));
        }
    }
}

module.exports = new CompanyController();