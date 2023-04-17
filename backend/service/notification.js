const cron = require("node-cron");
const moment = require("moment");
const { EventNotification, Account, Event } = require("../models/models");
const { Op } = require("sequelize");

module.exports = async function () {
    // 0 0 6 */1 * *
    try {
        cron.schedule("* * * * * *", () => {
            try {
                let date_now = moment().hour(0).minute(0).second(0);
                let date_end = moment().hour(23).minute(59).second(59);
                let events = await Event.findAll({
                    where: { date: { [Op.between]: [date_now, date_end] } },
                    include: [{ model: Account }],
                })
                console.log(events);
            } catch (error) {
                console.log(error);
            }
        });
    } catch (error) {
        console.log(error);
    }
};
