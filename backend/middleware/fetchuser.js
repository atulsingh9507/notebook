var jwt = require('jsonwebtoken');
const JWT_SECRET = 'atulisagoodboy';

const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "please authenticate using a valid token"})
    }
    try{

        const data = jwt.verify(token,JWT_SECRET)
        req.user = data.user;
        next();

    }catch (error){
        res.ststus(401).send({error: "please authenticate using a vlid token"})
    }
}
module.exports = fetchuser;