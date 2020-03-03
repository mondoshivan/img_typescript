const Model = require('./model');


class IndexModel extends Model {

    //-------------------------------
    static getModel(callback) {
        Model.getDB().find(IndexModel.collection, {}, function(error, result) {
            callback(error, result);
        });
    }

    //-------------------------------
    static find(id, callback) {
        Model.getDB().find(IndexModel.collection, { id: id }, function(error, result) {
            callback(error, result);
        });
    }

    //-------------------------------
    static insert(data, callback) {
        Model.getDB().insert(IndexModel.collection, data, function(error, result) {
            callback(error, result);
        });
    }

    //-------------------------------
    static update(id, changes, callback) {
        Model.getDB().updateOne(IndexModel.collection, { id: id }, changes, function(error, result) {
            callback(error, result);
        });
    }

    //-------------------------------
    static delete(id, callback) {
        Model.getDB().deleteOne(IndexModel.collection, { id: id }, function(error, result) {
            callback(error, result);
        });
    }


}

IndexModel.collection = 'Index';

module.exports = IndexModel;