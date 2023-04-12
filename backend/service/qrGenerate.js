const QRCode = require('qrcode');

module.exports = async () => {
    try {
        return await QRCode.toDataURL("process.env.CL_URL");
    } catch (error) {
        console.log(error);
    }
}