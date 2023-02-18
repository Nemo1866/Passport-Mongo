const mongoose=require("mongoose")


let userSchema={
    name:String,
    username:{
        type:String,
        required:true,
        unique:true
    },password:{
        type:String,
        required:true
    }

}

exports.User=mongoose.model("user",userSchema)