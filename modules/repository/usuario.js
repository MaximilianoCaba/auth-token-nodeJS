const usuario = require("../domain/usuario");

function insertarUsuario(usuarioNuevo) {
    const usuarioACrear = usuario.build({
        username: usuarioNuevo.username,
        password: usuarioNuevo.password,
        email: usuarioNuevo.email,
    });

    return usuarioACrear.save();
}

function buscarUsuarioPorEmail(email) {
    return usuario.findOne({
        where: {
            email: email
        }
    });
}

module.exports = {
    insertarUsuario,
    buscarUsuarioPorEmail
};