const localStrategy=require("passport-local")
const { User } = require("./model")

exports.initializePassport=(passport)=>{
    passport.use(new localStrategy(async (username,password,done)=>{
        try {
            let user=await User.findOne({username})

            if(!user){
                return done(null,false)
            }
            if(user.password!==password){
                return done(null,false)
            }
            return done(null,user)
            
        } catch (error) {
            return done(error,false)
        }
       
    }))
    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })
    passport.deserializeUser(async(id,done)=>{
try {
    let user=await User.findById(id)
    done(null,user)
} catch (error) {
    done(error,false)
}
    })
}

exports.isAuthenticated=(req,res,next)=>{
    if(req.user){
        return next()
    }
    res.json({
        msg:"Please Authenticate yourself before accessing this page"
    })
}