const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/passportDB").then(()=>{
    console.log("DB is connected");
}).catch(err=>{
    console.log(err);
})


