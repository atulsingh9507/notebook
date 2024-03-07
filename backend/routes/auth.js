const express = require('express');
const User = require('../models/User');
const router = express.Router(); 
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'atulisagoodboy';




// Raute1 create a user using:post "/api/auth/create user". no loging required

router.post('/login', [
    
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
// Route2 Authenticate a user using:post "/api/auth/login". no loging required
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password can not be blank').exists(),
], async (req, res)=>{
 // if there are errors,return bad request and the errors
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
 }

  const {email, password}= req.body;
  try {
    let user =await User.findOne({email});
    if (!user){
        return res.status(400).json({error:"please login with correct"});

    }

  const passwordCompare =await bcrypt.compare(password, user.password);
  if(!passwordcompare){
    return res.status(400).json({error:"please login with correct"});
  }
  const data ={
    user:{
        id:user.id
    }
}
const authtoken = jwt.sign(data, JWT_SECRET);
res.json({authtoken})

  } catch (error){
    console.error(error.message);
    res.status(500).send("some error occured");
}
})
// Route3  get loggedin  user details:post "/api/auth/getuser". no loging required
router.post('/getuser', fetchuser, async (req, res) =>{


try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error")
    
}
})
module.exports = router;