const {check} = require('express-validator');
const validateResults = require('../utils/handlevalidator')




const validatorGetItem = [
    check('id').exists().notEmpty(),
    (req, res, next) => {
       return validateResults(req, res, next)
    }

];

module.exports = {validatorGetItem}

// check('id').exists().notEmpty().isMongoId(),
