const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-email');

const UserSchema = new Schema({
    email : {
        type : mongoose.SchemaTypes.String
    },
    name : {
        type : mongoose.SchemaTypes.String
    },
    password : {
        type : mongoose.SchemaTypes.String
    },
    dob : {
        type : mongoose.SchemaTypes.Date
    }

});

module.exports = User = mongoose.model('user',UserSchema);