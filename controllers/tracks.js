const { matchedData } = require('express-validator');
const {tracksModel} = require('../models')
const {handleHttpError} = require('../utils/handleError')
const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');  // Importar Sequelize



/* findAllData y findOneData son nombres personalizados para usar metodos estaticos 
directamente desde los modelos mysql y mongo, se hace con el fin de q los controladores sirvan para mongo y mysql  */


const getItems = async (req, res) => {
    try {
        const user = req.user; // Ver quién hizo la petición
        const data = await tracksModel.findAllData(); // Llamar al método personalizado con $lookup
        res.send({ data, user });
    } catch (error) {
        console.error(error);
        handleHttpError(res, 'Error al obtener los items', 404);
    }
};






const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await tracksModel.findOneData(id);

        // Verificar si no se encontró el documento
        if (!data) {
            return res.status(404).send({ error: 'Item not found' });
        }

        res.send({ data });
    } catch (error) {
        console.error(error);
        handleHttpError(res, 'Error getting item', 500); // Código 500 para errores internos
    }
};




// crear registro mongo y mysql
const createItem = async (req, res) => {

    try {
        const body = matchedData(req) // devuelve la data limpia
        // console.log(body)    
        const data = await tracksModel.create(body)
        res.status(201).send({ data });
        
    } catch (error) {
        console.error('Error during track creation:', error); // Imprimir detalles del error
        handleHttpError(res, 'Error creating track', 500); // Usar código 500 para errores internos del servidor
    }
    
 };





/*  // actualizar registro mysql
const updateItems = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req); // Extrae el id y el resto del cuerpo
        const [updatedRows] = await tracksModel.update(body, {
            where: { id: id } // Filtro para encontrar el registro por ID
        });

        if (updatedRows === 0) {
            // Si no se actualizó ningún registro, retorna un error 404
            return res.status(404).send({ error: 'Track not found or no changes made' });
        }

        // Recuperar el registro actualizado
        const data = await tracksModel.findByPk(id);
        res.send({ data });

    } catch (error) {
        console.error(error); // Log del error para depuración
        handleHttpError(res, 'error update items', 403);
    }
};





// eliminado con soft delete (eliminado lógico) mysql
const deleteItems = async (req, res) => {
    try {
        const { id } = matchedData(req); // Obtener el ID del request
        
        // Realizar el soft delete del registro
        const data = await tracksModel.destroy({
            where: { id }, // Filtro por ID
        });

        console.log(data)

        if (!data) {
            return res.status(404).send({ error: 'Item no encontrado' });
        }

        res.send({ message: 'Item eliminado lógicamente', id });

    } catch (error) {
        console.error(error);
        handleHttpError(res, 'Error al eliminar el item', 500);
    }
};






// ver los registros eliminados con soft delete mysql
const getItemsDelete = async (req, res) => {
    try {
        // Obtener todos los registros eliminados lógicamente
        const deletedTracks = await tracksModel.findAll({
            paranoid: false,  // Incluye registros eliminados lógicamente
            where: {
                deletedAt: { [Sequelize.Op.ne]: null }  // Registros donde deletedAt no es null
            }
        });
        res.send({ data: deletedTracks });
    } catch (error) {
        console.error(error); 
        handleHttpError(res, 'Error getting deleted tracks');
    }
}; */





 
// actualizar registro mongo
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




// eliminado con soft delete (eliminado lógico) mongo
const deleteItems = async (req, res) => {
    try {
        const {id} = matchedData(req) 
        const data = await tracksModel.delete(
            { _id: id }, // Filtro
        );       
        if (data.modifiedCount > 0) {
            res.status(200).send({ data: { deleted: 1 } }); // Devolver la propiedad esperada
        } else {
            res.status(404).send({ error: 'Item not found' });
        }
    } catch (error) {
        handleHttpError(res, 'error delete item', 404)
    }
    
}; 





// ver registros eliminados con soft delete mongo
const getItemsDelete = async (req, res) => {
    try {
        const data = await tracksModel.findDeleted({ deleted: true });
        res.send({data});

    } catch (error) {
        handleHttpError(res, 'error get items delete')
    }
}; 





module.exports = {getItems, getItem, createItem, updateItems, deleteItems, getItemsDelete}




// eliminar registro mongo (se elimina fisicamente de la BD)
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

