//archivo de configuracion inicial

const config = {
    database: {
        mysql: {
            host: "localhost",
            port: "3306",
            database: "test",
            user: "root",
            password: "",
            dialect: 'mysql'
        }
    },
    secret: 'estaesmisuperpalabrasecretamiau'
};

module.exports = config;