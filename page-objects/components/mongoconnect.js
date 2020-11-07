import gloabal from '../../global'
const MongoClient = require('mongodb').MongoClient;
const GLOBAL = new gloabal()

export async function getQueryData(query) {
    var query_result;
    const client = await MongoClient.connect(GLOBAL.__MONGO_URI__, { useNewUrlParser: true })
        .catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    try {
        const db = client.db(GLOBAL.__MONGO_DB_NAME__);
        let collection = db.collection(GLOBAL.__MONGO_COLLECTION_NAME__);
        let getResult = query
        let res = await collection.findOne(getResult);
        query_result = res
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
    return query_result
}

