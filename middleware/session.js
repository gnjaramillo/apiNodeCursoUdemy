const { usersModel } = require('../models');
const {handleHttpError} = require('../utils/handleError')
const {verifyToken} = require('../utils/handleJwt')
const getproperties = require('../utils/handlePropertiesEngine')
const propertiesKey = getproperties()


const authMiddleware = async (req, res, next) => {

    try {

        if (!req.headers.authorization) {
            handleHttpError(res, 'not token', 401 );
            return
        }
               
        const token = req.headers.authorization.split(' ').pop();
        const datatoken = await verifyToken(token);
        
        if (!datatoken) {
            handleHttpError(res, 'not_payload_data', 401 );
            return
        }

        const query = {
            [propertiesKey.id]:datatoken[propertiesKey.id]
        }  


        // para ver quien hace la peticion 
        // usamos findOne, metodo comun en mysql y mongo 
        const user = await usersModel.findOne(query)
        req.user = user

        next()

        
    } catch (error) {
        handleHttpError(res, 'not session', 401 )
    }

}

module.exports = authMiddleware;