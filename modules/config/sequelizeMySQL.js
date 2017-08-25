const config = require("./config");
const Sequelize = require("sequelize");

// configuracion de sequelize
const sequelize = new Sequelize(
    config.database.mysql.database,
    config.database.mysql.user,
    config.database.mysql.password, {
        host: config.database.mysql.host,
        dialect: config.database.mysql.dialect,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });

// inicio de sequelize
function init() {
    return sequelize.authenticate().then(function() {
        console.log('Conexion establecida satisfactoriamente.');
    })
        .catch(function (err) {
            console.log('Imposible conectarse con la DB: ', err);
        });
}

module.exports = {
    init: init,
    sequelize: sequelize

};