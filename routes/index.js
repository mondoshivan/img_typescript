const IndexModel = require('../model/index_model');

class IndexRouter {

    //-------------------------------
    static getRoot(request, response) {
        IndexModel.getModel((error, result) => {
            if (!error && result) {
                response.send(result);
            } else {
                response.status(404).send('Not found!');
            }
        });
    }

    //-------------------------------
    static getRootPage(request, response) {
        response.render('index', { title: 'New Express'});
    }

    //-------------------------------
    static findModel(request, response) {
        const { id } = request.params;
        IndexModel.find(id, (error, result) => {
            if (!error && result) {
                response.send(result);
            } else {
                response.status(404).send('Not found!');
            }
        });
    }

    //-------------------------------
    static insert(request, response) {
        const { id } = request.body;
        const data = { ...request.body };
        delete data.id;
        IndexModel.insert(data, (error, result) => {
            if (!error && result) {
                response.send(result);
            } else {
                response.status(409).send(error);
            }
        });
    }

    //-------------------------------
    static update(request, response) {
        const { id } = request.params;
        const data = { ...request.body };
        delete data.id;
        IndexModel.update(id, data, (error, result) => {
            if (!error && result) {
                response.send(result);
            } else {
                response.status(404).send('Not found!');
            }
        });
    }

    //-------------------------------
    static delete(request, response) {
        const { id } = request.params;
        IndexModel.delete(id, (error, deleted) => {
            if (!error && deleted) {
                response.send(deleted);
            } else {
                response.status(404).send('Not found!');
            }
        });
    }
}

module.exports = IndexRouter;