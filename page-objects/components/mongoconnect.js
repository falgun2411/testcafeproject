import gloabal from '../../global'
const MongoClient = require('mongodb').MongoClient;
const GLOBAL = new gloabal()

async function clientConnect() {
    const client = await MongoClient.connect(GLOBAL.__MONGO_URI__, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(err => {
            console.log(err);
            throw err
        });
    if (client != null && typeof client != undefined) {
        return client;
    }
    // return client
}

export async function getQueryData(query) {
    var query_result;
    const MongoDBClient = await clientConnect()
    try {
        const db = MongoDBClient.db(GLOBAL.__MONGO_DB_NAME__);
        let collection = db.collection(GLOBAL.__MONGO_COLLECTION_NAME__);
        let getResult = query
        let res = await collection.findOne(getResult);
        query_result = res
    } catch (err) {
        console.log(err);
    } finally {
        MongoDBClient.close();
    }
    return query_result
}
