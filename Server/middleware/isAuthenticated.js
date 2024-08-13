const jwt = require("jsonwebtoken");
const { promisify} = require("util");
const User = require("../model/userModel");

const isAuthenticated = async(req,res,next)=>{

    //If your setup does not use the Bearer scheme and the Authorization header contains only 
    //the token itself, you should handle it accordingly:
    // const token = req.headers.authorization

    //Using split(' ')[1] extracts the token part from this header. split(' ') divides the string
    // into an array where the first element is Bearer and the second element is the token.
    const token = req.headers.authorization?.split(' ')[1];
    
    if(!token)
    {
       return res.status(403).json({
            message:"please login"
        })
    }

    try{
        const decoded = await promisify(jwt.verify)(token,process.env.SECRET_KEY)

        const doesUserExist = await User.findOne({_id:decoded.id})
    
        if(!doesUserExist)
        {
            return res.status(404).json({
                message:"User does not exist with that Token/id"
            })
        }

        req.user = doesUserExist

        next()
    
    
    }
    catch(error)
    {
        res.status(400).json({
            message:error.message
        })

    }
   
    
}


module.exports = isAuthenticated 