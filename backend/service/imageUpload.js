const path = require('path');
const uuid = require('uuid');

module.exports = image_upload = (file) => {
    let fileName = uuid.v4() + '.jpg';
    file.mv(path.resolve(__dirname, '..', 'static', fileName));
    return fileName;
}