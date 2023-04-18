const QRCode = require('qrcode');
const bcrypt = require('bcrypt');

module.exports = async (id) => {
    try {
        return await QRCode.toDataURL(process.env.CL_URL + '/ticket/' + await bcrypt.hash(String(id), 5));
    } catch (error) {
        console.log(error);
    }
}