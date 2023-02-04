const nodemailer = require("nodemailer");

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

    async sendActivationMail(to, token) {
        const link = `http://${process.env.HOST}:${process.env.PORT}/api/auth/email-confirm/${token}`;

        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Please confirm your email",
            text: "",
            html: `
                    <div>
                        <h1>Activation link:</h1>
                        <a href="${link}" target="_blank">${link}</a>
                    </div>
                `,
        });
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
