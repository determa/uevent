const cron = require('node-cron');

module.exports = async function () {
    cron.schedule('* * * * * *', () => {
        console.log('running a task every minute');
    });
}