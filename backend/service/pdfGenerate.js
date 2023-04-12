const qrGenerate = require('./qrGenerate');
const { Event } = require('../models/models');
const htmlPdf = require('html-pdf');
const ejs = require('ejs');
const moment = require('moment');

module.exports = async (accountId, eventId, transaction_id) => {
    const event = Event.findOne({ where: { id: eventId } });
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

        const options = { format: 'A4' };
        const fileName = __dirname + '/file.pdf';

        const renderHtml = html.replace(/img src=\"\//g, 'img src="file://' + __dirname + "/");

        htmlPdf.create(renderHtml, options).toFile(fileName, (err) => {

            if (err) {
                console.log('Ошибка конвертации', err)
            }

        });

    })
}