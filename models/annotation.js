/**
 * Created by stardust on 2016/11/18.
 */

var mongoose = require('./mongodb').mongoose

var Schema = mongoose.Schema
var AnnotationSchema = new Schema({
    id : String,
    groupId : String,
    account : String,
    jsonData : String,
    // hasSync : [ { account : String } ]
    hasSync : Array
})

module.exports = mongoose.model('Annotation', AnnotationSchema)

