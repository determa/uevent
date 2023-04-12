const qrGenerate = require("./qrGenerate");
const { Event } = require("../models/models");
const pdf = require("pdf-creator-node");
const ejs = require("ejs");
const moment = require("moment");
const uuid = require('uuid');

module.exports = async (accountId, eventId, transaction_id) => {
    try {
        const event = await Event.findOne({ where: { id: eventId } });
        const date = moment(event.date).format("dddd, MMMM Do YYYY");
        const time = `At ${moment(event.date).format("LT")}`;
        const location = JSON.parse(event.location);

        const params = {
            name: event.title,
            date,
            time,
            location: location.name, //change to event.location.name
            transaction_id,
            qr_code: await qrGenerate(),
        };

        ejs.renderFile(__dirname + "/template.ejs", params, (err, html) => {
            if (err) {
                console.log(err);
            }

            const options = {
                format: "A4",
                orientation: "landscape",
                childProcessOptions: {
                    env: {
                        OPENSSL_CONF: "/dev/null",
                    },
                },
            };
            const fileName = __dirname + `/${uuid.v4()}.pdf`;

            pdf.create({ html, path: fileName, data: {}, type: "" }, options)
                .catch((error) => {
                    console.error(error);
                });
        });
    } catch (error) {
        console.log(error);
    }
};
