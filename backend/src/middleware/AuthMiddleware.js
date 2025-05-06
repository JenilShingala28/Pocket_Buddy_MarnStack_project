const jwt = require("jsonwebtoken")
const secret = "secret"

const authMiddleware = (req,res,next) => {
    var token = req.headers.authorization;
    if(token){
        if(token.startsWith("Bearer ")){
            //remove Bearer // string split
            //Bearer mkldjoisjalsjijsijsasiao // [Bearer,tokenn]
            token = token.split(" ")[1]
            //token verify..
            try{
                const userFromToken = jwt.verify(token,secret)
                req.user = userFromToken;
                console.log("Authenticated user:",userFromToken)
                next();
            }catch(err){
                console.error("JWT Verification Error:", err.message); // Debugging
                res.status(500).json({
                    message:"token is not valid..."
                })
            }
        }else{
            res.status(400).json({
                message:"token is not Bearer token..."
            })
        }
    }else{
        res.status(400).json({
            message:"token is required..."
        })
    }
}

module.exports = {
    authMiddleware,
}