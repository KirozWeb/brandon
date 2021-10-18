const express = require('express');
const conexion = require('../conexion');
const router = express.Router();
//const conex = require('../conexion');
usua = [];

conexion.query('SELECT * from perfil', function(error,results,fields) {
    if(error)
        throw error;

        results.forEach(element => {
        //console.log(element);
        usua.push(element);
        });

});



router.get('/',(req,res)=>{
    res.render("usuarios",{
        arrayMascotas: usua
   })
})

module.exports = router;

/*app.get('/',(req,res)=>{
    res.render("index",{titulo : "mi titulo dinamico "+usuarios[0].per_usuario});
})*/
/*
router.get('/',(req,res)=>{
    res.render("usuarios", {
        arrayMascotas:[
           {id: 'popeye', nombre:'rexona', descripcion:'rex des'},
           {id: 'papita', nombre:'pilones', descripcion:'pilon des'}
       ]
   })
})*/
