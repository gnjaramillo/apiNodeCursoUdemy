const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const getproperties = require('../utils/handlePropertiesEngine')
const propertiesKey = getproperties()

/**
 * pasar el objeto del usuario
 * @param {*} user 
 */


const tokenSign = async (user) => {
const sign = await jwt.sign(
    // vuelvo dinamico esto, sea el motor mysql o mongo
    {
        [propertiesKey.id] : user[propertiesKey.id],
        role: user.role
    },
    JWT_SECRET,
    { expiresIn: '2h' }
);

return sign;
}



/**
 * pasar token de sesion de jwt
 * @param {*} tokenJwt 
 */
const verifyToken = async (tokenJwt) => {

    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (error) {
        return null  
    }

}


module.exports = {tokenSign, verifyToken}