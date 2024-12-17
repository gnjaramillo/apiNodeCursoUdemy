const { handleHttpError } = require('../utils/handleError');

/**
 * Pasar array con los roles permitidos
 * @param {*} roles
 */
const checkRol = (roles) => (req, res, next) => {
    try {
        const { user } = req;
        console.log({user})

        // estraer los roles del usuario
        const rolesByUser = user.role;

        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle));
        
        if (!checkValueRol ) {
            handleHttpError(res, 'Error de permisos', 403);
        }

        next();
        
    } catch (error) {
        handleHttpError(res, 'Error de permisos', 403);
    }
};

module.exports = checkRol;





/* Se usa el método .some() para comprobar si al menos uno de los roles permitidos
 (en roles) está presente en los roles del usuario (rolesByUser).
La función de callback (rolSingle) => rolesByUser.includes(rolSingle) 
se ejecuta para cada rol en roles, verificando si rolesByUser incluye ese rol.
El resultado es true si existe al menos una coincidencia; de lo contrario, será false. */