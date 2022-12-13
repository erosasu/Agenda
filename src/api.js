const express = require('express')
const router = require('express').Router()
var util = require('util')
const contactoControlles = require('./controllers/contactos.js')


router.get('/contactos/:id', contactoControlles.seebyid)//ver detalles mediante id
router.post('/contactos',express.json(), contactoControlles.crear)//crea un nuevo contacto
router.get('/contactos', contactoControlles.mostrastodos ) //muestra todos los contactos

router.get('/contactos/nombres/:nombre', contactoControlles.filtrar_nombre)//filtra por nombres
router.get('/contactos/correo/:correo', contactoControlles.filtrar_correo) //filtra por correos


router.get('/contactos/edit/:id/:key/:value', express.json(), contactoControlles.editRecord)//edita un ontacto existente
router.get('/contactos/delete/:id', contactoControlles.eliminarContacto )//elimina el contacto


module.exports = router;