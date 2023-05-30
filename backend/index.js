require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const AdminJS = require('adminjs');
const Connect = require('connect-pg-simple');
const session = require('express-session');
const AdminJSSequelize = require('@adminjs/sequelize');
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
    email: 'admin@admin.com',
    password: 'admin',
}

const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN)
    }
    return null
}
AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database,
})
const adminOptions = {
    // We pass Category to `resources`
    resources: [
        models.Account, models.User,
        models.Company,
        models.Event,
        models.Category,
        models.Theme,
        models.ThemeCategory,
        models.Comment,
        models.Ticket,
        models.EventNotification,
        models.CompanyNotification,
        models.AccountFavorite
    ]
}
const admin = new AdminJS(adminOptions);
const ConnectSession = Connect(session)
const sessionStore = new ConnectSession({
    conObject: {
        connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.HOST}:5432/${process.env.DB_NAME}`,
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

const app = express();
app.use(cors({ origin: { origin: '*' }, credentials: true }));
app.use(admin.options.rootPath, adminRouter)
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
        app.listen(PORT, () => console.log(`http://${HOST}:${PORT}`, `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`));
    } catch (e) {
        console.log(e);
    }
};

start();
//Server by Spoty-O