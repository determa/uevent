const QRCode = require('qrcode');

module.exports = () => {
    try {
        return QRCode.toString(process.env.CL_URL);
    } catch (error) {
        console.log(error);
    }
}