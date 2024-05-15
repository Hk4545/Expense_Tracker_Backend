const express = require("express");
const cors = require('cors');

const app = express();

require('dotenv').config(({path:'./config.env'}))
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const con = require('./connection');
app.use(require('./routes'));

con.then((db) => {
    if(!db){
        return process.exit(1)
    }
    
    app.listen(port, () => {
        console.log("server running", port);
    });

    app.on('error', err => {
        console.log(err);
    })
}).catch((err) => {
    console.log(err)
})