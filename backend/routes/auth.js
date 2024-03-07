const express = require('express');
const User = require('../models/User');
const router = express.Router(); 
const { body, validationResult } = require('express-validator');




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

    
    // cheak whether the email exists already
    let user = await  User.findOne({email:req.body.email});

    if (user) {
     return res.status(400).json({error:"Sorry a user with this email already exists"})
    }
   user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    
    // .then(user => res.json(user))
    // .catch(err=> {console.log(err)
    // res.json({error:'please enter a unique value for email'})})
    res.json(user)
} catch (error){
    console.error(error.message);
    res.status(500).send("some error occured");
}
})

module.exports = router;