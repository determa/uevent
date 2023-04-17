const cron = require("node-cron");
const moment = require("moment");

module.exports = async function () {
    // 0 0 6 */1 * *
    try {
        cron.schedule("* * * * * *", () => {
            try {
                let date_now = moment().hour(0).minute(0);
                let date_end = moment().hour(23).minute(59);
                console.log(date_now, date_end);
                console.log("running a task every minute ");
            } catch (error) {
                console.log(error);
            }
        });
    } catch (error) {
        console.log(error);
    }
};
