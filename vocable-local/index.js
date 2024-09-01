const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./route/routes');
require('dotenv').config();
const app = express();

mongoose.connect(
    process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);

const listener = app.listen(process.env.PORT || 9992, () => {
    console.log('Server in ascolto sulla porta: ' + listener.address().port)
});

module.exports = app;