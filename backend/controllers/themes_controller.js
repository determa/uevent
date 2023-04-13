const ApiError = require("../error/ApiError");
const { User, Company, Account, Category, Event, Theme } = require("../models/models");

class ThemeController {
    async get_all_themes(req, res) {
        try {
            const themes = await Theme.findAll();
            return res.json(themes);
        } catch (error) {
            console.log(error);
            return next(ApiError.internal("Server error! Try again later!"));
        }
    }

    async create(req, res, next) {
        try {
            const { name } = req.body;
            if (!name) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            const theme = await Theme.findOne({ where: { title } })
            if (theme) {
                return next(ApiError.badRequest("Категория уже создана!"));
            }
            await Theme.create({ name });
            return res.json({ message: "Создание успешно!" });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal("Server error! Try again later!"));
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            if (!name) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            const theme = await Theme.update({ name }, { where: { id } });
            if (!theme) {
                return next(ApiError.badRequest("Категории не существует!"));
            }
            return res.json({ message: "Обновление успешно!" });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal("Server error! Try again later!"));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await Theme.destroy({ where: { id } });
            return res.json({ message: "Категория удалена!" });
        } catch (error) {
            return next(ApiError.badRequest("Delete category error!"));
        }
    }
}

module.exports = new ThemeController();