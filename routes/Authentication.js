const { Router } = require("express");
const { UserModel } = require("../model/authmodel");

const authRouter = Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


authRouter.post("/signup", async (req, res) => {
    const {email}=req.body
    try {
        const check=await UserModel.find({email})
        console.log(check)
        if(check.length!=0){
          return  res.status(200).send({"msg":"user already present"})
        }else{
            const user = new UserModel(req.body);
            await user.save()
            res.status(200).send({ "msg": "Signup Succesful" })
            
        }
        
    } catch (err) {
        res.status(400).send({ "msg": "Signup Failed" })
    }
})

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const check = await UserModel.findOne({ email, password })
        console.log(check)
        if (check) {
            var token = jwt.sign({ userID: check._id }, 'kunju');
            res.status(200).send({ "msg": "Login Succesful","name":check.name,"token":token })
        } else {
            res.status(200).send({ "msg": "Invalid credentials" })
        }
    } catch (err) {
        res.status(400).send({ "msg": "Login Failed" })
    }
})




module.exports = { authRouter }



