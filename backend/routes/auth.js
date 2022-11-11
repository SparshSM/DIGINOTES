/* eslint-disable no-undef */
const express = require('express');
const { default: mongoose } = require('mongoose');
const {Schema} = mongoose;
const router = express.Router();
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs'); 
var jwt = require('jsonwebtoken');
const JWT_secret = 'sparshdell';

// Route 1 create user using post /api/auth/createuser
router.post('/createuser',[
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
],async (req,res)=>{
    // if errors return errors and bad request
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    // check email exists or not
    try {
    let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({success,error: "same email exists"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass  ,
    })
    const data={
        user:{
            id: user.id
        }
    }

    const authtoken = jwt.sign(data,JWT_secret)
    success= true;
    res.json({success,authtoken})
} catch (error) {
        console.error(error.message);
        res.status(500).send("server error occured");
}
})
//Route 2: login user check /api/auth/login
router.post('/login',[
    body('email', 'enter a valid email').isEmail(),
    body('password','cant be blank').exists(),
],async (req,res)=>{
 // if errors return errors and bad request
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
 }
const {email,password} = req.body;
try {
    let user = await User.findOne({email});
    if(!user){
        success= false;
        return res.status(400).json({error: 'login with correct details'});
    }

    const passcomp = await bcrypt.compare(password,user.password);
    if(!passcomp){
        success= false;
        return res.status(400).json({success, error: 'Please login with correct details'});
    }

    const data={
        user:{
            id: user.id
        }
    }

    const authtoken = jwt.sign(data,JWT_secret)
    success=true;
    res.json({success,authtoken})

} catch (error) {
    console.error(error.message);
        res.status(500).send("some error occured");
}

})
// route 3 get login details using token
router.post('/getuser',fetchuser, async (req,res)=>{
    try {
        let userID = req.user.id
        let user = await User.findById(userID).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
            res.status(500).send("some error occured");
    }
    
    })

module.exports = router