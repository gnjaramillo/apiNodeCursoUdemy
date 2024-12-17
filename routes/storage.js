const express = require('express');
const router = express.Router();
const uploadMiddleware = require ('../utils/handlestorage');
const {validatorGetItem} = require ('../validators/storage')
const {getItem, getItems, deleteItems, createItem , getItemsDelete} = require('../controllers/storage')


//listar archivos
router.get('/', getItems);


/**listar archivos documentacion swagger
 * @openapi
 * /storage:
 *   get:
 *     tags:
 *       - storage
 *     summary: Listar todos los archivos
 *     description: Obtener una lista de todos los archivos almacenados.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna una lista de archivos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/storage'
 *       422:
 *         description: Error de validación.
 *       500:
 *         description: Error interno del servidor.
 */



//obtener archivos eliminados
router.get('/deleted',  getItemsDelete )



//obtener un detalle
router.get('/:id', validatorGetItem, getItem )

/** detalle un archivo documentacion swagger
 * @openapi
 * /storage/{id}:
 *   get:
 *     tags:
 *       - storage
 *     summary: Obtener detalles de un archivo
 *     description: Recuperar los detalles de un archivo específico por su ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del archivo a recuperar.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del archivo obtenidos correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/storage'
 *       404:
 *         description: Archivo no encontrado.
 *       422:
 *         description: Error de validación.
 */




// crear un item
router.post('/', uploadMiddleware.single('myFile'), createItem )

/**
 * @openapi
 * /storage:
 *   post:
 *     tags:
 *       - storage
 *     summary: "Upload file"
 *     description: Subir un archivo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               myFile:  # Aquí debe coincidir con el campo de Multer
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Retorna el objeto insertado en la colección.
 *       '422':
 *         description: Error de validación.
*/





// eliminar un registro
router.delete('/:id', validatorGetItem, deleteItems)

 

/** eliminar archivo documentacion swagger
 * Delete storage
 * @openapi
 * /storage/{id}:
 *    delete:
 *      tags:
 *        - storage
 *      summary: "Eliminar storage"
 *      description: Eliminar el detalle de una storage
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de storage a retornar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Retorna el objecto de la storage.
 *        '422':
 *          description: Error de validacion.
 */

module.exports = router;