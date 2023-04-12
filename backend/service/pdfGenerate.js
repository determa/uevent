const qrGenerate = require("./qrGenerate");
const { Event } = require("../models/models");
const pdf = require("pdf-creator-node");
const ejs = require("ejs");
const moment = require("moment");

module.exports = async (accountId, eventId, transaction_id) => {
    try {
        const event = await Event.findOne({ where: { id: eventId } });
        let date = moment(event.date).format("dddd, MMMM Do YYYY");
        let time = `At ${moment(event.date).format("LT")}`;

        const params = {
            name: event.title,
            date,
            time,
            location: event.location, //change to event.location.name
            transaction_id,
            qr_code: await qrGenerate(),
        };

        ejs.renderFile(__dirname + "/template.ejs", params, (err, html) => {
            if (err) {
                console.log(err);
            }

            const options = {
                format: "A5",
                orientation: "landscape",
                // childProcessOptions: {
                //     env: {
                //         OPENSSL_CONF: "/dev/null",
                //     },
                // },
            };
            const fileName = __dirname + "/file.pdf";

            pdf.create({ html: html, path: fileName, data: {}, type: "" }, options)
                .catch((error) => {
                    console.error(error);
                });
        });
    } catch (error) {
        console.log(error);
    }
};
