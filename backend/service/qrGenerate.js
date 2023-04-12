const QRCode = require('qrcode');

export default () => {
    QRCode.toFile(__dirname + '/qr.png', process.env.CL_URL);
}