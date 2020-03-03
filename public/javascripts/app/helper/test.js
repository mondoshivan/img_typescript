// Export einer öffentlichen Funktion
module.exports = {

    processRequest : function processRequest(req, res) {
        /* (...) */
        if (req.method === "GET") {
            doGet("some.url", req, res);
        }
        /* (...) */
    }
}

// private Funktion
function doGet(uri, req, res) {
    console.log(uri);
    console.log(req);
    res('success');
}