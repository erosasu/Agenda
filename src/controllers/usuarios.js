const jwt = require('jsonwebtoken');
const modelo = require('../models/usuario');
require('dotenv').config()

const crypto = require('crypto')

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
        const hasedPassword = hashPassword(data.password);
        data.password = hasedPassword;
        modelo.create(data).then(response =>{
            delete response.password
            res.send(response);
        }).catch(err=>{
            console.log(err)
            res.sendStatus(400)
        })
}   }