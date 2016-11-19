/**
 * Created by stardust on 2016/11/18.
 */

var express = require('express');
var router = express.Router();
var Account = require('../models/account')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json({ message: "get all accounts" })
});

router.post('/', function (req, res) {
    var account = new Account();
    account.id = req.body.id;
    account.password = req.body.password

    var isExist = false;

    Account.findOne({ id : account.id }, function (err, acc) {
        if( err )
            res.send(err)
        else if( account.password == acc.password ){
            res.json({ message : "Login Success"});
        }else{
            res.json({ message : "Password Incorrect"});
        }
        isExist = true;
    }).then(function(){
        if( !isExist )
            res.json({ message : "Unregistered Account"});
    })


});

router.post('/register', function (req, res, next) {
    var account = new Account();
    account.id = req.body.id;
    account.password = req.body.password
    account.currentGroupId = null

    var isExist = false;

    Account.findOne({ id : account.id }, function (err, acc) {
        if( err )
            res.send(err)
        res.json({ message : "Account Already Exists"})
        isExist = true;
    }).then(function () {
        if( !isExist )
            account.save(function (err) {
                if( err )
                    res.send(err)
                else
                    res.json({ message : "Account Registered",  object : account })
            });
    })

})

module.exports = router;

