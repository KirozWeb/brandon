const express = require('express')
const ruta = express.Router()

ruta.get('/registro',(req,res)=>{
    res.send('Resultado')
})
ruta.get('/datos',(req,res)=> {
    res.sendFile('/formulario.html',{root:__dirname})
})