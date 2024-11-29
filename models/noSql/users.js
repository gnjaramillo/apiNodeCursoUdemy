const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete') // para borrado logico


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type: Number       
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // formato correo electrónico
    },    
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false //ocultar contraseña en las consultas
    },  
    /* foto: {
        type: mongoose.Schema.Types.ObjectId, // ID colección storage almacena la imagen
        ref: 'Storage',
        required: false
    },
    resetPasswordToken: String,  // Campo para almacenar el token de recuperación de contraseña
    resetPasswordExpires: Date,  // Fecha de expiración del token
 */
}, 

{
    timestamps: true,
    versionKey: false
}

);


UserSchema.plugin(mongooseDelete, {overrideMethods: 'all'})
module.exports = mongoose.model('Users', UserSchema); 



// Users es el nombre de la tabla o colección