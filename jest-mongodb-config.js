const dbName = process.env.MONGO_DB_NAME;
module.exports = {
    mongodbMemoryServerOptions: {
        instance: {
            dbName: dbName
        },
        binary: {
            version: '^3.6.4', // Version of MongoDB
            skipMD5: true
        },
        autoStart: false
    }
};