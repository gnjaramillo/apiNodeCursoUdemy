const express = require('express');
const router = express.Router();
const uploadMiddleware = require ('../utils/handlestorage');
const {validatorGetItem} = require ('../validators/storage')
const {getItem, getItems, updateItems, deleteItems, createItem } = require('../controllers/storage')


//listar items
router.get('/', getItems )
//obtener un detalle
router.get('/:id', validatorGetItem, getItem )
// crear un item
router.post('/', uploadMiddleware.single('myFile'), createItem )
// actualizar un registro
router.put('/:id', validatorGetItem, updateItems)

router.delete('/:id', validatorGetItem, deleteItems)

// eliminar un registro
module.exports = router;