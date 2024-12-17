const ENGINE_DB = process.env.ENGINE_DB;

const getproperties = () => {
    const data = {
        nosql: {
            id: '_id', // MongoDB usa '_id'
        },
        mysql: {
            id: 'id', // MySQL usa 'id'
        },
    };

    if (!data[ENGINE_DB]) {
        throw new Error(`Invalid ENGINE_DB: ${ENGINE_DB}. Use 'nosql' or 'mysql'.`);
    }

    return data[ENGINE_DB]; // Devuelve el esquema según el motor
};

module.exports = getproperties;
