/**
 * Created by stardust on 2016/11/18.
 */
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://demo:demo@123.206.216.203/pdfserver')
exports.mongoose = mongoose

exports.check = function (model, field, value, callback) {

    model.count({ field : value }, function (err, count) {
        callback(err, !! count);
    })
}