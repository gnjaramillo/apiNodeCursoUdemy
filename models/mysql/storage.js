const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');

const Storage = sequelize.define('storage', {
    url: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    filename: {
        type: DataTypes.STRING, 
    },
}, {
    timestamps: true,
    paranoid: true, // Habilita el borrado lógico
    tableName: 'storage',  // Especifica el nombre exacto de la tabla
});

Storage.find = Storage.findAll;
Storage.findById = Storage.findByPk;

module.exports = Storage;
