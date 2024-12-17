const ENGINE_DB = process.env.ENGINE_DB

const pathMOdels = ENGINE_DB === 'nosql' ? './noSql' : './mysql'

const models = {
    usersModel : require(`${pathMOdels}/users`),
    tracksModel : require(`${pathMOdels}/tracks`),
    storageModel : require(`${pathMOdels}/storage`),

}

module.exports = models