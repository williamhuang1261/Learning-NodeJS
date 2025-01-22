const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(message) {
        //Send an HTTP request
        console.log(message);

        //Raise event
        this.emit('messageLogged', {id: 1, url: 'http://'});
    }
}

module.exports = Logger;