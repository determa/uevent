const ApiError = require("../error/ApiError");
const { User, Company, Account, Category, Event, Theme, ThemeCategory } = require("../models/models");

class CategoryController {
    async get_all_categories(req, res, next) {
        try {
            const categories = await Category.findAll();
            return res.json(categories);
        } catch (error) {
            console.log(error);
            return next(ApiError.internal("Server error! Try again later!"));
        }
    }

    async get_categories_by_theme(req, res, next) {
        try {
            let { id } = req.params;
            const theme = await Theme.findOne({ where: { id }, include: { model: Category } });
            return res.json(theme.categories);
        } catch (error) {
            console.log(error);
            return next(ApiError.internal("Server error! Try again later!"));
        }
    }

    async get_categories_by_event(req, res, next) {
        try {
            let { id } = req.params;
            const event = await Event.findOne({
                where: { id },
                include: { model: Category },
            });
            if (!event) return next(ApiError.notFound("Event not found"));
            return res.json(event.categories);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async create(req, res, next) {
        try {
            const { title } = req.body;
            if (!title) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            const category = await Category.findOne({ where: { title } })
            if (category) {
                return next(ApiError.badRequest("Категория уже создана!"));
            }
            await Category.create({ title });
            return res.json({ message: "Создание успешно!" });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal("Server error! Try again later!"));
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { title } = req.body;
            if (!title) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            const category = await Category.update({ title }, { where: { id } });
            if (!category) {
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
            await Category.destroy({ where: { id } });
            return res.json({ message: "Категория удалена!" });
        } catch (error) {
            return next(ApiError.badRequest("Delete category error!"));
        }
    }
}

module.exports = new CategoryController();
