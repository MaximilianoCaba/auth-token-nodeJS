const express = require('express');
const router = express.Router();
const usuarioService = require('../service/usuario');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const security = require('../config/token');

//creacion de un nuevo usuario en DB
router.post('/nuevo', (req, res) => {

    const usuario = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    };
    usuarioService.insertarUsuario(usuario).then((usuario) => {
        var user = {
            id: usuario.id,
            email: usuario.email,
            usernamee: usuario.username

        };
        res.status(200).json(user);
    }).catch((error) => {
        res.status(400).json(error);
    })

});

//con un usuario y contraseña valido genera un token con los datos del usuario y la palabra secreta
router.post('/auth', (req, res) => {

    usuarioService.buscarUsuarioPorEmail(req.body.email).then((usuario) => {

        //comparacion de contraseñas cifradas, si es true genera el token, si no es una pw invalida
        const bolean = bcrypt.compareSync(req.body.password, usuario.password);
        if (bolean === true) {
            var token = jwt.sign(usuario.dataValues, req.app.get('superSecret'), {
                expiresIn: 60 * 60 * 24 // Expira en 24 horas
            });
            res.status(200).json({email: usuario.email, token: token})
        } else {
            res.status(404).json({error: "Contraseña incorrecta"})
        }
    }).catch(() => {
        res.status(404).json({error: "Usuario no econtrado"})

    })

});

// con validarToken permite que solo los que tienen un token valido puedan realizar esta accion
router.get('/saludame', security.validarToken, (req, res) => {
    res.status(200).json({succes: "HOLA! pudiste entrar con el token"})
});

module.exports = router;
