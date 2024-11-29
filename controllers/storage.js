const fs = require('fs')
const {storageModel} = require('../models')
const {handleHttpError} = require('../utils/handleError')
const { matchedData } = require('express-validator');

const PUBLIC_URL = process.env.PUBLIC_URL
// navegar hasta el lugar donde esta el archivo
const MEDIA_PATH = `${__dirname}/../storage`



// obtener lista
const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({})
        res.send({data})
        
    } catch (error) {
        handleHttpError(res, 'error get items', 404)
    }    
};



// obtener detalle
const getItem = async (req, res) => {
    try {
        const {id} = matchedData(req) 
        const data = await storageModel.findById(id)
        res.send({data})
        
    } catch (error) {
        handleHttpError(res, 'error get item', 404)
    }    
};



// crear registro
const createItem = async (req, res) => {
    try {
        const {file} = req
        console.log(file)
    
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`    
        }
        
        const data = await storageModel.create(fileData)
        res.send({data})

    } catch (error) {
        handleHttpError(res, 'error create item')        
    }
 };



// actualizar registro
const updateItems = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};



// eliminar archivo fisico de la multimedia file y de la base de datos
const deleteItems = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const dataFile = await storageModel.findById(id)
        await storageModel.deleteOne({_id: id}) 

        /* si uso delete puedo recuperar el archivo con soft delete pero no 
        podria usar unlinkSync para eliminar el archivo fisicamente (deleteOne lo elimina definitivo) */


        const {filename} = dataFile // extraigo el filename de la data
        const filePath = `${MEDIA_PATH}/${filename}` // C:/miproyecto/file-12333...
        
        fs.unlinkSync(filePath) // elimina el archivo

        const data = {
            filePath,
            deleted:1
        }

        res.send({data});

    } catch (error) {
        handleHttpError(res, 'error delete item')
    }
};



module.exports = {getItems, getItem, createItem, updateItems, deleteItems}

