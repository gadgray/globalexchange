
const mongoose = require('mongoose');


async function ConnectDB (){

    await mongoose.connect('mongodb://localhost:27017/Tester', (err)=>{

    if(!err){
        console.log('db2 connected')
    }
    })
}

ConnectDB()
const Schema = new mongoose.Schema({

    name: {
        type: String
    },
    age: {
        type: Number,
    },
    Amount: {
        type: Number
    },
})

const Person = mongoose.model('Person', Schema);

const person_1 = new Person({
    name: 'Emmanuel Maikai',
    age: 54,
    Amount: 2390
})

// person_1.save(err=>{
//     if(!err){
//         console.log('done')
//     }
// })

const person_2 = new Person({
    name: 'Emmanuel Gad',
    age: 22,
    Amount: 2390
})

person_2.save(err=>{
    if(!err){
        console.log('done')
    }
})

Person.findOne({name: 'Emmanuel Gad'}, (err, user)=>{

    if(!err){
        console.log(user.age + 53)
    }
})