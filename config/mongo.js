const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const DB_URI = process.env.DB_URI;

        await mongoose.connect(DB_URI); // Sin opciones obsoletas
        console.log('Conexión correcta a la base de datos');
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
    }
};

module.exports = dbConnect;

