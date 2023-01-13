const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    correo: {type: String, required: true},
    password: {type: String, required: true},
    status: {type: Number, default: 1}

    
} )

module.exports = mongoose.model('usuarios', usuarioSchema)