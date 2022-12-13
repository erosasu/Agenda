const express = require('express');
const  mongoose  = require('mongoose');

const apiRoutes = require('./src/api.js')

const app = express();
mongoose.set('strictQuery', false);
app.use(apiRoutes)
app.use(express.json());
const port = 3000;

app.get('', (req, res)=>{
    res.send('api works')
})
 uri ='mongodb+srv://ernierous:cuantum47@cluster0.3m7828i.mongodb.net/agenda?retryWrites=true&w=majority'

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





