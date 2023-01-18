const jwt = require('jsonwebtoken');
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
    ver: (req, res)=>{
        const nombre = req.body.nombre
        console.log(req.body)
        contacto.findOne({status:1, nombre, userId: req.user._id})
        .then(data=>{
            
            res.send(data);
        })
        .catch(err=>{
            res.status(400).send('algo salio mal, la ruta te mando a id')
        })
    },
    crear:(req, res)=>{
            const data = req.body;
            console.log(req.file)
            data.photoUrl=req.file.filename
            data.userId= req.user._id
            contacto.create(data)
            .then(response =>{
            res.send(response);})
            .catch(err=>{
                res.status(401).send('ya existe un contacto con ese nombre en tu agenda')
            })
        },
    mostrastodos: async (req, res) => {
        
        contacto.find({status:1, userId: req.user._id })
            .then(data=>{
            res.send(data);
            })
            .catch(err=>{
                res.status(400).send('ERROR al entregar datos')
            })
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
        const nombre= req.body.nombre;
        contacto.findOne({nombre, useruserId: req.user._id})
        .then(data=>{
            data.status = 2
            data.save()
            res.send(`registro eliminado exitosamente ${data}`);
        })
        .catch(err=>{
            res.status(400).send('contacto no encontrado en tu agenda')
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
    },
    actualizar:(req, res)=>{
        const name= req.body.nombre
        console.log(name)
        contacto.findOneAndUpdate({nombre:name, userId: req.user._id}, req.body )
        .then(data=>{
            res.status(200).send('contacto encontrado y actualizado')
            console.log(data)

        })
        .catch(err=>{
            res.status(400).send('el id que ingresaste o el valor clave no existen en la base de datos')
        })

    },
    eliminar:(req, res)=>{
            const nombre= req.body.nombre;
            contacto.findOneAndDelete({nombre, userId: req.user._id })
            .then(()=>{
                res.send("registro eliminado exitosamente");
            })
            .catch(err=>{
                res.status(400).send('algo salio mal estas en eliminar')
            })
    }
 }