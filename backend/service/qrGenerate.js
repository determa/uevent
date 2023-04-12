const QRCode = require('qrcode');

module.exports = () => {
    QRCode.toFile(__dirname + '/qr.png', process.env.CL_URL);
}