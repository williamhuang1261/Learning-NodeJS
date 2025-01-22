//Trade off between query performance vs consistency

//Using References (Normalization) -> CONSISTENCY
let author = {
  name: 'Mosh'
}

let course = {
  author: 'id',
}

//Using embedded documents (Denormalization) -> PERFORMANCE

let course2 = {
  author:{
    name: 'Mosh'
  }
}

//Hybrid
let author2 = {
  name: 'Mosh'
  // 50 author properties
}

let course3 = {
  author: {
    id: 'ref',
    name: 'Mosh'
  }
}