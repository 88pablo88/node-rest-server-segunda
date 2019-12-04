const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const _ = require('underscore'); //underscore es una libreria js
const Usuario = require('../modelo/usuario')




app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite)


    Usuario.find({ estado: true }, 'nombre email role estado google img') //como segundo parametro se le puede pasar al metodo find una cadena completa con los campos que quiero
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => { //el primer parametro {} deberia llevar en su interior la misma condicion que el metodo find()

                res.json({
                    ok: true,
                    usuarios,
                    cantidadRegistros: conteo
                })

            })


        })


})



app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role

    });


    /*GRABO EN LA BASE DE DATOS*/

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    })


})

app.put('/usuario/:id', function(req, res) {

    let ids = req.params.id

    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']); //funcion de la libreria underscore



    Usuario.findByIdAndUpdate(ids, body, { new: true, runValidators: true }, (err, usuarioDB) => { //findByIdAndUpdate es una funcion propia de moongose, el objeto new:true es una opcion para retorne el body actualizado, runvalidator:true hace que se corran todas la validaciones del schema

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({

            ok: true,
            usuario: usuarioDB

        })


    })


})


app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;


    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        };

        if (usuarioDB === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario no existe'
                }
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB,
        })



    })


})


module.exports = app;


// bloque de codigo para borra fisicamente un usuario de la base de datos*/

/*app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        };

        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario no existe'
                }
            })
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })



    })


})*/