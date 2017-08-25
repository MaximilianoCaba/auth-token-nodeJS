const Sequelize = require("sequelize");
const sequelizeMySQL = require("../config/sequelizeMySQL").sequelize;

const usuario = sequelizeMySQL.define('usuario1', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    username: Sequelize.STRING(50),
    password: Sequelize.STRING(500),
    email: Sequelize.STRING(255),
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = usuario;