require('dotenv').config();  // Esto carga las variables del archivo .env
const mongoose = require('mongoose');
const NODE_ENV = process.env.NODE_ENV


const dbConnectNosql = async () => {
    const DB_URI = (NODE_ENV === 'test')? process.env.DB_URI_TEST : process.env.DB_URI
    try {  
        await mongoose.connect(DB_URI); // Sin opciones obsoletas
        console.log('Conexión correcta base de datos mongo');
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
    }
};

module.exports = dbConnectNosql;

