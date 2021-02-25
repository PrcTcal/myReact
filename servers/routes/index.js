const express = require('express');
const router = express.Router();
const UserModel = require('../model/user');

router.post('/valid', (req, res) => {
    const user = UserModel.user.findOne({userid: req.body.id, pw: req.body.pw}, (err, data) => {
        if(err){
            console.error(err);
        } else {
            if(data != null){
                res.json({result: data});
            }
        }
    });
});

router.post('/reg', (req, res) => {
    const user = UserModel.user({'userid': req.body.id, 'pw': req.body.pw, 'email': req.body.email});
    UserModel.user.findOne({userid: req.body.id, email: req.body.email}, (err, data) => {
        if(err){
            res.json({result: -1});
        } else {
            if(data == null){
                user.save((saveerr) => {
                    if(saveerr) {
                        res.json({result: -1});
                    } else {
                        res.json({result: 0});
                    }
                });
            } else {
                if(data.userid == req.body.id) {
                    res.json({result: 1});
                } else if(data.email == req.body.email){
                    res.json({result: 2});
                }
            }
        }
    });

});

module.exports = router;