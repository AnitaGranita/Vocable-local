const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
var routes = require('./route/routes')
const cors = require('cors')
require('dotenv').config()

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));;


app.listen(9992, function check(err)
{
    if(err){
        console.log("Errore connessione al server");
    }else{
        console.log("Server in ascolto sulla porta 9992");
    }
});


mongoose.connect("mongodb://localhost:27017/utenti", //NB: "utenti" è il nome del db, senza niente crea il db di "test"
    {
        useNewUrlParser:true,
        useUnifiedTopology: true
    }).then(
        async()=> {
            console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
        },
        (err) => {
            console.log(err, ": database utenti non connesso")
        }
    );
    app.use(express.json());
    app.use(routes);