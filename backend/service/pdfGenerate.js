const qrGenerate = require("./qrGenerate");
const { Event } = require("../models/models");
const pdf = require("pdf-creator-node");
const ejs = require("ejs");
const fs = require('fs');
const moment = require("moment");
const uuid = require('uuid');

class PdfGenerate {

    create = async (eventId, transaction_id) => {
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
            const fileName = __dirname + `/${uuid.v4()}.pdf`;
            let html_ejs = undefined;

            ejs.renderFile(__dirname + "/template.ejs", params, (err, html) => {
                if (err) {
                    console.log(err);
                }

                html_ejs = html;

                const options = {
                    format: "A4",
                    orientation: "landscape",
                    childProcessOptions: {
                        env: {
                            OPENSSL_CONF: "/dev/null",
                        },
                    },
                };

                pdf.create({ html, path: fileName, data: {}, type: "" }, options)
                    .catch((error) => {
                        console.error(error);
                    });
            });

            return { fileName: fileName, html: html_ejs };
        } catch (error) {
            console.log(error);
        }
    }

    delete = async (pdf_name) => {
        try {
            fs.unlinkSync(pdf_name);
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = new PdfGenerate();