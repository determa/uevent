const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Company, Account } = require('../models/models');
const imageUpload = require('../service/imageUpload');

const generateJwt = (accountId, id, type, confirmed, time, key) => {
    return jwt.sign({ accountId, id, type, confirmed },
        key,
        { expiresIn: time }
    );
}

const generate_tokens = (accountId, id, type, confirmed, role, req, res) => {
    const cookies = req.cookies;
    const accessToken = generateJwt(accountId, id, type, confirmed, role, '30s', process.env.SECRET_KEY_ACCESS);
    const newRefreshToken = generateJwt(accountId, id, type, confirmed, role, '24h', process.env.SECRET_KEY_REFRESH); ///back time to 60s
    if (cookies?.token) {
        res.clearCookie('token', cookieOptions);
    }
    res.cookie('token', newRefreshToken, cookieOptions);
    return { jwt_token: accessToken };
}

const cookieOptions = {
    secure: true, //need true
    httpOnly: true,
    sameSite: 'None',
    maxAge: 24 * 60 * 60 * 1000,
};

class AuthController {
    async register_account(req, res, next) {
        try {
            console.log("WORKEDFEROIFJERI")
            const { password, password_conf, email } = req.body;
            if (!password || !password_conf || !email) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            if (password !== password_conf) {
                return next(ApiError.badRequest("Пароли не совпадают!"));
            }
            if (!/\S+@\S+\.\S+/.test(email)) {
                return next(ApiError.badRequest('Некорректный email!'));
            }
            if (await Account.findOne({ where: { email } })) {
                return next(ApiError.badRequest("Аккаунт уже существует!"));
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const account = await Account.create({ password: hashPassword, email });
            return res.json(generate_tokens(account.id, 0, account.type, account.confirmed, null, req, res));
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async register_user(req, res, next) {
        try {
            const { name } = req.body;
            let picture = 'default.jpg';
            if (!name) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            if (req.files?.avatar) {
                picture = imageUpload(req.files.avatar)
            }
            const user = await User.create({ name, picture, accountId: req.account.accountId });
            await Account.update({ type: "USER" }, { where: { id: req.account.accountId } });
            return res.json(generate_tokens(req.account.accountId, user.id, 'USER', req.account.confirmed, null, req, res));
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async register_company(req, res, next) {
        try {
            const { name, location, description } = req.body;
            let picture = 'default.jpg';
            if (!name || !location || !description) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            if (req.files?.avatar) {
                picture = imageUpload(req.files.avatar)
            }
            const company = await Company.create({ name, picture, location, description, accountId: req.account.accountId });
            await Account.update({ type: "COMPANY" }, { where: { id: req.account.accountId } });
            return res.json(generate_tokens(req.account.accountId, company.id, 'COMPANY', req.account.confirmed, null, req, res));
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async login(req, res, next) {
        try {
            const { password, email } = req.body;
            if (!password || !email) {
                return next(ApiError.badRequest("Некорректное поле!"));
            }
            let account = await Account.findOne({ where: { email } });
            if (!account) {
                return next(ApiError.notFound("Аккаунт не найден!"));
            }
            let account_type = await User.findOne({ where: { accountId: account.id } });
            let role = account_type.role;
            if (!account_type) {
                role = null;
                account_type = await Company.findOne({ where: { accountId: account.id } })
            }
            if (!bcrypt.compareSync(password, account.password)) {
                return next(ApiError.badRequest("Неверные данные!"));
            }
            return res.json(generate_tokens(account.id, account_type?.id || 0, account.type,  account.confirmed, role, req, res));
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async logout(req, res, next) {
        try {
            const cookies = req.cookies;
            if (cookies?.token) {
                res.clearCookie('token', cookieOptions);
            }
            return res.json({ message: "Выход успешен!" });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async email_confirm(req, res, next) {
        try {
            const crypted_id = req.params.id;
            if (!bcrypt.compareSync(String(req.account.accountId), decodeURIComponent(crypted_id))) {
                return next(ApiError.badRequest("Ссылка чужого пользователя!"));
            }
            await Account.update({ confirmed: true }, { where: { id: req.account.accountId } })
            return res.json({ message: "Confirm complete!" }); //wefwfwef
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
            const { accountId, id } = jwt.verify(token, process.env.SECRET_KEY_REFRESH);
            const account = await Account.findOne({ where: { id: accountId } });
            if (!account) {
                return next(ApiError.notAuth("Пользователь не найден!"));
            }
            return res.json(generate_tokens(accountId, id, account.type, account.confirmed, account.role, req, res));
        } catch (error) {
            console.log(error);
            return next(ApiError.notAuth());
        }
    }
}

module.exports = new AuthController();