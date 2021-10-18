const express = require('express');
const router = express.Router();
const cone = require('../conexion');
usua = [];

cone.query('SELECT * from Registro_db', function(error,results,fields) {
    if(error)
        throw error;

        results.forEach(element => {
        //console.log(element);
        usua.push(element);
        });

});

//cone.end();

router.get('/',(req,res)=>{
    res.render("registrarse",{
        arrayMascotas: usua
   })
})
router.post('registrarse/guardar',(req,res)=>{
    console.log(req.body);
    req.getConnection((error,conn)=>{
        if (error){
            return res.send(error);
        } else{
            conn.query('INSERT INTO registro_db SET ?',req.body,(error,rows)=>{
                if (error){
                    return res.send(error);
                } else {
                    res.send('Registro guardado con éxito');
                }
            })
        }
    })
})
module.exports = router;