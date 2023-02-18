const express=require("express")
const app=express()
const {User}=require("./model")
const passport=require("passport")
const {initializePassport, isAuthenticated}=require("./passportConf")
const session=require("express-session")

require("./connect")

initializePassport(passport)
app.use(express.json())
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())




app.post("/register",async(req,res)=>{
    let {name,username,password}=req.body
    let user= await User.findOne({username})
    if(user){
        res.json({
            msg:"User Already Registered"
        })
    }
    let newUser= await new User({
        name,
        username,
        password
    })

    await newUser.save(err=>{
        if(!err){
            res.json({
                msg:"User Registered Sucessfully"
            })
        }else{
            res.json({
                msg:err
            })
        }
    })
    
})

app.post("/login",passport.authenticate("local"),async(req,res)=>{
res.json({
    msg:"User login Sucessfully"
})
})

app.get("/profile",isAuthenticated,(req,res)=>{
    res.json({
        msg:req.user
    })
})

app.post("/logout",(req,res)=>{
    req.logOut(function(err){
        if(!err){
            res.json({
                msg:"Sucessfully Logout"
            })
        }else{
            res.json({
                msg:err
            })
        }
    })
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");

})