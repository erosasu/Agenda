const express = require('express');
const  mongoose  = require('mongoose');

require('dotenv').config();
const apiRoutes = require('./src/api.js')

const app = express();

app.use(apiRoutes)
app.use(express.json());
const port = process.env.PORT||3000;

app.get('', (req, res)=>{
    res.send('api works')
})

const uri = process.env.MONGODB

 mongoose.connect(uri, async (err,)=>{
    //error-first callback
    if(err){
        console.log('No se pudo conectar a mi base de datos')
    }else{
        console.log('se conecto a base de datos '+port)
        app.listen(port, ()=>{
            console.log('app is runnin in port ' +port)
        });
    }
 });





