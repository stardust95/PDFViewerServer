/**
 * Created by stardust on 2016/11/18.
 */

var mongoose = require('./mongodb').mongoose

var Schema = mongoose.Schema
var AccountSchema = new Schema({
    id : String,
    currentGroupId : String,
    password : String
})

module.exports = mongoose.model('Account', AccountSchema)