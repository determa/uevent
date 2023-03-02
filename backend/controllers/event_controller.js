const ApiError = require("../error/ApiError");
const { User, Company, Account, Category, Event } = require("../models/models");

class EventController {
    async create(req, res, next) {
        try {
            let { title, picture, description, date, location, price, tickets_count } = req.body;

            if (!title || !description || !date ||!location || !price || !tickets_count)
                return next(ApiError.badRequest("Некорректное поле!"));

            let event = await Event.create({ title, picture, description,
                date, location, price, tickets_count, companyId: req.account.id });
                
            // const db_categories = await Category.findAll({
            //     where: { id: categories },
            // });
            // if (!db_categories[0])
            //     return next(ApiError.notFound("Category not found!"));
            // const event_category = await event.addCategory(db_categories);

            return res.json(event);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            let { id } = req.params;
            const event = await Event.findOne({
                where: { id },
                include: { model: Category },
            });
            // if (event.status == false) {
            //     if (req.user.id != event.userId && req.user.role != "ADMIN") {
            //         return next(ApiError.forbidden());
            //     }
            // }
            return res.json(event);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            let { limit, page, categories, locations, startDate, endDate, sort } = req.query;

            page = page || 1;
            limit = limit || 10;
            let offset = page * limit - limit;

            let eventObj = {};
            let catObj = { where: {} };
            // let locObj = { where: {} };

            if (categories) catObj.where.id = categories.split(",");
            // if (locations) locObj.where.id = locations.split(",");

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
                // attributes: {
                //     include: [
                //         [
                //             literal(
                //                 `(SELECT COUNT(*) FROM event_likes WHERE "eventId" = event.id AND type = 'LIKE')`
                //             ),
                //             "countlike",
                //         ],
                //     ],
                // },
                order: sortArr,
            });
            return res.json(event);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getCategories(req, res, next) {
        try {
            let { id } = req.params;
            const event = await Event.findOne({
                where: { id },
                include: { model: Category },
            });
            if (!event) return next(ApiError.notFound("Event not found"));
            return res.json(event.categories);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // async patch(req, res, next) {
    //     try {
    //         let { id } = req.params;
    //         let { title, picture, description, date, location, price, tickets_count, categories } = req.body;

    //         const event = await Event.findOne({ where: { id } });
    //         if (!event) return next(ApiError.notFound("Event not found!"));

    //         if (req.account.id != event.userId && req.account.role != "ADMIN") {
    //             return next(ApiError.forbidden());
    //         }

    //         let data = {};
    //         if (content && req.user.id == event.userId) data.content = content;

    //         if (!data.content && data.status === undefined)
    //             return next(ApiError.forbidden());
    //         await Event.update(data, { where: { id } });

    //         const db_categories = await Category.findAll({
    //             where: { id: categories },
    //         });
    //         // if (!db_categories[0])
    //         //     return next(ApiError.notFound("Category not found!"));
    //         await event.setCategories(db_categories);

    //         return res.json({ message: "Event update!" });
    //     } catch (e) {
    //         next(ApiError.badRequest(e.message));
    //     }
    // }
}

module.exports = new EventController();
