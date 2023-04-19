const ApiError = require('../error/ApiError');
const { User } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const imageUpload = require('../service/imageUpload');

class UserController {
    async get_users(req, res) {
        try {
            let { limit, page } = req.query;
            page = page || 1;
            limit = limit || 10;
            let offset = page * limit - limit;
            let users = await User.findAll({ limit, offset });
            return res.json(users);
        } catch (error) {
            console.log(error);
            return next(ApiError.internal("Server error! Try again later!"));
        }
    }

    async get_one_user(req, res, next) {
        try {
            const { id } = req.params;
            let user = await User.findOne({ where: { id } });
            if (!user) {
                return next(ApiError.badRequest("Пользователь не найден!"));
            }
            return res.json(user);
        } catch (error) {
            console.log(error);
            return next(ApiError.internal("Server error! Try again later!"));
        }
    }

    async update_data(req, res, next) {
        try {
            const { id: users_id } = req.params;
            const { id } = req.account;
            let { name, visible } = req.body;
            if (users_id != id) {
                return next(ApiError.forbidden("Нет доступа!"));
            }
            const user = await User.findOne({ where: { id: users_id } });
            if (!name) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            visible == 'on' ? visible = false : visible = true;
            if (!user) {
                return next(ApiError.forbidden("Юзера не существует!"));
            }
            let picture = user.picture;
            if (req.files?.avatar) {
                picture = imageUpload(req.files.avatar)
            }
            await User.update({ picture, name, visible }, { where: { id } });
            return res.json({ message: "Данные изменены!" });
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest("Ошибка обновления данных юзера!"));
        }
    }
}

module.exports = new UserController();