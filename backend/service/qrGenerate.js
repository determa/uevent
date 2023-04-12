const QRCode = require('qrcode');

module.exports = () => {
    return QRCode.toString(__dirname + '/qr.png', process.env.CL_URL);
}