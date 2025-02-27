const {Sequelize} = require('sequelize');
const NODE_ENV = process.env.NODE_ENV
const database = (NODE_ENV === 'test') ? process.env.MYSQL_DATABASE_TEST : process.env.MYSQL_DATABASE
const username = process.env.MYSQL_USER
const password = process.env.MYSQL_PASSWORD
const host = process.env.MYSQL_HOST



const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: 'mysql', // o el que uses: 'postgres', 'sqlite', etc.
    logging: false, // Desactiva los logs de Sequelize, es conveniente activarlos en dllo y desactivar en produccion
});

const dbConnectMysql =  async() => {

    
    try{
        await sequelize.authenticate()
        console.log('conexión correcta base de datos mysql')
    }
    catch(e){
        console.log('error de conexión mysql')
    }
};

module.exports = { sequelize, dbConnectMysql };
