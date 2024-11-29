const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete') // para borrado logico


const TracksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    album:{
        type: String,
    },
    cover: {
        type: String,
        validate:{
            validator:(req)=>{
                return true;
            },
            message: 'ERROR_URL',
        }
    },    
    artist: {
            name: {
                type: String,
                required: true
            },
            nickname: {
                type: String
            },
            nationality: {
                type: String
            },       
        
        },
    
    duration: {
        start:{
            type: Number
        },
        end:{
            type: Number
        }
    }, 
    mediaId:{
        type: mongoose.Types.ObjectId,
    },
}, 

{
    timestamps: true,
    versionKey: false
}

);


TracksSchema.plugin(mongooseDelete, {overrideMethods: 'all'})
module.exports = mongoose.model('Tracks', TracksSchema); 



// Users es el nombre de la tabla o colección