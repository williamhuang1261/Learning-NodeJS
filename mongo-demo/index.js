const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB', err));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        //match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        //uppercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
          validator: function (v) {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                const result = v && v.length > 0;
                resolve(result);
              }, 2000);
            });
          },
          message: 'A course should have at least one tags',
        },
      },
    date: {
        type:Date,
        default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() {return this.isPublished;},
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: 'Web',
        author: 'Mosh',
        tags: ['frontend'],
        isPublished: true,
        price: 15.80
    });

    try{
        const result = await course.save();
        console.log(result);
    }
    catch(ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message);
        //console.log(ex.message);
    }
}

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        .find({_id: '657bbdd07a89e5ad83bbb4c7'})
        // .skip((pageNumber - 1) *pageSize)
        // .limit(pageSize)
        .sort({ name: 1 })
        //.countDocuments();
        .select({name:1, tags:1, price:1})
    console.log(courses[0].price);
}

async function updateCourse(id){
    const course = await Course.findByIdAndUpdate(id, {
     $set: {
         author: 'Jason',
        isPublished: false
    }
    }, {new: true});
    console.log(course);
}

async function removeCourse(id){

    const course = await Course.findByIdAndDelete(id);
    console.log(course);
}

getCourses();