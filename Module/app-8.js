const EventEmitter = require('events');
//When first letter of each word is in capital, it is a CLASS
const emitter = new EventEmitter();

//Register a listener
emitter.on('messageLogged', function(arg){ //e, eventArg
    console.log('Listener called', arg)
});

//Arrow function
/*emitter.on('messageLogged', (arg) => { //e, eventArg
    console.log('Listener called', arg)
});*/

//Raise event
emitter.emit('messageLogged', {id: 1, url: 'http://'});

//Raise: logging(data:message)
//Listen for logging
emitter.on('loggedIn', (arg) => {
    console.log(`You have been logged in ${arg.id}`);
})
//Raise event
emitter.emit('loggedIn', {id: 'Bobby'});