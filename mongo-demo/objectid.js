// _id: 65825b1388db370c399f1b91

//12 bytes that allow us to identify an object id
  //4 bytes: timestamp
  //3 bytes: machine identifier
  //2 bytes: process identifier
  //3 bytes: counter

//1 byte = 8 bits
//2 ^ 8 = 256 different numbers in a byte
//2 ^ 24 = 16M diff numbers

//Driver -> MongoDB
//Since driver does the job, MongoDB doesn't take time

const mongoose = require('mongoose');
const id = new mongoose.Types.ObjectId();
console.log(id.getTimestamp());

const isValid = mongoose.Types.ObjectId.isValid('1234')
console.log(isValid);
