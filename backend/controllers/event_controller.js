const { Op } = require("sequelize");
const ApiError = require("../error/ApiError");
const { User, Company, Account, Category, Event, Theme, Ticket } = require("../models/models");
const imageUpload = require("../service/imageUpload");
const LiqPay = require('../service/liqpay');


class EventController {
    async create(req, res, next) {
        try {
            let { title, description, date, location, price, tickets_count, theme, category, members_visibility, datePublish, notification } = req.body;
            const location_parsed = JSON.parse(location);
            let picture = 'header.jpg';
            if (req.files?.avatar) {
                picture = imageUpload(req.files.avatar)
            }
            notification ? notification = true : notification = false;
            if (!title || !description || !date || !location_parsed.name || !location_parsed.location || !price || !tickets_count || !theme || !category || !members_visibility || !datePublish)
                return next(ApiError.badRequest("Некорректное поле!"));

            let event = await Event.create({
                title, picture, description,
                date, location, price, tickets_count,
                companyId: req.account.id, themeId: theme,
                categoryId: category, members_visibility,
                date_publish: datePublish, notification
            });
            req.event = event;
            return next();
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }

    async get_one(req, res, next) {
        try {
            let { id } = req.params;
            let event = await Event.findOne({
                where: { id },
                include: [{ model: Category }, { model: Theme }],
            });
            const tickets = await Ticket.findAll({ where: { eventId: id }, include: { model: Account, attributes: ["email"] } });
            let arr = [];
            tickets.forEach((element) => {
                arr.push(element.account.email);
            })
            event.dataValues.accounts = arr;
            return res.json(event);
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e.message));
        }
    }

    async get_all_by_company(req, res, next) {
        try {
            let { id } = req.params;
            const event = await Event.findAll({
                where: { companyId: id },
                include: { model: Category },
            });
            return res.json(event);
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e.message));
        }
    }

    async get_all(req, res, next) {
        try {
            let { limit, page, categories, themes, sort, date_start, date_end } = req.query;
            page = page || 1;
            limit = limit || 10;
            console.log(categories, themes)
            let categories_array = categories ? categories.split(",") : [];
            let themes_array = themes ? themes.split(",") : [];
            const offset = page * limit - limit;
            let sortArr = [];

            categories_array = categories_array[0] == 0 ? [] : categories_array;
            themes_array = themes_array[0] == 0 ? [] : themes_array;

            let eventObj = {};
            if (date_start) date_start = new Date(date_start);
            if (date_end)
                date_end = new Date(date_end).getTime() + 24 * 60 * 60 * 1000 - 1; //до конца дня

            if (date_start && date_end)
                eventObj.date = { [Op.between]: [date_start, date_end] };
            if (!date_start && date_end)
                eventObj.date = { [Op.lte]: date_end };
            if (date_start && !date_end)
                eventObj.date = { [Op.gte]: date_start };

            if (categories_array[0]) eventObj.categoryId = categories_array;
            if (themes_array[0]) eventObj.themeId = themes_array;
            if (sort === "date") sortArr = [['"date"', "ASC"]];
            if (sort === "-price") sortArr = [['"price"', "ASC"]];
            if (sort === "price") sortArr = [['"price"', "DESC"]];

            const event = await Event.findAll({
                limit,
                offset,
                where: eventObj,
                include: [{ model: Category, attributes: ['name'] }, { model: Theme, attributes: ['name'] }],
                order: sortArr,
            });
            return res.json(event);
        } catch (e) {
            console.log(e);
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
            let { title, description, date, location, price, tickets_count, theme, category, members_visibility, datePublish, notification } = req.body;
            const location_parsed = JSON.parse(location);
            const event = await Event.findOne({ where: { id } });
            if (!event) return next(ApiError.notFound("Событие не найдено!"));
            let picture = event.picture;
            if (req.files?.avatar) {
                picture = imageUpload(req.files.avatar)
            }
            notification ? notification = true : notification = false;


            if (req.account.id != event.companyId) {
                return next(ApiError.forbidden());
            }

            if (!title || !description || !date || !location_parsed.name || !location_parsed.location || !price || !tickets_count || !theme || !category || !members_visibility || !datePublish)
                return next(ApiError.badRequest("Некорректное поле!"));


            await Event.update({
                title, picture, description,
                date, location, price, tickets_count,
                companyId: req.account.id, themeId: theme,
                categoryId: category, members_visibility,
                date_publish: datePublish, notification
            }, { where: { id } });

            return res.json({ message: "Событие обновлено!" });
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e.message));
        }
    }

    async get_payment_data(req, res, next) {
        try {
            let { id } = req.params;
            const event = await Event.findOne({
                where: { id },
            });
            if (event.tickets_count <= 0) {
                return next(ApiError.badRequest("Билеты распроданы!"));
            }
            const data = LiqPay(event, req.account.accountId);
            return res.json(data);
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e.message));
        }
    }

    async tickets_count_decrement(req, res, next) {
        try {
            const { eventId } = req.dae;
            const event = await Event.findOne({ where: { id: eventId } });
            if (event.tickets_count > 0) {
                const count = event.tickets_count - 1;
                await Event.update({ tickets_count: count }, { where: { id: eventId } });
            } else {
                return next(ApiError.badRequest("Все билеты проданы, обратитесь в техподдержку для возврата средств."));
            }
            return next();
        } catch (e) {
            console.log(e)
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
            console.log(e)
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new EventController();
