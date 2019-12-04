require('./config/config');

const express = require('express')
const mongoose = require('mongoose');





const app = express()

app.use(require('./routes/usuario'))










/*conexion a la base de datos*/

mongoose.connect(process.env.URLDB, (err, res) => { //process.env.URLDB viene del archivo config

    if (err) throw err;

    console.log('base de datos online');

})


app.listen(process.env.PORT, () => {
    console.log('escuchando puerto 3000');
})