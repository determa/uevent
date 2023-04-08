const nodemailer = require("nodemailer");
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const { Account } = require("../models/models");

const send_mail = async (path, email, parametr, transporter) => {
    await transporter.sendMail({
        from: '"Node js" <nodejs@example.com>',
        to: email,
        subject: 'Message from Node js',
        text: "",
        html: `
            <div>
                <h1>Activation link:</h1>
                <a href="http://127.0.0.1:${process.env.CL_PORT}/${path}/${parametr}" target="_blank">Нажмите для подтверждения</a>
            </div>
            `,
    });
}

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    sendActivationMail = async (req, res, next) => {
        try {
            const account = await Account.findOne({ where: { id: req.account.accountId } });
            if (!account) {
                return next(ApiError.notFound("Аккаунт не найден!"));
            }
            const hash = await bcrypt.hash(String(req.account.accountId), 5);
            await send_mail('validation', account.email, encodeURIComponent(hash), this.transporter);
            return res.json({ message: "Ссылка отправлена" });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    async sendResetPass(to, token) {
        const link = `http://${process.env.HOST}:${process.env.PORT}/api/auth/password-reset/${token}`;
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Reset password",
            text: "",
            html: `
                    <div>
                        <h1>Reset password link:</h1>
                        <a href="${link}" target="_blank">${link}</a>
                    </div>
                `,
        });
    }
}

module.exports = new MailService();
