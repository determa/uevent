const QRCode = require('qrcode');

module.exports = async () => {
    try {
        return QRCode.toString(process.env.CL_URL);
    } catch (error) {
        console.log(error);
    }
}