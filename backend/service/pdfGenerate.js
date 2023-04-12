const qrGenerate = require('./qrGenerate');
const { Event } = require('../models/models');
const pdf = require("pdf-creator-node");
const ejs = require('ejs');
const moment = require('moment');

module.exports = async (accountId, eventId, transaction_id) => {
    const event = await Event.findOne({ where: { id: eventId } });
    let date = moment(event.date).format('dddd, MMMM Do YYYY');
    let time = `At ${moment(event.date).format('LT')}`;
    qrGenerate();

    const params = {
        name: event.title,
        date,
        time,
        location: event.location, //change to event.location.name
        transaction_id,
        // qr_code: `file://${__dirname}/qr.png`,
    };

    ejs.renderFile(__dirname + '/template.ejs', params, (err, html) => {
        if (err) {
            console.log(err);
        }

        const options = {
            format: "A4",
            orientation: "portrait",
            childProcessOptions: {
                env: {
                    OPENSSL_CONF: '/dev/null',
                },
            }
        };
        const fileName = __dirname + '/file.pdf';

        // const renderHtml = html.replace(/img src=\"\//g, 'img src="file://' + __dirname + "/");
        // console.log(renderHtml);

        pdf.create({ html: html, path: fileName, data: {}, type: "" }, options)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.error(error);
            });

    })
}