const {check} = require('express-validator');
const validateResults = require('../utils/handlevalidator')

// para mongo
const validatorCreateItem = [
    check('name').exists().notEmpty().isLength({min:5, max:90}),
    check('album').exists().notEmpty(),
    check('cover').exists().notEmpty(),
    check('artist').exists().notEmpty(),
    check('artist.name').exists().notEmpty(),
    check('artist.nickname').exists().notEmpty(),
    check('artist.nationality').exists().notEmpty(),
    check('duration').exists().notEmpty(),
    check('duration.start').exists().notEmpty(),
    check('duration.end').exists().notEmpty(),
    check('mediaId').exists().notEmpty().isMongoId(), 
    (req, res, next) => {
       return validateResults(req, res, next)
    }

]; 


const validatorUpdateItem = [
    check('name').optional().notEmpty().isLength({ min: 5, max: 90 }),
    check('album').optional().notEmpty(),
    check('cover').optional().notEmpty(),
    check('artist').optional().isObject(), // Valida que artist sea un objeto si se envía
    check('artist.name').optional().notEmpty(),
    check('artist.nickname').optional().notEmpty(),
    check('artist.nationality').optional().notEmpty(),
    check('duration').optional().isObject(), // Valida que duration sea un objeto si se envía
    check('duration.start').optional().notEmpty(),
    check('duration.end').optional().notEmpty(),
    check('mediaId').optional().notEmpty().isMongoId(), // Valida que sea un ID válido de MongoDB
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];


// para mysql
/* const validatorCreateItem = [
    check('name').exists().notEmpty().isLength({ min: 5, max: 90 }),
    check('album').exists().notEmpty(),
    check('cover').exists().notEmpty(),
    check('artist_name').exists().notEmpty(),
    check('artist_nickname').exists().notEmpty(),
    check('artist_nationality').exists().notEmpty(),
    check('duration_start').exists().notEmpty().isInt(),
    check('duration_end').exists().notEmpty().isInt(),
    check('mediaId').exists().notEmpty().isInt(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];




const validatorUpdateItem = [
    check('name').optional().notEmpty().isLength({ min: 5, max: 90 }),
    check('album').optional().notEmpty(),
    check('cover').optional().notEmpty(),
    check('artist_name').optional().notEmpty(),
    check('artist_nickname').optional().notEmpty(),
    check('artist_nationality').optional().notEmpty(),
    check('duration_start').optional().notEmpty().isInt(),
    check('duration_end').optional().notEmpty().isInt(),
    check('mediaId').optional().notEmpty().isInt(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];
  */

const validatorGetItem = [
    check('id').exists().notEmpty(),
    (req, res, next) => {
       return validateResults(req, res, next)
    }

];

module.exports = {validatorCreateItem, validatorUpdateItem, validatorGetItem}