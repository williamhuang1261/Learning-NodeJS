const EventEmitter = require('events');

const NewLogger = require('./logger1.js');
const logger = new NewLogger();
//The class name here does not have to be the same as in the import

//Register a listener
logger.on('messageLogged', function(arg){
    console.log('Listener called', arg)
});

logger.log('message');