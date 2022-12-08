const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
    user_Id : {
        type: String,
        required: true
    },
    transactionID: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    gateway: {
        type: String,
        required: true,
    },
    recieverAddress: {
        type: String,
        required: true,
    },
    senderAddress: {
        type: String,
    },
    status: {
        type: String,
        required: true,
    },
    network: {
        type: String,
        required: true,
    },
    proofImg: {
        type: String,
        
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

const Transaction = mongoose.model('Transaction', transactionSchema);


module.exports =Transaction;