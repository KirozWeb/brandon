const express = require('express')
const routes = express.Router()
const conexion = require('../conexion');
usua = [];
//cuando el usuario digita la ruta database/consultas lo envia al metodo get
//aqui abajo linea 6
routes.get('/consultas', (req, res) => {

    conexion.query('SELECT * from perfil', function(error,results,fields) {
        if(error)
            throw error;

            results.forEach(element => {
            //console.log("esto es consultas"+element);
            usua.push(element);
            });

    });
    res.render("usuarios",{
        arrayMascotas: usua
   })
   usua = []
})
/*
routes.get('/consultas',(req,res)=>{
    res.render("usuarios",{
        arrayMascotas: usua
   })
})*/
routes.get('/registrar',(req,res)=>{
    //muestre en el navegador /vista/formulario.html por senFile linea 20
    //res.sendFile('registrarse.ejs',{root:__dirname})
    res.render("registrarse",{
        arrayMascotas: usua
    })
})

routes.post('/guardar', (req, res) => {
    //console.log(req.body);
    conexion.query('INSERT INTO Registro_db SET ?',req.body,(error,rows)=>{
        if (error){
            return res.send(error);
        } else {
            var data = "registro guardado con exito"
            //res.send('Registro guardado con éxito');
            //res.send('<script>window.location.href="/database/consultas";</script>',{data:data});
            res.render("usuarios",{
                arrayMascotas: usua})

        }
    })

})

routes.get('/login',(req,res)=>{
    //muestre en el navegador /vista/formulario.html por senFile linea 20
    //res.sendFile('registrarse.ejs',{root:__dirname})
    res.render("acceso")
})

//conn.query('SELECT FROM registro WHERE NombreUsuario = ? AND ContrasenaUsuario = ?'

routes.post('/ingresar',(req, res) => {
    usuario = []
    console.log(req.body.NombreUsuario)
    console.log(req.body.Contrasena)
    console.log(req.body)
    conexion.query('SELECT * FROM Registro_db WHERE NombreUsuario = ? AND ContrasenaUsuario = ?',[req.body.NombreUsuario,req.body.ContrasenaUsuario],function(error,results,fields){
        if (error){
            return res.send(error);
        } else {

            //res.send('<script>window.location.href="/database/consultas";</script>');
            results.forEach(element => {
                //console.log("esto es consultas"+element);

                usuario.push(element);
                });

            res.render("validado",{
                arrayMascotas: usuario})

        }
    })
})
//cuando el usuario digite database/actualizar lo envia al metodo get
//aqui abajo linea 43
routes.get('/update',(req,res)=>{
    //muestra en el navegador /vista/actualizar.html por metodo sendFile linea 45
    res.sendFile('/vista/actualizar.html',{root:__dirname})
})
routes.post('/actualizar',(req, res) => {
    //console.log(req.body.idRegistro)
    //console.log(req.body)
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('UPDATE registro SET ? WHERE idRegistro = ?', [req.body, req.body.idRegistro], (err, rows) => {
            if (err){
                return res.send(err)
            }
            else{
            res.send('registro acualizado')

            }
        })
    })
})

routes.get('/delete',(req,res)=>{
    //muestra en el navegador /vista/actualizar.html por metodo sendFile linea 45
    res.sendFile('/vista/eliminar.html',{root:__dirname})
})
routes.post('/eliminar',(req, res) => {
    //console.log(req.body.idRegistro)
    //console.log(req.body)
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('DELETE FROM registro WHERE idRegistro = ?', [req.body.idRegistro], (err, rows) => {
            if (err){
                return res.send(err)
            }
            else{
            res.send('registro eliminado')
            }
        })
    })
})

module.exports = routes