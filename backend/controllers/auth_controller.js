const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { User, Company, Account } = require('../models/models');

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
            <a href="http://127.0.0.1:${process.env.CL_PORT}/${path}/${jwt}" target="_blank">Нажмите для подтверждения</a>
        </div>
        `,
    });
}

const generateJwt = (accountId, id, type, time, key) => {
    return jwt.sign({ accountId, id, type },
        key,
        { expiresIn: time }
    );
}

class AuthController {
    async register_account(req, res, next) {
        try {
            const { password, password_conf, email } = req.body;
            if (!password || !password_conf || !email) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            if (password !== password_conf) {
                return next(ApiError.badRequest("Пароли не совпадают!"));
            }
            if (await Account.findOne({ where: { email } })) {
                return next(ApiError.badRequest("Аккаунт уже существует!"));
            }
            const hashPassword = await bcrypt.hash(password, 5);
            await Account.create({ username, password: hashPassword, email });
            return res.json({ message: "Регистрация успешна!" });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async register_user(req, res, next) {
        try {
            const { name, picture } = req.body;
            if (!name) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            await User.create({ name, picture });
            return res.json({ message: "Регистрация успешна!" });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async register_company(req, res, next) {
        try {
            const { name, picture, location, description } = req.body;
            if (!name || !location || !description) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            await Company.create({ name, picture, location, description });
            return res.json({ message: "Регистрация успешна!" });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async login(req, res, next) {
        try {
            const cookies = req.cookies;
            const { password, email } = req.body;
            if (!password || !email) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            let account = await Account.findOne({ where: { email } });
            if (!account) {
                return next(ApiError.notFound("Аккаунт не найден!"));
            }
            let type = 'user';
            let account_type = await User.findOne({ where: { accountId: account.id } });
            if (!account_type) {
                type = 'company';
                account_type = await Company.findOne({ where: { accountId: account.id } })
                if (!account_type) {
                    return next(ApiError.forbidden("Продолжите регистрацию!"));
                }
            }
            if (!bcrypt.compareSync(password, account.password)) {
                return next(ApiError.badRequest("Неверные данные!"));
            }
            const accessToken = generateJwt(account.id, account_type.id, type, '24h', process.env.SECRET_KEY_ACCESS);
            const newRefreshToken = generateJwt(account.id, account_type.id, type, '24h', process.env.SECRET_KEY_REFRESH); ///back time to 60s
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
            return res.json({ message: "Выход успешен!" });
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
            const account = await Account.findOne({ where: { email } });
            if (!account) {
                return next(ApiError.notFound("Аккаунт не найден!"));
            }
            send_mail('password-reset', email, generateJwt(account.id, '', '900s', process.env.SECRET_KEY_REFRESH));
            return res.json({ message: "Проверьте почту, ссылка действительна 15 минут!" });
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
                return next(ApiError.badRequest("Ссылка недействительна!"));
            }
            const hashPassword = await bcrypt.hash(new_password, 5);
            const account = await Account.update({ password: hashPassword }, { where: { id: info.id } });
            if (!account) {
                return next(ApiError.notFound("Аккаунта не существует!"));
            }
            return res.json({ message: "Пароль изменён!" });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async handleRefreshToken(req, res, next) {
        try {
            const token = req.cookies.token;
            if (!token) return next(ApiError.notAuth());
            const { id, type } = jwt.verify(token, process.env.SECRET_KEY_ACCESS);
            const account = await Account.findOne({ where: { id } });
            if (!account) {
                return next(ApiError.notAuth("Пользователь не найден!"));
            }
            const jwt_token = generateJwt(account.id, type, '60s', process.env.SECRET_KEY_REFRESH);
            return res.json(jwt_token);
        } catch (error) {
            console.log(error);
            return next(ApiError.notAuth());
        }
    }
}

module.exports = new AuthController();