require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const router = require("./routes/index");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const errorHandler = require("./middleware/ErrorHandler");
const path = require("path");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
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
        app.listen(PORT, () => console.log(`http://${HOST}:${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
