/**
 * Created by stardust on 2016/11/18.
 */

var mongoose = require('./mongodb').mongoose

var Schema = mongoose.Schema
var GroupSchema = new Schema({
    id : String,
    pdfData : String,
    fileName : String,
    creator : String
})

module.exports = mongoose.model('Group', GroupSchema)