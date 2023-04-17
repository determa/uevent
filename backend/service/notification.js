const cron = require("node-cron");
const moment = require("moment");
const { EventNotification, Account, Event } = require("../models/models");
const { Op } = require("sequelize");

module.exports = async function () {
    // 0 0 6 */1 * *
    try {
        cron.schedule("* * * * * *", async () => {
            try {
                let date_now = moment().hour(0).minute(0).second(0);
                let date_end = moment().hour(23).minute(59).second(59);
                let events = await Event.findAll({
                    where: { date: { [Op.between]: [date_now, date_end] } },
                    include: [{
                        model: EventNotification,
                        include: [{
                            model: Account,
                        }]
                    }],
                })
                events.forEach((element) => {
                    if (element.event_notifications[0])
                        console.log(element.event_notifications);

                })
            } catch (error) {
                console.log(error);
            }
        });
    } catch (error) {
        console.log(error);
    }
};
