const ApiError = require("../error/ApiError");
const { User, Event, EventNotification } = require("../models/models");

class EventNotifController {
    async subscribe(req, res, next) {
        const { id } = req.account;
        // EventNotification

    }

    async unbscribe(req, res, next) {

    }
}

module.exports = new EventNotifController();