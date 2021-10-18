const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render("mascotas", {
        arrayMascotas:[
           {id: 'popeye', nombre:'rexona', descripcion:'rex des'},
           {id: 'papita', nombre:'pilones', descripcion:'pilon des'}
       ]
   })
})
module.exports = router;
