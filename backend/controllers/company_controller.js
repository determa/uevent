const ApiError = require('../error/ApiError');
const { Company, Account } = require('../models/models');
const uuid = require('uuid');
const path = require('path');

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

    async upload_avatar(req, res, next) {
        try {
            if (req.files) {
                const { avatar } = req.files;
                let fileName = uuid.v4() + '.jpg';
                avatar.mv(path.resolve(__dirname, '..', 'static', fileName));
                await Company.update({ picture: fileName }, { where: { id: req.account.id } });
            }
            return res.json({ message: "Avatar changed!" });
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Company does not exists"));
        }
    }

    async update_data(req, res, next) {
        try {
            const { id } = req.params;
            const data = req.body;
            await Company.update(data, { where: { id } });
            return res.json({ message: "Data changed!" });
        } catch (error) {
            return next(ApiError.badRequest("Update data error!"));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await Company.destroy({ where: { id } });
            return res.json({ message: "Company deleted!" });
        } catch (error) {
            return next(ApiError.badRequest("Delete Company error!"));
        }
    }
}

module.exports = new CompanyController();