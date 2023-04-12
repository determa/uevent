const QRCode = require('qrcode');

module.exports = async () => {
    try {
        QRCode.toDataURL('I am a pony!', function (err, url) {
            console.log(url)
        })
    } catch (error) {
        console.log(error);
    }
}