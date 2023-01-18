const express = require('express')
const router = require('express').Router()
const auth = require('./middlewares/auth')
const multer = require('multer')



const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, 'archivos')
    },
    filename: (req, file, callback)=>{
        const extension = file.originalname.split('.').pop();
        let nombre = `${req.user._id}-${new Date().getTime()}.${ extension}`;
        callback(null, nombre)
    }
});

function filter(req, file, callback){
    const isValid = file.mimetype == 'image/jpeg'
    callback(null, isValid)
}


const upload = multer({storage, fileFilter: filter })

const contactoControlles = require('./controllers/contactos.js')
const usuarioControlles = require('./controllers/usuarios.js');
const { filtrar_correo } = require('./controllers/contactos.js');



router.get('/vercontacto',auth, express.json(), contactoControlles.ver)//ver detalles mediante id
router.post('/contactos',auth, express.json(), upload.single('foto'), contactoControlles.crear)//crea un nuevo contacto
router.get('/contactos', auth, contactoControlles.mostrastodos ) //muestra todos los contactos

router.get('/contactos/nombres/:nombre', contactoControlles.filtrar_nombre)//filtra por nombres
router.get('/contactos/correo/:correo', contactoControlles.filtrar_correo) //filtra por correos

router.put('/actualizar',auth, express.json(), contactoControlles.actualizar)
router.get('/contactos/edit/:id/:key/:value', express.json(), contactoControlles.editRecord)//edita un ontacto existente
router.delete('/delete',auth, express.json(), contactoControlles.eliminarContacto )//elimina el contacto

//usuario
router.post('/registro',express.json(), usuarioControlles.registro)
router.post('/login',express.json(), usuarioControlles.login)





module.exports = router;