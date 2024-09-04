// create database connection

const mongoose = require('mongoose');

const connect = mongoose.connect('mongodb://localhost:27017/puppy');

// check db connected or not

connect.then(()=>{
    console.log('Database connected successfully.!');
})
.catch(()=>{
    console.log(' Database failed to connect');
})


// create a Schema

const logInSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    password:{
        type: String,
        require:true
    }
});

// create a model

const collection = new mongoose.model('puppies', logInSchema);

module.exports = collection;