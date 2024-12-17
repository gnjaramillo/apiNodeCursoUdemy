const { matchedData } = require('express-validator');
const { encrypt , compare} = require('../utils/handlePassword');
const {usersModel} = require('../models')
const {tokenSign} = require('../utils/handleJwt') 
const {handleHttpError} = require('../utils/handleError')


const register = async (req, res) => {
    try {
        req = matchedData(req); // Filtrar solo los campos validados

        // Validar que el email no exista en la base de datos
        const userExists = await usersModel.findOne({ email: req.email });
        if (userExists) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }
        // Encriptar contraseña
        const password = await encrypt(req.password); // Encriptar contraseña
        const body = { ...req, password };
        const dataUser = await usersModel.create(body);
        // Ocultar contraseña en la respuesta
        dataUser.set('password', undefined, { strict: false });

        const data = {
            token: await tokenSign(dataUser), // Generar token
            user: dataUser,
        };
        res.status(201)
        res.send({ data });
    } catch (error) {
        console.error('Error al registrar usuario:', error); // Log detallado del error
        handleHttpError(res, 'error register user');
    }
};



// login mysql
/* const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        

       const user = await usersModel.findOne({
            where: { email: req.email } // Aquí se incluye la condición en "where" con mysql
        });
        
        

        if (!user) {
            handleHttpError(res, 'user not found', 404);
            return
        }
       

        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword)

        if (!check) {
            handleHttpError(res, 'password invalidad', 401);
            return
        }


        user.set('password', undefined, {estrict: false})


        const data = {
            token: await tokenSign(user),
            user : user
        }
        res.status(200)
        res.send({data}) 

        
    } catch (error) {
        handleHttpError(res, 'error login user')
    }    
}

 */




 // mongo 
const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req);        
        const user = await usersModel.findOne({ email:req.email }).select('password name role');       
        

        if (!user) {
            return handleHttpError(res, 'user not found', 404);
            
        }
       

        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword)

        if (!check) {
            return res.status(401).send({ error: 'Contraseña incorrecta' });          
        }


        user.set('password', undefined, {estrict: false})
        const data = {
            token: await tokenSign(user),
            user : user
        }
        res.status(200).send({ data });

        
    } catch (error) {
        handleHttpError(res, 'error login user', 500)
    }
    
}






module.exports = { loginCtrl, register }