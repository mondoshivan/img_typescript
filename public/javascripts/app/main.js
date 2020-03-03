// Import der durch das Skript http2mdb.js exportierten Funktionen
var test = require( "app/helper/test" );

/* (...) */

// Aufruf einer exportierten Funktion
test.processRequest("GET", function (res) {
    console.log(res);
});