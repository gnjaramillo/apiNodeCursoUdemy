const express = require('express');
const router = express.Router();
const {getItems, getItem, createItem, updateItems, deleteItems, getItemsDelete} = require('../controllers/tracks')
const {validatorCreateItem, validatorGetItem} = require('../validators/tracks')
const {customHeader} = require('../middleware/customHeader')
const authMiddleware = require('../middleware/session');

//listar items
router.get('/',  getItems)

//listar items eliminados con soft delete
router.get('/deleted', authMiddleware, getItemsDelete)

//obtener un detalle
router.get('/:id', validatorGetItem, getItem)

// crear un registro
router.post('/', validatorCreateItem, createItem)

// actualizar un registro
router.put('/:id', validatorGetItem, validatorCreateItem,  updateItems)

// eliminar un registro
router.delete('/:id', validatorGetItem, deleteItems)



module.exports = router