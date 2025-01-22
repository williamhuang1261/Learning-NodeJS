const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type:Date, default: Date.now },
    isPublished: Boolean
});

//Classes, objects
//Human, John
//Course, nodeCourse
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    
    //saving course
    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    /*Comparison Query Operators
    eq (equal)
    ne (not equal)
    gt (greater than)
    gte (greater than or equal to)
    lt (less than)
    lte(less than or equal to)
    in
    (not in)*/

    /*Logical Query Operators
    or
    and
    */


    const courses = await Course
        //.find({author: 'Mosh', isPublished: true})
        //.find({ price: { $gt: 10, $lte: 20 } })
        //.find({ price: { $in: [10, 15, 20] } })
        //.find()
        //.or([ {author: 'Mosh'}, {isPublished: true} ])
        //.and([ {author: 'Mosh'}, {isPublished: true} ])

        //Starts with Mosh
        .find( {author: /^Mosh/} )

        //Ends with Hamedani/hamedani
        .find({author: /Hamedani$/i})

        //Contains Mosh
        .find({author: /.*Mosh.*/i})

        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

getCourses();