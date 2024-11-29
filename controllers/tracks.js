const { matchedData } = require('express-validator');
const {tracksModel} = require('../models')
const {handleHttpError} = require('../utils/handleError')

// obtener lista
const getItems = async (req, res) => {
    try {
        const user = req.user; //  ver quien hizo la peticion
        const data = await tracksModel.find({})
        res.send({data, user})

    } catch (error) {
        handleHttpError(res, 'error get items', 404)
    }    
};



// obtener un detalle
const getItem = async  (req, res) => {
    try {
        const {id} = matchedData(req);
        const data = await tracksModel.findById(id);
        res.send({data});

    } catch (error) {
        handleHttpError(res, 'error get item', 404)
    }
};



// crear registro
const createItem = async (req, res) => {

    try {
        const body = matchedData(req) // devuelve la data limpia
        // console.log(body)    
        const data = await tracksModel.create(body)
        res.send({data})
        
    } catch (error) {
        handleHttpError(res, 'error create items', 404)
    }
 };



// actualizar registro
const updateItems = async (req, res) => {

    try {
        const {id, ...body} = matchedData(req) 
        const data = await tracksModel.findOneAndUpdate(
            { _id: id }, // Filtro
            body, // Campos a actualizar
            { new: true } // Devolver el documento actualizado
        );        res.send({data})
        
    } catch (error) {
        handleHttpError(res, 'error update items')
    }

};



// eliminar registro (se elimina fisicamente de la BD)
/* const deleteItems = async (req, res) => {
    try {

        const {id} = matchedData(req) 
        const data = await tracksModel.findOneAndDelete(
            { _id: id }, // Filtro
        );       
        res.send({data})

    } catch (error) {
        handleHttpError(res, 'error delete item', 404)
    }
    
}; */



// eliminado con soft delete (eliminado lógico)
const deleteItems = async (req, res) => {
    try {
        const {id} = matchedData(req) 
        const data = await tracksModel.delete(
            { _id: id }, // Filtro
        );       
        res.send({data})

    } catch (error) {
        handleHttpError(res, 'error delete item', 404)
    }
    
};


// ver registros eliminados con soft delete
const getItemsDelete = async (req, res) => {
    try {
        const data = await tracksModel.findDeleted({ deleted: true });
        res.send({data});

    } catch (error) {
        handleHttpError(res, 'error get items delete')
    }
}; 



module.exports = {getItems, getItem, createItem, updateItems, deleteItems, getItemsDelete}

