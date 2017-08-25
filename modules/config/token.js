const jwt = require('jsonwebtoken');


// validacion de token, si es un token correcto permite a la peticion realizar su accion a travez de next
module.exports = {

    validarToken: (req, res, next) => {

        var token = req.headers['x-access-token'];

        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, req.app.get('superSecret'), function (err, decoded) {
                if (err) {
                    return res.json({success: false, message: 'Failed to authenticate token.'});
                } else {

                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            res.status(400).json({error: "error"})
        }
    }


};