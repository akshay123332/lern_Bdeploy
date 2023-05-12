const mongoose=require("mongoose");

const postSchema=mongoose.Schema({
    title:{type:String,require:true},
    descrption:{type:String,require:true},
    status:{type:Boolean,require:true},
    userID:{type:String,require:true},
},{
    versionKey:false
})


const PostModel=mongoose.model("post",postSchema)

module.exports={PostModel}







