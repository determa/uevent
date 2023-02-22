const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { User, Company } = require('../models/models');
const { Op } = require('sequelize');

// Mail host example
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ernie.luettgen@ethereal.email',
        pass: 'umeNQq3MzxCpQEgrdm'
    }
});

const send_mail = (path, email, jwt) => {
    transporter.sendMail({
        from: '"Node js" <nodejs@example.com>',
        to: email,
        subject: 'Message from Node js',
        text: "",
        html: `
        <div>
            <h1>Activation link:</h1>
            <a href="http://127.0.0.1:${process.env.CL_PORT}/${path}/${jwt}" target="_blank">click to confirm</a>
        </div>
        `,
    });
}

const generateJwt = (id, login, time, key) => {
    return jwt.sign({ id, login },
        key,
        { expiresIn: time }
    );
}

class AuthController {
    async register(req, res, next) {
        try {
            const { name, password, password_conf, email, type, location } = req.body;
            if (!name || !password || !password_conf || !email || (type == "company" && !location)) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            if (password !== password_conf) {
                return next(ApiError.badRequest("Подтвердите пароль!"));
            }
            if (type == "company") {
                if (await Company.findOne({ where: { [Op.or]: [{ name }, { email }] } })) {
                    return next(ApiError.badRequest("Компания уже существует!"));
                }
                const hashPassword = await bcrypt.hash(password, 5);
                await Company.create({ username, password: hashPassword, email });
            } else {
                if (await User.findOne({ where: { [Op.or]: [{ name }, { email }] } })) {
                    return next(ApiError.badRequest("Пользователь уже существует!"));
                }
                const hashPassword = await bcrypt.hash(password, 5);
                await User.create({ username, password: hashPassword, email });
            }
            return res.json({ message: "Регистрация успешна!" });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async login(req, res, next) {
        try {
            const cookies = req.cookies;
            const { password, email, type } = req.body;
            if (!password || !email) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            let user;
            if (type == "company") {
                user = await Company.findOne({ where: { email } });
            } else {
                user = await User.findOne({ where: { email } });
            }
            if (!user) {
                return next(ApiError.notFound("Аккаунт не найден!"));
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return next(ApiError.badRequest("Неверные данные!"));
            }
            const accessToken = generateJwt(user.id, user.name, '24h', process.env.SECRET_KEY_ACCESS);
            const newRefreshToken = generateJwt(user.id, user.name, '24h', process.env.SECRET_KEY_REFRESH); ///back time to 60s
            if (cookies?.token) {
                res.clearCookie('token', {
                    secure: true,
                    httpOnly: true,
                    sameSite: 'None'
                });
            }
            res.cookie('token', accessToken, {
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'None'
            });
            res.json(newRefreshToken);
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async logout(req, res, next) {
        try {
            const cookies = req.cookies;
            if (cookies?.token) {
                res.clearCookie('token', {
                    secure: true,
                    httpOnly: true,
                    sameSite: 'None'
                });
            }
            return res.json({ message: "Logout complete!" });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async password_reset(req, res, next) {
        try {
            const { email } = req.body;
            if (!email) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return next(ApiError.badRequest());
            }
            send_mail('password-reset', email, generateJwt(user.id, '', '900s', process.env.SECRET_KEY_REFRESH));
            return res.json({ message: "Check email, link valid of 15 minutes!" });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async password_confirm(req, res, next) {
        try {
            const { new_password, password_conf } = req.body;
            if (!new_password || !password_conf) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            if (new_password !== password_conf) {
                return next(ApiError.badRequest("Подтвердите пароль!"));
            }
            const { token } = req.params;
            let info;
            try {
                info = jwt.verify(token, process.env.SECRET_KEY_REFRESH);
            } catch (e) {
                return next(ApiError.badRequest("link expired"));
            }
            const hashPassword = await bcrypt.hash(new_password, 5);
            const user = await User.update({ password: hashPassword }, { where: { id: info.id } });
            if (!user) {
                return next(ApiError.notFound("User does not exists"));
            }
            return res.json({ message: "Password changed!" });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async handleRefreshToken(req, res, next) {
        try {
            const token = req.cookies.token;
            if (!token) return next(ApiError.notAuth());
            const { id, login } = jwt.verify(token, process.env.SECRET_KEY_ACCESS);
            const user = await User.findOne({ where: { login, id } });
            if (!user) {
                return next(ApiError.notAuth("Пользователь не найден!"));
            }
            const jwt_token = generateJwt(user.id, user.login, '60s', process.env.SECRET_KEY_REFRESH);
            return res.json(jwt_token);
        } catch (error) {
            console.log(error);
            return next(ApiError.notAuth());
        }
    }
}

module.exports = new AuthController();