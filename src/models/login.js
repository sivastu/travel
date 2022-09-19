const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    otp:{
        type:String
    },
    phone:{
        type:String
    },
    emailToken:{
        type:String
    },
    isVerified:{
        default:false,
        type : Boolean
    },
    resetToken:String,
    expireToken:Date,
    date:{
        type:Date,
        default:Date.now()
    }
})

mongoose.model("Login",userSchema)