const { matchedData } = require('express-validator');
const { encrypt , compare} = require('../utils/handlePassword');
const {usersModel} = require('../models')
const {tokenSign} = require('../utils/handleJwt') 
const {handleHttpError} = require('../utils/handleError')


const register = async (req, res) =>{

    try {
        req = matchedData(req);
        const password= await encrypt(req.password)
        const body = {... req, password }
    
        const dataUser = await usersModel.create(body)
        // ocultar contraseña en la data
        dataUser.set('password', undefined, {estrict: false})
    
        const data = {
            token: await tokenSign(dataUser),
            user: dataUser,
    
        }
    
        res.send({data: data})
        
    } catch (error) {
        handleHttpError(res, 'error register user')
    }
}



const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const user = await usersModel.findOne({ email:req.email }).select('password name');

        if (!user) {
            handleHttpError(res, 'user not found', 404);
            return
        }

        const hashPassword = user.password;
        const check = compare(req.password, hashPassword)

        if (!check) {
            handleHttpError(res, 'password invalidad', 401);
            return
        }

        const data = {
            token: await tokenSign(user),
            user : user
        }

        res.send({data}) 

        
    } catch (error) {
        handleHttpError(res, 'error login user')
    }
    
}


module.exports = { loginCtrl, register }