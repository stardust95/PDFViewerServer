/**
 * Created by stardust on 2016/11/18.
 */

var express = require('express');
var router = express.Router();
var Annotation = require('../models/annotation')
var Group = require('../models/group')

router.get('/', function (req, res, next) {
    res.json({ message : "get all annotations" })
})

router.post('/sync', function (req, res, next) {
    // var groupId = req.groupId
    // find all annotations with groupId and not
    // var result;

    Annotation.find( {
        'groupId' : req.body.groupId}
        , function (err, objs) {
            if( err )
                res.send(err)
            var result = []
            var thisAccount = req.body.account
            for(var i in objs){
                if( objs[i].hasSync.indexOf(thisAccount) == -1 ){
                    result.push(objs[i])
                    objs[i].hasSync.push(thisAccount)
                    Annotation.update({ _id : objs[i]._id }, { hasSync : objs[i].hasSync }, { hasSync : true }, function (err) {
                        if( err )
                            res.send(err)
                    })
                }
            }
            console.log(result)
            res.json(result)
        }
    )
})

router.post('/', function (req, res, next) {
    var annotation = new Annotation();
    // annotation.id = req.body.id
    annotation.groupId = req.body.groupId
    annotation.account = req.body.account
    annotation.jsonData = req.body.jsonData
    annotation.hasSync = [ req.body.account ]

    Group.findOne({ id : annotation.groupId }, function (err, result) {
        if( err )
            res.send(err)
        else if ( !result ){        // no group
            res.json({ message : "No Such Group" })
        }
    })

    annotation.save(function (err) {
        if( err )
            res.send(err)
        console.log(annotation)
        res.json({ message : "Annotation Uploaded", object : annotation })
    })
})


module.exports =router


