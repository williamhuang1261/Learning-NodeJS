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
    if (!course) {
        return res.status(404).send(`The course with the given id 
        was not found`);
    }
    res.send(course);
})

app.post('/api/courses', (req, res) => {
    const {error} = validateCourse(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    //Look up the course
    //If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course){ 
        return res.status(404).send(`The course with the given 
            id was not found`);
    }
    //Validate
    //If inValid, return 400 - Bad request
    /*const result = validateCourse(req.body);*/
    const {error} = validateCourse(req.body);
    if (error){
        return res.status(400).send(error.details[0].message);
    }
    //Update course
    course.name = req.body.name;
    //Return course
    res.send(course);
});

function validateCourse(course){
    const schema = Joi.object({name: Joi.string().min(3).required()});
    return schema.validate(course);
}

app.delete('/api/courses/:id', (req,res) => {
    //Look up course
    //Not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course){ 
        return res.status(404).send(`The course with the given 
            id was not found`);
    }
    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    //return the same course
    res.send(course);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))
