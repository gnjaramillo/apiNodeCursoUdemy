const express = require('express');
const router = express.Router();
const fs = require('fs')

// Define la ruta del directorio actual donde está ubicado el archivo.
const PATH_ROUTES = __dirname; 


const removeExtension = (filename) => {
    return filename.split('.').shift()
}

// fs.readdirSync(PATH_ROUTES) devuelve lista de nombres de archivos como un array de strings
fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file)
    
    if (name !== 'index'){
        // console.log(`cargando ruta ${name}`)
        router.use(`/${name}`, require(`./${file}`))
    }
    
})

module.exports = router



/* const a = fs.readdirSync(PATH_ROUTES)
console.log({a})
*/