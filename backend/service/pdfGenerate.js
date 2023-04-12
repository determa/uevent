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
        qr_code: 'qr.png',
    };

    ejs.renderFile(__dirname + '/template.ejs', params, (err, html) => {
        if (err) {
            console.log(err);
        }

        const options = {
            format: "A5",
            orientation: "portrait",
            border: "5mm",
            childProcessOptions: {
                env: {
                    OPENSSL_CONF: '/dev/null',
                },
            }
        };
        const fileName = __dirname + '/file.pdf';

        const renderHtml = html.replace(/img src=\"\//g, 'img src="file://' + __dirname + "/");

        pdf.create({ html: renderHtml, path: fileName, data: {}, type: "" }, options)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.error(error);
            });

    })
}