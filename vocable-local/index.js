const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./route/routes'); 
require('dotenv').config();
const cors = require('cors');

mongoose.set('strictQuery', false);

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use(express.json());
app.use('/api', routes); 

app.listen(9992, () => {
    console.log("Server in ascolto sulla porta 9992");
});

mongoose.connect("mongodb://localhost:27017/utenti", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    },
    (err) => {
        console.log(err, ": database utenti non connesso");
    }
);
