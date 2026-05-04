const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
    //colocar variaveis de ambiente
    host: process.env.HOST,
    username:process.env.USERDB,
    password:process.env.passworddb,
    database:process.env.DBNAME,
    port:3306,
    dialect:process.env.DEALECT
});

//conn.promise()
module.exports = sequelize;  