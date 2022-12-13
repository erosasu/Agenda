const contacto = require('../models/contacto');

module.exports={
    filtrarStatus1: (req, res)=>{
        contacto.find({nombre: 'Erika'})
        .then(data=>{
            res.send(data)
            console.log('filtrar para Erika')
        })
        .catch(err=>{
            res.status(400).send('algo salio mal, estas en filtrarStatus1')
        })
    },
    seebyid: (req, res)=>{
        const id = req.params.id;
        contacto.findOne({ _id:id})
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.status(400).send('algo salio mal, la ruta te mando a id')
        })
    },
    crear:(req, res)=>{
       
        console.log(req.body);
        const data = req.body;
        contacto.create(data).then(response =>{
            res.send(response);
        })
        
    },
    mostrastodos: async (req, res) => {
        const data = await contacto.find();
        res.send(data);
        console.log("funcion mostrar todos")
    },
  
    filtrar_nombre: (req, res)=>{
            const name = req.params.nombre
            console.log(req.params)
            contacto.find({nombre: name})
            .then(data=>{
                res.send(data)
                console.log('filtrar nombre especifico')
            })
            .catch(err=>{
                res.status(400).send('no pude filtrar para'+name)
            })
    },
    eliminarContacto: (req, res)=>{
        const id = req.params.id;
        contacto.findOneAndDelete({ _id:id})
        .then(()=>{
            res.send("registro eliminado exitosamente");
        })
        .catch(err=>{
            res.status(400).send('algo salio mal estas en eliminar')
        })
    },
    editRecord:(req, res) =>{
        console.log(req.params)
        const id = req.params.id;
        const key = req.params.key;
        const  valor = req.params.value
        contacto.findOne({ _id:id})
        .then(data=>{
            console.log(data)
            data[key] = valor
            res.send(data)
            console.log('informacion actualizada')
        })
        .catch(err=>{
            res.status(400).send('el id que ingresaste o el valor clave no existen en la base de datos')
        })
           
                  
    },
    filtrar_correo: (req, res)=>{
        const correo_e = req.params.correo
        console.log(req.params)
        contacto.find({correo: correo_e})
        .then(data=>{
            res.send(data)
            console.log('filtrar por correo electronico')
        })
        .catch(err=>{
            res.status(400).send('no pude filtrar para'+ correo_e)
        })
    }
 }