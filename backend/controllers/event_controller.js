const ApiError = require('../error/ApiError');
const { User, Company, Account, Event } = require('../models/models');


class EventController {
    async get_events(req, res, next) {
        try {
            let { id, date, pri } = req.query;
            const calendar = await Calendar.findOne({ where: { id } });
            if (!calendar) {
                return next(ApiError.notFound("Календарь не найден!"));
            }
            const events = await calendar.getEvents({
                where: {
                    date_start: {
                        [Op.between]: [
                            new Date(date_start), new Date(date_end)
                        ]
                    }
                }
            });
            return res.json(events);
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async get_create_link(req, res, next) {
        try {
            const { id } = req.params;
            const event = await Event.findOne({ where: { id } });
            if (!event) {
                return next(ApiError.notFound("Event not found!"));
            }
            return res.json({ link: `http://127.0.0.1:${process.env.CL_PORT}/share-event/${id}` });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal("Create link error!"));
        }
    }

    async create_event(req, res, next) {
        try {
            const { id } = req.params;
            const calendar = await Calendar.findOne({ where: { id } });
            let message = '';
            if (!calendar) {
                return next(ApiError.notFound("Calendar not found!"));
            }
            if (req.query.event_id) {
                const event_id = +req.query.event_id;
                const event = await Event.findOne({ where: { id: event_id } });
                if (!event) {
                    return next(ApiError.notFound("Событие не найдено!"));
                }
                if (!calendar.hasEvent(event)) {
                    await calendar.addEvent(event);
                    message = 'Add success!'
                } else {
                    message = 'Event was already added!'
                }
            } else {
                const { title, description, date_start, date_end, type } = req.body;
                if (!title || !description || !date_start || !date_end || !type) {
                    return next(ApiError.badRequest("Некорректное поле!"));
                }
                await calendar.createEvent({ title, description, date_start, date_end, type });
                message = 'Create success!'
            }
            return res.json({ message });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal("Create event error!"));
        }
    }

    async update_event(req, res, next) {
        try {
            const { id } = req.params;
            const { title, description, date_start, date_end, type } = req.body;
            const event = await Event.findOne({ where: { id } });
            if (!event) {
                return next(ApiError.notFound("Event not found!"));
            }
            if (!title || !description || !date_start || !date_end || !type) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            await event.update({ title, description, date_start, date_end, type });
            return res.json({ message: "Event updated!" });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal("Update event error!"));
        }
    }

    async delete_event(req, res, next) {
        try {
            const { id, event_id } = req.query;
            const calendar = await Calendar.findOne({ where: { id } });
            if (!calendar) {
                return next(ApiError.notFound("Calendar not found!"));
            }
            const event = await Event.findOne({ where: { id: event_id } });
            if (!event) {
                return next(ApiError.notFound("Event not found!"));
            }
            const events = await event.getCalendars();
            if (events.length < 2) {
                await event.destroy();
            } else {
                await calendar.removeEvent(event);
            }
            return res.json({ message: "Event deleted!" });
        } catch (error) {
            console.log(error)
            return next(ApiError.internal("Delete event error!"));
        }
    }
}

module.exports = new EventController();