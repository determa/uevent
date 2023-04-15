const ApiError = require("../error/ApiError");
const { User, Company, Account, Category, Event, Comment } = require("../models/models");

class CommentController {
    async get_comments_by_event(req, res, next) {
        try {
            let { page, id, sort = 'date' } = req.query;
            page = page || 1;
            const limit = 10;
            const offset = page * limit - limit;
            let sortArr = [];

            if (sort === "date") sortArr = [['"createdAt"', "DESC"]];
            if (sort === "-date") sortArr = [['"createdAt"', "ASC"]];

            const comments = await Comment.findAll({
                limit, offset, where: { eventId: id },
                hierarchy: true,
                attributes: ['id', 'content', 'createdAt', 'parentId'],
                include: [
                    {
                        model: Account,
                        attributes: ['type', 'email'],
                        include: [
                            { model: User, attributes: ['id', 'name', 'picture'] },
                            { model: Company, attributes: ['id', 'name', 'picture'] }]
                    }],
                order: sortArr,
            });
            const count = await Comment.count();
            if (!comments[0]) return next(ApiError.notFound("Комментарии не найдены!"));
            return res.json({ comments, count });
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }

    async get_comments_by_account(req, res, next) {
        try {
            let { limit, page, id } = req.query;
            page = page || 1;
            limit = limit || 10;
            let offset = page * limit - limit;
            const comments = await Comment.findAll({
                limit, offset, where: { accountId: id },
                attributes: ['content', 'createdAt', 'eventId'],
                include: [
                    {
                        model: Event,
                        attributes: ['title']
                    }
                ]
            });
            if (!comments[0]) return next(ApiError.notFound("Комментарии не найдены!"));
            return res.json(comments);
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }

    async create(req, res, next) {
        try {
            let { eventId, parentId = null } = req.query;
            const { content } = req.body;
            if (!content) return next(ApiError.badRequest("Некорректное поле!"));

            const event = await Event.findOne({ where: { id: eventId } });
            if (!event) return next(ApiError.notFound("Событие не найдено!"));

            console.log(typeof parentId, parentId)
            if (typeof parentId == 'string') {
                parentId == 'null' ? parentId = null : parentId = Number(parentId)
            }

            let comment = await Comment.create({
                content,
                accountId: req.account.accountId,
                eventId,
                parentId,
            });

            if (!comment) return next(ApiError.internal("comment not add"));
            return res.json(comment);
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            let { id } = req.params;
            let { content } = req.body;

            const comment = await Comment.findOne({ where: { id } });
            if (!comment) return next(ApiError.notFound("Комментарий не найден!"));

            if (req.account.accountId != comment.accountId) {
                return next(ApiError.forbidden());
            }

            const upd = await Comment.update({ content }, { where: { id } });
            if (!upd[0]) return next(ApiError.notFound("Комментарий не обновлён!"));
            return res.json({ message: "Комментарий обновлён!" });
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            let { id } = req.params;

            const comment = await Comment.findOne({ where: { id } });
            if (!comment) return next(ApiError.notFound("Комментарий не найден!"));

            if (req.account.accountId != comment.accountId && req.account.role != "ADMIN" && req.account.role != "MODERATOR") {
                return next(ApiError.forbidden());
            }

            const commentDel = await Comment.destroy({ where: { id } });
            if (!commentDel)
                return next(ApiError.internal("Ошибка удаления комментария!"));
            return res.json({ message: "Comment delete" });
        } catch (error) {
            console.log(e);
            return next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new CommentController();
