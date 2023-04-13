const ApiError = require('../error/ApiError');

module.exports = function (req, res, next) {
    try {
        let answer = Buffer.from(req.body.data.toString('utf8'), 'base64').toString('utf8');
        console.log(answer);
        req.answer = JSON.parse(answer);
        if (req.answer.status != "success") {
            return next(ApiError.badRequest("Ошибка при оплате!"));
        }
        let dae = Buffer.from(req.answer.dae, 'base64').toString('utf8');
        req.dae = JSON.parse(dae);
        return next();
    } catch (error) {
        console.log(error)
        return next(ApiError.badRequest(e.message));
    }
}