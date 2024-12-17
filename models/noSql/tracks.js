const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete'); // para borrado logico
const { $where } = require('./storage');


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

/**
 * implementar metodo propio con relacion a storage
 */

TracksSchema.statics.findAllData = function (){
    const joinData = this.aggregate([
        {
            $lookup:{
                from: 'storages',
                localField: 'mediaId', // tracks.mediaId
                foreignField: '_id', // storage._id
                as: 'audio'
            }
        },

        {
            $unwind: { path: '$audio', preserveNullAndEmptyArrays: true }
        }
    ])

    return joinData; 
};

TracksSchema.statics.findOneData = function (id){
    const joinData = this.aggregate([
        {
            $match: { 
                _id: new mongoose.Types.ObjectId(id)             
            }
        },

        {
            $lookup:{
                from: 'storages',
                localField: 'mediaId', // tracks.mediaId
                foreignField: '_id', // storage._id
                as: 'audio'
            }
        },

        {
            $unwind: { path: '$audio', preserveNullAndEmptyArrays: true }
        }
    ])

    return joinData; 
}


TracksSchema.plugin(mongooseDelete, {overrideMethods: 'all'}) // para q en las consultas no me traiga los registros eliminados con soft delete
module.exports = mongoose.model('Tracks', TracksSchema); 



