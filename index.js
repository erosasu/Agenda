const express = require('express');
const  mongoose  = require('mongoose');

require('dotenv').config();
const apiRoutes = require('./src/api.js')

const app = express();

const {engine} = require('express-handlebars')

app.engine('handlebars', engine())
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/src/views')



app.use('/fotos', express.static(__dirname + '/archivos'))
app.use('/assets', express.static(__dirname + '/assets'))



app.use(express.urlencoded());
app.use(express.json());

app.use(apiRoutes)

const port = process.env.PORT||3000;

app.get('', (req, res)=>{
    //res.sendFile(__dirname+'/src/views/index.html')
    res.render('index')
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





