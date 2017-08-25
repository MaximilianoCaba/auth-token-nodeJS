const usuarioRepository = require('../repository/usuario');
const bcrypt = require('bcrypt-nodejs');

insertarUsuario = (usuario) => {
    usuario.password = bcrypt.hashSync(usuario.password);
    return usuarioRepository.insertarUsuario(usuario);
};

buscarUsuarioPorEmail = (email) => {
    return usuarioRepository.buscarUsuarioPorEmail(email);
};

module.exports = {
    insertarUsuario,
    buscarUsuarioPorEmail
};