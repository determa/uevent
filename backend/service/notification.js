const cron = require('node-cron');
const moment = require("moment");

module.exports = async function () {
    try {
        cron.schedule('* * * * * *', () => {
            try {
                // let date_now = moment().fo;
                // let date_end = moment(date_now).add(1, 'hours');
                // console.log(date_now, date_end)
                console.log('running a task every minute');

            } catch (error) {
                console.log(error)
            }
        });
    } catch (error) {
        console.log(error)
    }
}