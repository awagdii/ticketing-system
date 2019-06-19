var express = require('express');
const fs = require("fs");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const User=require("../model/User");


const saltRounds = 10;

 let privateKey = fs.readFileSync("private-key.txt", 'utf8');
// let publicKey = fs.readFileSync('public-key.txt');
var router = express.Router();

router.post('/', async function(req, res) {
  console.log(req.body);
 const hash = await bcrypt.hash(req.body.password, saltRounds);
 console.log("after");
 req.body.password = hash;
 delete req.body.confirmpassword;
 let user= new User(req.body).save((err,doc)=> {if(err) res.status(500).send(); else res.status(201).end();})
});


// router.get("/protected", authMiddlerWare, (req, res, next) => {
//   res.json({ success: true });
// });

router.post("/login",  (req, res, next) => {
  console.log(req.body.email);
   User.findOne({'email':req.body.email},async (err,user)=>{
    if (user) {
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid) res.json({ success: false });
  
        var i = 'MWA corp';          // Issuer 
        var s = 'mwa@mum.edu';        // Subject 
        var a = 'http://mwa.in'; // Audience
        var signOptions = {
            issuer: i,
            subject: s,
            audience: a,
            expiresIn: "16h",
            algorithm: "RS256"
        };
       // console.log(user);
        console.log(privateKey);
        console.log(user);

        jwt.sign(user.toJSON(), privateKey, signOptions, function (err, token) {
            console.log(err);
            console.log(token);
            res.json({ success: true, token: token });
        });
    } else {
        res.json({ success: false });
    }
  });


});


module.exports = router;
