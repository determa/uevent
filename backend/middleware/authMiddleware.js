const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.cookies.token;
        if (!token || !req.headers.authorization) return next(ApiError.notAuth());
        const refresh_token = req.headers.authorization.split(" ")[1];
        if (!refresh_token) {
            return next(ApiError.notAuth());
        }
        const decoded = jwt.verify(refresh_token, process.env.SECRET_KEY_REFRESH);
        req.account = decoded;
        next();
    } catch (error) {
        console.log(error)
        return next(ApiError.notAuth());
    }
}