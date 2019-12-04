/*este archivo tabaja el modelo de datos*/

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator') /*importo el valdador*/

let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un ROL valido'
}


let usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true, //validacion del email unico
        required: [true, 'el correo es necesario']

    },

    password: {
        type: String,
        required: [true, 'las contraseña es necesaria']
    },

    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos //enum es la enumeracion de posbles valores que acepta esta propiedad, almacenandos en el objeto rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }


})

/*evitamos que se retormne la contrasena*/

usuarioSchema.methods.toJSON = function() {


    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject


}


/*declaro que se use el  plugin del unique validator*/
/*en el segundo parametro la palabra message es reservada y declarando 
su valor entre comillas reemplazamos el mensaje por defecto el PATH me trae el campo que esta siendo validado*/

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' })



module.exports = mongoose.model('Usuario', usuarioSchema)