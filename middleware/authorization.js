var jwt = require('jsonwebtoken');

const auth=(req,res,next)=>{
    const token=req.headers.authorization;

     if(token){
        jwt.verify(token, 'kunju', function(err, decoded) {
            console.log("decoded",decoded)
            if(decoded){
                req.body.userID=decoded.userID
                  next()
            }else{
                res.send("Invalid first")
            }
          });
     }else{
        res.send("Login first")
     }

}

module.exports={auth}