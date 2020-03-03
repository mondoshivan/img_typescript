const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const config = require('../config/config');
const debug = require('debug')('img:db');

class DB {

    constructor(name, options = {}) {
        if (typeof name !== 'string') { throw('name is not a string') }
        const USER = options['user'] || 'root';
        const PASSWORD = options['password'] || 'test';
        const HOST = options['host'] || 'localhost';
        const PORT = options['port'] || '27017';
        this.db_name = name;
        this.URL = "mongodb://"+USER+":"+PASSWORD+"@"+HOST+":"+PORT;
        this.client = null;

        for (let collection in config.dummyData) {
            console.log("collection: " + collection);
            console.log("dummyData: ");
            console.log(config.dummyData[collection]);
            this.insertMany(collection, config.dummyData[collection]);
        }
    }

    connect(callback) {
        MongoClient.connect(this.URL, (error, client) => {
            if (error) { throw error }
            this.client = client;
            callback(error);
        });
    }

    insert(COLLECTION, data, callback) {
        if (Array.isArray(data)) {
            this.insertMany(COLLECTION, data, callback)
        } else {
            this.insertOne(COLLECTION, data, callback)
        }
    }

    insertOne(COLLECTION, data, callback) {
        this.connect(() => {
            const db = this.client.db(this.db_name);
            const collection = db.collection(COLLECTION);
            collection.insert(data, (error, result) => {
                if (error) { throw error; }
                this.close();
                callback(error, result);
            });
        });
    }

    insertMany(COLLECTION, data, callback) {
        this.connect(() => {
            const db = this.client.db(this.db_name);
            const collection = db.collection(COLLECTION);
            collection.insertMany(data, (error, result) => {
                if (error) { throw error; }
                this.close();
                if (callback) {callback(error, result);}
            });
        });
    }

    convertId(id) {
        return new ObjectId(id);
    }

    convertConfig(config) {
        const { id } = config;
        if (id === undefined) { return config; }
        try {
            config['_id'] = this.convertId(id);
            delete config.id;
        } catch (e) {
            debug('Converting failed!');
            debug(config);
            debug(e);
        }
        return config;
    }

    find(COLLECTION, config, callback) {
        config = this.convertConfig(config);
        this.connect(() => {
            const db = this.client.db(this.db_name);
            const collection = db.collection(COLLECTION);
            collection.find(config).toArray((error, result) => {
                if (error) { throw error; }
                this.close();
                if (result.length === 0) { result = null; }
                callback(error, result);
            });
        });
    }

    updateOne(COLLECTION, config, changes, callback) {
        config = this.convertConfig(config);
        changes = { $set: changes };
        console.log(config);
        console.log(changes);
        this.connect(() => {
            const db = this.client.db(this.db_name);
            const collection = db.collection(COLLECTION);
            collection.updateOne(config, changes, (error, result) => {
                if (error) { throw error;}
                this.close();
                console.log(result);
                if (result.result.n === 0) { result = null; }
                callback(error, result);
            });
        });
    }

    updateMany(COLLECTION, config, changes, callback) {
        this.connect(() => {
            const db = this.client.db(this.db_name);
            const collection = db.collection(COLLECTION);
            collection.updateMany(config, changes, (error, result) => {
                if (error) { throw error; }
                this.close();
                callback(error, result);
            });
        });
    }

    deleteOne(COLLECTION, config, callback) {
        config = this.convertConfig(config);
        this.connect(() => {
            const db = this.client.db(this.db_name);
            const collection = db.collection(COLLECTION);
            collection.deleteOne(config, (error, result) => {
                if (error) { throw error; }
                this.close();
                if (result.result.n === 0) { result = null; }
                callback(error, result);
            });
        });
    }

    deleteMany(COLLECTION, config, callback) {
        this.connect(() => {
            const db = this.client.db(this.db_name);
            const collection = db.collection(COLLECTION);
            collection.deleteMany(config, (error, result) => {
                if (error) { throw error; }
                this.close();
                callback(error, result);
            });
        });
    }

    close() {
        if (this.client) { this.client.close();}
    }
}

module.exports = DB;
