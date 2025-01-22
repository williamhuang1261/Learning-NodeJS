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
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        .find({author: 'Mosh', isPublished: true})
        .skip((pageNumber - 1) *pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .countDocuments();
    console.log(courses);
}

async function updateCourse(id){
        /*//Approach: Query first
        //findByID()
        //Modify its properties
        //save()
    const course = await Course.findById(id);
    if (!course) return;
    course.isPublished = true;
    course.author = 'Another Author'
        // course.set({
        //     isPublished: true,
        //     author: 'Another Author'
        // })
    const result = await course.save();
    console.log(result);*/


        //Approach Update first
        //Update directly
        //Optionally: get updated document
    // const result = await Course.updateMany({_id: id}, {
    //     $set: {
    //         author: 'Mosh',
    //         isPublished: false
    //     }
    // });
    // console.log(result);

    const course = await Course.findByIdAndUpdate(id, {
     $set: {
         author: 'Jason',
        isPublished: false
    }
    }, {new: true});
    console.log(course);
}

async function removeCourse(id){
    //const result = await Course.deleteOne( {_id:id} );
    const course = await Course.findByIdAndDelete(id);
    console.log(course);
}

removeCourse('657a6a8929623246fbb7a4d5');