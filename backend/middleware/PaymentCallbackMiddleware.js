const ApiError = require('../error/ApiError');

module.exports = function (req, res, next) {
    try {
        let answer = Buffer.from(req.body.data.toString('utf8'), 'base64').toString('ascii');
        req.answer = JSON.parse(answer);
        console.log(answer)
        if (req.answer.status != "success") {
            return next(ApiError.badRequest("Ошибка при оплате!"));
        }
        return next();
    } catch (error) {
        console.log(error)
        return next(ApiError.badRequest(e.message));
    }
}