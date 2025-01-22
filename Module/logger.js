
//var x =; //Syntaxical error

console.log(__filename);
console.log(__dirname);
var url = 'http://mylogger.io/log';

function log(message){
    //Send an HTTP request
    console.log(message);


}

module.exports = log;
//exports.log = log;
//This exports a function

//module.exports.log = log;
//This exports and object

//module.exports.url = url;
//module.exports.endPoint = url;

//module.exports.globalname = localname