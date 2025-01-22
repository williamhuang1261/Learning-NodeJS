const path = require('path')
const os = require('os')

var pathObj = path.parse(__filename);
var osObj = os.freemem();

console.log(pathObj);
console.log(osObj/1000000000);