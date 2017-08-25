const express = require('express');
const bodyParser = require('body-parser');
const config = require('./modules/config/config');
const sequelize = require('./modules/config/sequelizeMySQL');
const morgan = require('morgan');
const cfenv = require('cfenv');
const app = express();

// funciones de inicializacion
appInit();
appRutas();
appPuerto();

function appInit() {
    // conexion con la DB mysql
    sequelize.init();
    // palabra Secreta para armar el token de seguridad
    app.set('superSecret', config.secret);
    // muestra por consola las peticiones http
    app.use(morgan('dev'));
    // extrae informacion a travez de body
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    // acceso para peticiones cruzadas http
    app.use(activarCors);
    function activarCors(req, res, next) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        if ('OPTIONS' === req.method) {
            res.sendStatus(200);
        } else {
            next();
        }
    }
}

function appRutas() {
    const index = require('./modules/routes/index');
    const usuario = require('./modules/routes/usuario');
    app.use('/', index);
    app.use('/usuario', usuario);
}

function appPuerto() {
    // levanta el proyecto en un puerto disponible
    const appEnv = cfenv.getAppEnv();
    console.log('test');
    app.listen(appEnv.port, '0.0.0.0', function () {
        console.log("server starting on " + appEnv.url);
    });
}

