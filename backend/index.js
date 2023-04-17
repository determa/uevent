require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const AdminJS = require('adminjs');
const Connect = require('connect-pg-simple');
const session = require('express-session');
// import * as AdminJSSequelize from '@adminjs/sequelize';
const AdminJSExpress = require('@adminjs/express');
const router = require("./routes/index");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const errorHandler = require("./middleware/ErrorHandler");
const path = require("path");
const cookieParser = require("cookie-parser");
const model_init = require("./models/model_init");
const notification = require("./service/notification");


const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

const DEFAULT_ADMIN = {
    email: 'admin@example.com',
    password: 'password',
}

const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN)
    }
    return null
}

const app = express();
app.use(cors({ origin: { origin: '*' }, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("asd");
});
app.use("/api", router);

//errors, last middleware
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        await model_init();
        notification();
        const admin = new AdminJS({});
        const ConnectSession = Connect(session)
        const sessionStore = new ConnectSession({
            conObject: {
                connectionString: `postgres://adminjs:adminjs@${process.env.HOST}:5435/adminjs`,
                ssl: process.env.NODE_ENV === 'production',
            },
            tableName: 'session',
            createTableIfMissing: true,
        })

        const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
            admin,
            {
                authenticate,
                cookieName: 'adminjs',
                cookiePassword: 'sessionsecret',
            },
            null,
            {
                store: sessionStore,
                resave: true,
                saveUninitialized: true,
                secret: 'sessionsecret',
                cookie: {
                    httpOnly: process.env.NODE_ENV === 'production',
                    secure: process.env.NODE_ENV === 'production',
                },
                name: 'adminjs',
            }
        )
        app.use(admin.options.rootPath, adminRouter)
        app.listen(PORT, () => console.log(`http://${HOST}:${PORT}`, `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`));
    } catch (e) {
        console.log(e);
    }
};

start();
