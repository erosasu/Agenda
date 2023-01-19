const jwt = require('jsonwebtoken');
const modelo = require('../models/usuario');
require('dotenv').config()

const crypto = require('crypto');
const { domainToASCII } = require('url');

function hashPassword(pwd){
    return crypto.scryptSync(pwd, 'salt', 24)
}


module.exports={
    login:(req, res)=>{
       const data = req.body

       const credenciales={
        correo:data.correo,
        password: hashPassword(data.password)
       }

       if(credenciales.correo && credenciales.password){
       modelo.findOne(credenciales)
       .then(response =>{
        if(response){
            console.log(response);
            const {_id, nombre, correo} = response;
            const token = jwt.sign({_id, nombre}, process.env.SECRET);
            res.send({token, nombre, correo})
        }else{
            res.sendStatus(401)
        }
       })
       .catch(err=>{
            res.sendStatus(400);
       }) }
       else{
        res.sendStatus(400)
       }
    },

    registro:(req, res)=>{
        const data = req.body;
        console.log('datos: ', req.body)
        if(!data.password||!data.correo||!data.nombre){
            res.status(400).send('Faltaron datos')
            return;
        }

        const hasedPassword = hashPassword(data.password);
        data.password = hasedPassword;
        modelo.create(data).then(response =>{
            const {_id, nombre, correo } = response
            res.render('confirmacion', {nombre, correo});
        }).catch(err=>{
            console.log(err)
            res.sendStatus(400)
        })
    },
    formRegistro:(req, res)=>{
        res.render('registro');
    }   

}