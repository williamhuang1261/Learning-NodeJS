const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]

app.get('/', (req, res) => {
    res.send('Hello World!!!');
})

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

// /api/courses/1
//404 == object not found
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send(`The course with the given id 
        was not found`)
    res.send(course)
})

app.post('/api/courses', (req, res) => {
    const name = {name: req.body.name};
    const schema = Joi.object({name: Joi.string().min(3).required()});
    const result = schema.validate(name);
    if (result.error){
        res.status(400).send(result.error.details[0].message);
    }

    /*if (!req.body.name || req.body.name.length<3){
        //400 Bad Request
        res.status(400).send(`Name is required and should be 
            minimum 3 characters`);
        return;
    }
    */
   
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))
