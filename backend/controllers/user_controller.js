const ApiError = require('../error/ApiError');
const { User } = require('../models/models');
const uuid = require('uuid');
const path = require('path');

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

    async upload_avatar(req, res, next) {
        try {
            if (req.files) {
                const { avatar } = req.files;
                let fileName = uuid.v4() + '.jpg';
                avatar.mv(path.resolve(__dirname, '..', 'static', fileName));
                await User.update({ picture: fileName }, { where: { id: req.account.id } });
            }
            return res.json({ message: "Avatar changed!" });
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("User does not exists"));
        }
    }

    async update_data(req, res, next) {
        try {
            const { id } = req.params;
            const { accountId } = req.account;
            const data = req.body;
            const user = await User.findOne({ where: { id } });
            if (user.accountId != accountId) {
                return next(ApiError.forbidden("Нет доступа!"));
            }
            await User.update(data, { where: { id } });
            return res.json({ message: "Data changed!" });
        } catch (error) {
            return next(ApiError.badRequest("Update data error!"));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await User.destroy({ where: { id } });
            return res.json({ message: "User deleted!" });
        } catch (error) {
            return next(ApiError.badRequest("Delete user error!"));
        }
    }
}

module.exports = new UserController();