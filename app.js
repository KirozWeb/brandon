const express = require('express');
//const conex = require('./conexion.js');
const bodyParser = require('body-parser')
var mysql = require('mysql');
const app = express();

require('dotenv').config()
const routerbd = require("./router/Consultas")
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
/*app.set('port',process.env.PORT || 9190)
app.get('/',(req,res)=>{
    res.send('Prueba')
})*/
/*
var conexion = mysql.createConnection({
    host:'localhost',
    database:'usuarios_db',
    user:'fernando',
    password:'quiroz'
});
conexion.connect(function(error) {
    if(error){
        throw error;
    }else{
        console.log('CONEXION EXITOSA');
    }
});
*/
app.set('view engine','ejs')
app.set('views',__dirname + '/views');
app.use(express.static(__dirname + "/public"))
console.log(__dirname)

// Rutas Web
app.use('/', require('./router/Rutasweb'));
app.use('/mascotas', require('./router/Mascotas'));
app.use('/usuario', require('./router/Usuarios'));
//app.use('/registrar', require('./router/Registrarse'));
app.use('/database',routerbd)
//app.use('/guardar', require('./router/Registrarse'));



app.use((req,res,next)=>{
    res.status(404).render("404",{
        titulo: "404",
        descripcion: "Titulo del sitio web"
    })
})




app.listen(port,() =>{
    console.log('servidor a su servicio en el puerto', port)
})



/*
app.get('/',(req,res)=>{
    res.send('Mi respuesta desde express')
})

app.get('/servicios',(req,res)=>{
    res.send('Estás en la pagina de servicios')
})

app.use((req,res,next)=>{
    res.status(404).sendFile(__dirname + "/public/404.html")
})
*/
// motor de plantillas
/*
app.set('view engine','ejs');
app.set('views',__dirname + '/views');

app.use(express.static(__dirname + "/public"));

app.get('/',(req,res)=>{
    res.render("index",{titulo : "mi titulo dinamico"});
})

app.use('/',require('./rutas.js'))*/
/*app.get('/registro',(req,res)=>{
    res.send('Resultado')
})*/
/*
app.listen(app.get('port'),()=>{
    console.log('servidor corriendo en ', app.get('port'));
})*/
/*app.get('/vista',(req,res)=> {
    res.sendFile('/formulario.html',{root:__dirname})
})*/
