const mongoose = require('mongoose')

const contactoSchema = new mongoose.Schema({
    nombre: {type: String},
    telefono: {type: Number, default: '0'},
    correo: {type: String},
    status: {type: Number, default: 1}

    
} )

module.exports = mongoose.model('contactos', contactoSchema)