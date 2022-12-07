const mongoose = require('mongoose');


const coinSchema = new mongoose.Schema({
    tokenName: {
        type: String,
        required: true
    },
    networks: [{
        name :{
            type: String,
            required: true
        },
        address :{
            type: String,
            required: true
        }
    }],
})

const Coin = mongoose.model('Coin', coinSchema);


module.exports = Coin;