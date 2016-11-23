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

    Account.findOne({ id : account.id }, function (err, acc) {
        if( err )
            res.send(err)
        else if( !acc ){
            res.json({ message : "Unregistered Account"});
        }else if( account.password == acc.password ){
            res.json({ message : "Login Success"});
        }else{
            res.json({ message : "Password Incorrect"});
        }
    })

});

router.post('/register', function (req, res, next) {
    var account = new Account();
    account.id = req.body.id;
    account.password = req.body.password
    account.currentGroupId = null

    Account.findOne({ id : account.id }, function (err, acc) {
        if( err )
            res.send(err)
        else if( !acc ){
            account.save(function (err) {
                if( err )
                    res.send(err)
                else
                    res.json({ message : "Account Register Success",  object : account })
            });
        }else{
            res.json({ message : "Account Already Exists"})
        }
    })

})

module.exports = router;

