const mongoose = require('mongoose');
const conn = mongoose.connect(process.env.url)
    .then((db) => {
        console.log("database connected")
        return db;
    }).catch((err) => {
        console.log(err);
    })

    
module.exports = conn;