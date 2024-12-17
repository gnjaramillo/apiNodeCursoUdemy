const express = require('express');
const router = express.Router();
const {register, loginCtrl} = require('../controllers/auth')
const {validatorRegister, validatorLogin} = require('../validators/auth');

// http://localhost:3000/api/auth/login
// http://localhost:3000/api/auth/register

/** 
 * 'http://localhost:3000/api', // URL base de mi API
/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     description: Endpoint to register a new user in the application.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/authRegister'
 *     responses:
 *       '201':
 *         description: User successfully registered.
 *       '400':
 *         description: Bad request due to validation error.
 *       '500':
 *         description: Internal server error.
 */


/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: login
 *     description: Ruta para loguearse
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/authLogin'
 *     responses:
 *       '201':
 *         description: Usuario registrado exitosamente
 *       '403':
 *         description: Error por validación de usuario
 */

router.post('/register', validatorRegister, register);
router.post('/login', validatorLogin, loginCtrl);




module.exports = router