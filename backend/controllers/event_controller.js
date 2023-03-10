const ApiError = require("../error/ApiError");
const { User, Company, Account, Category, Event } = require("../models/models");

class EventController {
    async create(req, res, next) {
        try {
            let { title, picture, description, date, location, price, tickets_count, categories } = req.body;

            if (!title || !description || !date || !location || !price || !tickets_count)
                return next(ApiError.badRequest("Некорректное поле!"));

            let event = await Event.create({
                title, picture, description,
                date, location, price, tickets_count, companyId: req.account.id
            });

            const db_categories = await Category.findAll({
                where: { id: categories },
            });
            if (!db_categories[0])
                return next(ApiError.notFound("Категории не найдено!"));
            await event.addCategory(db_categories);

            return res.json(event);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async get_one(req, res, next) {
        try {
            let { id } = req.params;
            const event = await Event.findOne({
                where: { id },
                include: { model: Category },
            });
            return res.json(event);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async get_all(req, res, next) {
        try {
            let { limit, page, categories, locations, startDate, endDate, sort } = req.query;

            page = page || 1;
            limit = limit || 10;
            let offset = page * limit - limit;

            let eventObj = {};
            let catObj = { where: {} };

            if (categories) catObj.where.id = categories.split(",");
            if (locations) eventObj.location = locations.split(",");

            if (startDate) startDate = new Date(startDate);
            if (endDate)
                endDate = new Date(endDate).getTime() + 24 * 60 * 60 * 1000 - 1; //до конца дня

            if (startDate && endDate)
                eventObj.date = { [Op.gte]: startDate, [Op.lte]: endDate };
            if (!startDate && endDate)
                eventObj.date = { [Op.lte]: endDate };
            if (startDate && !endDate)
                eventObj.date = { [Op.gte]: startDate };

            let sortArr = [[literal("countlike"), "DESC"]];
            if (sort === "-like") sortArr = [[literal("countlike"), "ASC"]];
            if (sort === "date") sortArr = [['"createdAt"', "DESC"]];
            if (sort === "-date") sortArr = [['"createdAt"', "ASC"]];

            const event = await Event.findAll({
                limit,
                offset,
                where: eventObj,
                include: [{ model: Category, catObj }],
                attributes: {
                    include: [
                        [
                            literal(
                                `(SELECT COUNT(*) FROM user_favorite WHERE "eventId" = event.id)`
                            ),
                            "countlike",
                        ],
                    ],
                },
                order: sortArr,
            });
            return res.json(event);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async get_events_by_category(req, res, next) {
        try {
            const { id } = req.params;
            let { limit, page } = req.query;
            page = page || 1;
            limit = limit || 10;
            let offset = page * limit - limit;
            const events = await Event.findAll({ limit, offset, include: { model: Category, where: { id } } });
            return res.json(events);
        } catch (error) {
            console.log(error);
            return next(ApiError.internal("Server error! Try again later!"));
        }
    }

    async update(req, res, next) {
        try {
            let { id } = req.params;
            let { title, picture, description, date, location, price, tickets_count, categories } = req.body;

            const event = await Event.findOne({ where: { id } });
            if (!event) return next(ApiError.notFound("Событие не найдено!"));

            if (req.account.id != event.companyId && req.account.role != "ADMIN" && req.account.role != "MODERATOR") {
                return next(ApiError.forbidden());
            }

            if (!title || !picture || !description || !date || !location || !price || !tickets_count) {
                return next(ApiError.notFound("Поле не заполнено!"));
            }

            const db_categories = await Category.findAll({
                where: { id: categories },
            });

            if (!db_categories[0])
                return next(ApiError.notFound("Категории не выбраны!"));

            let data = { title, picture, description, date, location, price, tickets_count };

            await Event.update(data, { where: { id } });

            await event.setCategories(db_categories);

            return res.json({ message: "Событие обновлено!" });
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            let { id } = req.params;

            const event = await Event.findOne({ where: { id } });
            if (!event) return next(ApiError.notFound("Событие не найдено!"));

            if (req.account.id != event.companyId && req.account.role != "ADMIN" && req.account.role != "MODERATOR") {
                return next(ApiError.forbidden("Нет прав доступа."));
            }

            const delEvent = await Event.destroy({ where: { id } });
            if (!delEvent) return next(ApiError.notFound("Ошибка при удалении."));
            return res.json({ message: "Событие удалено." });
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new EventController();
