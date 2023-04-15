const ApiError = require("../error/ApiError");
const { User, Company, Account, Category, Event, Comment } = require("../models/models");

class CommentController {
    async get_comments_by_event(req, res, next) {
        try {
            let { limit, page, id } = req.query;
            page = page || 1;
            limit = limit || 10;
            let offset = page * limit - limit;
            const comments = await Comment.findAll({
                limit, offset, where: { eventId: id },
                attributes: ['id', 'content', 'createdAt'],
                include: [
                    {
                        model: Comment, as: 'replies',
                        attributes: ['id', 'content', 'createdAt'],
                        hierarchy: true,
                        include: [
                            {
                                model: Account,
                                attributes: ['type', 'email'],
                                include: [
                                    { model: User, attributes: ['id', 'name', 'picture'] },
                                    { model: Company, attributes: ['id', 'name', 'picture'] }]
                            }]
                    },
                    {
                        model: Account,
                        attributes: ['type', 'email'],
                        include: [
                            { model: User, attributes: ['id', 'name', 'picture'] },
                            { model: Company, attributes: ['id', 'name', 'picture'] }]
                    }]
            });
            if (!comments[0]) return next(ApiError.notFound("Комментарии не найдены!"));
            return res.json(comments);
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
            let { id, comment_id } = req.params;
            const { content } = req.body;
            if (!content) return next(ApiError.badRequest("Некорректное поле!"));

            const event = await Event.findOne({ where: { id } });
            if (!event) return next(ApiError.notFound("Событие не найдено!"));
            const comment_parent = await Comment.findOne({ where: { comment_id } });
            if (comment_id) {
                if (!comment_parent) return next(ApiError.notFound("Комментарий не найден!"));
            }
            let comment = await Comment.create({
                content,
                accountId: req.account.accountId,
                eventId: id,
                parent_comment_id: comment_id ? comment_id : null,
            });
            if (comment_id) {
                comment_parent.addReply(comment);
            }
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
