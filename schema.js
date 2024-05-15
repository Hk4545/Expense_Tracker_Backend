const mongoose = require('mongoose');

const schema = mongoose.Schema;

const transaction_model = new schema({
    name: {type:String, default:"No name"},
    type: {type: String, default:"Investment"},
    amount: {type: Number},
    date: {type:Date, default: Date.now}
})
const Transaction = mongoose.model('transaction', transaction_model)

module.exports = {
    Transaction
}