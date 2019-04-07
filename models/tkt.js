const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-email');

const TktSchema = new Schema({
    source : {
        type : mongoose.SchemaTypes.String
    },
    destination : {
        type : mongoose.SchemaTypes.String
    },
    doj : {
        type : mongoose.SchemaTypes.Date
    }

});

module.exports = tkt = mongoose.model('tkt',TktSchema);