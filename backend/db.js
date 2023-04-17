const { Sequelize } = require("sequelize");
require('sequelize-hierarchy-next')(Sequelize);

module.exports = new Sequelize(
    `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.HOST}:5432/uevent`,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: "postgres",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    }
);
