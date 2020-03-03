const MyDb = require('../components/db');

class Model {

    static getDB() {
        return Model.db;
    }

}

Model.db = new MyDb('img');

module.exports = Model;