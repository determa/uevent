const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.cookies.token;
        console.log('work')
        req.isAuth = false;
        if (!token || !req.headers.authorization) {
            return next();
        }
        const access_token = req.headers.authorization.split(" ")[1];
        if (!access_token) {
            return next();
        }
        req.isAuth = true;
        const decoded = jwt.verify(access_token, process.env.SECRET_KEY_ACCESS);
        req.account = decoded;
        next();
    } catch (error) {
        console.log(error)
        return next(ApiError.notAuth());
    }
}