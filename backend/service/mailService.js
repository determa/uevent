const nodemailer = require("nodemailer");
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const { Account, CompanyNotification, User, Event } = require("../models/models");
const pdfGenerate = require("./pdfGenerate");

const send_mail = async (html, email, parametr, transporter) => {
    let attachments = [];
    if (parametr) {
        attachments.push({
            filename: "ticket.pdf",
            path: parametr,
        })
    }
    await transporter.sendMail({
        from: '"uevent" <nodejs@example.com>',
        to: email,
        subject: 'Message from Uevent',
        text: "",
        html: `
            <div>
                ${html}
            </div>
            `,
        attachments,
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
            const html = `<h1>Activation link:</h1><a href="http://127.0.0.1:${process.env.CL_PORT}/validation/${encodeURIComponent(hash)}" target="_blank">Нажмите для подтверждения</a>`;
            await send_mail(html, account.email, undefined, this.transporter);
            return res.json({ message: "Ссылка отправлена" });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    sendPDF = async (req, res, next) => {
        try {
            const { accountId } = req.dae;
            const { html, pdf } = req;
            const account = await Account.findOne({ where: { id: accountId } });
            if (!account) {
                return next(ApiError.notFound("Аккаунт не найден!"));
            }
            await send_mail("<h1>Спасибо за покупку, ваши билеты:</h1>" + html, account.email, pdf, this.transporter);
            await pdfGenerate.delete(pdf);
            return res.json({ message: "PDF файл отправлен." });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }

    sendNotificationByCompany = async (req, res, next) => {
        try {
            const { id: eventId } = req.event;
            const { id } = req.account;
            const accounts = await CompanyNotification.findAll({
                where: { companyId: id },
                include: [{
                    model: User,
                    include: [{
                        model: Account
                    }]
                }]
            })
            accounts.forEach((element) => {
                let html = `<h1>Ссылка на ивент:</h1><a href="http://127.0.0.1:${process.env.CL_PORT}/events/${eventId}" target="_blank">Нажмите для просмотра</a>`;
                await send_mail(html, element.user.account.email, undefined, this.transporter);
            })
            res.json({ message: 'Рассылка от компании успешна!' });
        } catch (error) {
            console.log(error);
            return next(ApiError.internal());
        }
    }
}

module.exports = new MailService();
