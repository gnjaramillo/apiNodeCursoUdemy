const {check} = require('express-validator');
const validateResults = require('../utils/handlevalidator')
const {usersModel} = require('../models')


const checkEmailUnique = async (email) => {
    const user = await usersModel.findOne({ where: { email } }); // para mysql
    // const user = await usersModel.findOne({email  }); // para mongo
    if (user) {
        throw new Error('Email ya está en uso'); // Lanza un error si el email ya existe
    }
};

const validatorRegister = [
    check('name').exists().notEmpty().isLength({ min: 3, max: 99 }),
    check('age').exists().notEmpty().isNumeric(),
    check('password').exists().notEmpty().isLength({ min: 3, max: 15 }),
    check('email').exists().notEmpty().isEmail()
        .custom(async (value) => {
            await checkEmailUnique(value); // Llama a la validación personalizada
        }),
    (req, res, next) => {
        return validateResults(req, res, next);
    },
];



const validatorLogin = [
    check('password').exists().notEmpty().isLength({min:3, max:15}),
    check('email').exists().notEmpty().isEmail(),
    (req, res, next) => {
       return validateResults(req, res, next)
    }

];

module.exports = {validatorRegister, validatorLogin}

/* const validatorRegister = [
    check('name').exists().notEmpty().isLength({min:3, max:99}),
    check('age').exists().notEmpty().isNumeric(),
    check('password').exists().notEmpty().isLength({min:3, max:15}),
    check('email').exists().notEmpty().isEmail(),
    (req, res, next) => {
       return validateResults(req, res, next)
    }

]; */

