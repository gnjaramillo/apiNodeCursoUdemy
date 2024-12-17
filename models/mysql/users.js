const { sequelize } = require('../../config/mysql'); // Asegúrate de que esta ruta sea correcta
const { DataTypes } = require('sequelize'); // Usa "DataTypes" con T mayúscula

const User = sequelize.define('users', {
    name: {
        type: DataTypes.STRING, // Cambiado a "DataTypes"
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER, // Usa INTEGER en lugar de NUMBER
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM(['user', 'admin']), // Corrige la sintaxis del ENUM
        defaultValue: 'user', 
    },
}, {
    timestamps: true,
    tableName: 'users',  // Especifica el nombre exacto de la tabla
});

module.exports = User;
