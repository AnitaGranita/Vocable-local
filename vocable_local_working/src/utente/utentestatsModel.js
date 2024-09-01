var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var utentestatsSchema = new Schema({
    email :{
        type: String,
        required: true
    },
    totalgames :{
        type: Number,
        required:true
    },
    gameswon :{
        type: Number,
        required:true
    },
    gameslost :{
        type: Number,
        required:true
    },
    won1 :{
        type: Number,
        required:true
    },
    won2 :{
        type: Number,
        required:true
    },
    won3 :{
        type: Number,
        required:true
    },
    won4 :{
        type: Number,
        required:true
    },
    won5 :{
        type: Number,
        required:true
    },
    won6 :{
        type: Number,
        required:true
    }
},
{collection:'utentestats'});

module.exports = mongoose.model('utentestats',utentestatsSchema)