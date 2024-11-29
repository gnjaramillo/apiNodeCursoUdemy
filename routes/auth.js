const express = require('express');
const router = express.Router();
const {register, loginCtrl} = require('../controllers/auth')
const {validatorRegister, validatorLogin} = require('../validators/auth');

// http://localhost:3000/api/auth/login
// http://localhost:3000/api/auth/register




router.post('/register', validatorRegister, register)
router.post('/login', validatorLogin, loginCtrl)




module.exports = router