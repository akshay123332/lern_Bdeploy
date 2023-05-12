const { Router } = require("express");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { PostModel } = require("../model/postmodel");

const postRouter = Router();

postRouter.get("/",async(req,res)=>{
    let q=req.query
    const{userID}=req.body
    console.log(userID)
 try{
    let data=await PostModel.find({userID})
    res.send(data)
 }catch(err){
    res.send("Not added")
 }
   
})

postRouter.post("/add",async(req,res)=>{
   try{
  let user=new PostModel(req.body)
  await user.save()
  res.send({"msg":"post added"})
   }catch(err){
    res.send({"msg":"post Not added"})
   }
   
})

postRouter.patch("/update/:noteID",async(req,res)=>{
    let {noteID}=req.params
 
    try{
    await  PostModel.findByIdAndUpdate({_id:noteID},req.body)
   res.send({"msg":"post updated"})
    }catch(err){
     res.send({"msg":"post Not updated"})
    }
    
 })

 postRouter.delete("/delete/:noteID",async(req,res)=>{
    let {noteID}=req.params
   
    try{
    await  PostModel.findByIdAndDelete({_id:noteID})
   res.send({"msg":"post deleted"})
    }catch(err){
     res.send({"msg":"post Not deleted"})
    }
    
 })


module.exports = { postRouter }