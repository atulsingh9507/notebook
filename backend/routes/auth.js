const express = require('express');
const User = require('../models/User');
const router = express.Router(); 
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')

const JWT_SECRET = 'atulisagoodboy';




// create a user using:post "/api/auth/create user". no loging required

router.post('/createUser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 3 }),
], async (req, res)=>{ 
    // if there are errors,return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
const salt =await bcrypt.genSalt(10);
 const secPass =await bcrypt.hash(req.body.password, salt);

    // cheak whether the email exists already
    let user = await  User.findOne({email:req.body.email});

    if (user) {
     return res.status(400).json({error:"Sorry a user with this email already exists"})
    }
   user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
    });
    
    // .then(user => res.json(user))
    // .catch(err=> {console.log(err)
    // res.json({error:'please enter a unique value for email'})})
    const data ={
        user:{
            id:user.id
        }
    }
   const authtoken = jwt.sign(data, JWT_SECRET);

   // res.json(user)
   res.json({authtoken})
} catch (error){
    console.error(error.message);
    res.status(500).send("some error occured");
}
})

module.exports = router;