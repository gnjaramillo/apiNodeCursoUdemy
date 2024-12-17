/* const {sequelize} = require('../../config/mysql')
const {Datatypes} = require('sequelize');

const Tracks = sequelize.define('tracks', {
    
    name: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    album: {
        type: Datatypes.STRING,
    },
    cover: {
        type: Datatypes.STRING,
    },
    artist_name: {
        type: Datatypes.STRING,
    },
    artist_nickname: {
        type: Datatypes.STRING,
    },
    artist_nationality: {
        type: Datatypes.STRING,
    },
    duration_start: {
        type: Datatypes.INTEGER,
    },
    duration_end: {
        type: Datatypes.INTEGER,
    },
    mediaId: {
        type: Datatypes.STRING,
    },
},

{
    timestamps: true,
    // paranoid: true, // para borrado lógico
}

)

module.exports = Tracks; */


const {sequelize} = require('../../config/mysql');
const {DataTypes} = require('sequelize'); 
const Storage = require('./storage') // modelo storage q esta en esta misma carpeta



// Definición del modelo "Tracks"
const Tracks = sequelize.define(
    'tracks',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false, // Campo obligatorio
        },
        album: {
            type: DataTypes.STRING,
        },
        cover: {
            type: DataTypes.STRING,
        },
        artist_name: {
            type: DataTypes.STRING,
        },
        artist_nickname: {
            type: DataTypes.STRING,
        },
        artist_nationality: {
            type: DataTypes.STRING,
        },
        duration_start: {
            type: DataTypes.INTEGER,
        },
        duration_end: {
            type: DataTypes.INTEGER,
        },
        mediaId: {
            type: DataTypes.INTEGER, // Referencia al modelo "Storage"
            references: {
                model: Storage, // Relación con el modelo "Storage"
                key: 'id', // Campo clave primaria en la tabla "Storage"
            },
            onUpdate: 'CASCADE', // Actualiza la relación en cascada
            onDelete: 'SET NULL', // Si se elimina el registro en "Storage", pone mediaId en NULL
        },
    },
    {
        timestamps: true, // Agrega columnas createdAt y updatedAt
        tableName: 'tracks', // Nombre exacto de la tabla en la base de datos
        paranoid: true, // Habilita el borrado lógico
    }
);

// Definir la relación con el modelo "Storage"
Tracks.belongsTo(Storage, {
    foreignKey: 'mediaId', // Clave foránea en la tabla "tracks"
    as: 'audio', // Alias para la relación
});

// Método personalizado: Obtener todos los tracks con sus datos relacionados
Tracks.findAllData = function () {
    return Tracks.findAll({
        include: [
            {
                model: Storage, // Relacionar con el modelo "Storage"
                as: 'audio', // Alias definido en la relación
            },
        ],
    });
};

Tracks.findOneData = function (id) {
    return Tracks.findOne({
        where: { id }, // Filtrar por el ID del track
        include: [
            {
                model: Storage, // Relacionar con el modelo "Storage"
                as: 'audio', // Alias definido en la relación
            },
        ],
    });
};


// Exportar el modelo
module.exports = Tracks;

