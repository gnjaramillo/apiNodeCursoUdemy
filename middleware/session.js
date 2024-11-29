const { usersModel } = require('../models');
const {handleHttpError} = require('../utils/handleError')
const {verifyToken} = require('../utils/handleJwt')



const authMiddleware = async (req, res, next) => {

    try {

        if (!req.headers.authorization) {
            handleHttpError(res, 'not token', 401 );
            return
        }

               
        const token = req.headers.authorization.split(' ').pop();
        const datatoken = await verifyToken(token);
        
        if (!datatoken._id) {
            handleHttpError(res, 'invalid token', 401 );
            return
        }

        // para ver quien hace la peticion 

        const user = await usersModel.findById(datatoken._id)
        req.user = user

        next()

        
    } catch (error) {
        handleHttpError(res, 'not session', 401 )
    }

}

module.exports = authMiddleware;