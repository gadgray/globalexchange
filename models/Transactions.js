const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
    
    transactionID: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    
    gateway: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

const Transaction = mongoose.model('Transaction', transactionSchema);


module.exports =Transaction;