class gloabal {


    constructor() {
        this.__MONGO_URI__ = "mongodb://localhost:27017"
        this.__MONGO_DB_NAME__ = "chess_db"
        this.__MONGO_COLLECTION_NAME__ = "sessions"
        this.getSessionUri = "http://localhost:3000/api/lastsession"
        this.BASE_URL = "http://localhost:8080/"

    }
}

export default gloabal