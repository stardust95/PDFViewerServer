/**
 * Created by stardust on 2016/11/18.
 */


var express = require('express');
var router = express.Router();
var Group= require('../models/group')
var check = require('../models/mongodb').check

router.get('/', function (req, res, next) {
    res.json( {message : "get all groups" })
})

router.get('/:group_id', function (req, res, next) {
    Group.findOne({ id : req.params.group_id}, function (err, obj) {
        if( err )
            res.send(err)

        res.send(obj)
    })
})

router.post('/', function (req, res, next) {
    var group = new Group();
    group.id = req.body.id
    group.pdfData = req.body.pdfData
    group.fileName = req.body.fileName
    group.creator = req.body.creator
    console.log(group)

    check(Group, 'id', group.id, function (err, exist) {
        if( err ){
            res.send(err)
        } else if( !exist ){
            group.save(function (err) {
                if( err )
                    res.send(err)
                else
                    res.json({ message : "Create Group Success"})
            })
        }
    })
    
    // if( (group.id == null || group.creator == null || group.fileName == null || group.pdfData == null)  ){
    //     res.json({ message : "Parameters not enough", object : group })
    // } else{
    //     group.save(function (err) {
    //         if( err )
    //             res.send(err)
    //         else
    //             res.json({ message : "Create Group Success"})
    //     })
    // }

})

module.exports = router


