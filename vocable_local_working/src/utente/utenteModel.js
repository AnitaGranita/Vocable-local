var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var utenteSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    }

},
{ collection: 'utente' }); //nomina la collezione all'interno del database, i dati saranno nella collezione "utente"

module.exports = mongoose.model('utente', utenteSchema);