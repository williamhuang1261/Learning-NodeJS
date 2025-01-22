const debug = require('debug')('app:startup');
//const dbDebugger= require('debug')('app:db');
const config = require('config');
const morgan = require('morgan')
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const authenticate = require('./middleware/authenticator');
const courses = require('./routes/courses');
const homepage = require('./routes/homepage');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); //default

//console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//console.log(`app: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({extended: true})); //key=value&key=value
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', homepage);

//Configuration
console.log(`Application Name: ${config.get('name')}`)
console.log(`Mail Server: ${config.get('mail.host')}`)
console.log(`Mail Password: ${config.get('mail.password')}`);

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

//Db work...
//dbDebugger('Connceted to the database...')

app.use(logger);
app.use(authenticate);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))
