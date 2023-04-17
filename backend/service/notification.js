const cron = require("node-cron");
const moment = require("moment");
const { EventNotification, Account, Event } = require("../models/models");
const { Op } = require("sequelize");
const { sendNotificationByEvent } = require("./mailService");

module.exports = async function () {
    // 0 0 6 */1 * *
    // */10 * * * * *
    try {
        cron.schedule("0 0 6 */1 * *", async () => {
            try {
                let date_now = moment().hour(0).minute(0).second(0);
                let date_end = moment().hour(23).minute(59).second(59);
                let accounts = await Account.findAll({
                    include: [{
                        model: EventNotification,
                        include: [{
                            model: Event,
                            where: { date: { [Op.between]: [date_now, date_end] } },
                        }]
                    }],
                })
                accounts.forEach((account_element) => {
                    let html = '';
                    const { event_notifications, email } = account_element;
                    if (event_notifications[0]) {
                        event_notifications.forEach((notif_element) => {
                            const { event } = notif_element;
                            html += `<h1>Ссылка на ивент:</h1><a href="http://127.0.0.1:${process.env.CL_PORT}/events/${event.id}" target="_blank">Нажмите для просмотра</a>`
                        });
                        sendNotificationByEvent('<h1>Все сегодняшние ивенты:</h1>' + html, email);
                    }

                })
            } catch (error) {
                console.log(error);
            }
        });
    } catch (error) {
        console.log(error);
    }
};
