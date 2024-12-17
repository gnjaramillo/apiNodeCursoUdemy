const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete') // para borrado logico


const StorageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    filename:{
        type: String       
    },   

}, 

{
    timestamps: true,
    versionKey: false
}

);


StorageSchema.plugin(mongooseDelete, {overrideMethods: 'all'})
module.exports = mongoose.model('Storage', StorageSchema); 



// Users es el nombre de la tabla o colección