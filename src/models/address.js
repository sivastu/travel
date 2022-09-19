const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    country:{
        type:String
    },
    pin:{
        type:String
    },
    address:{
        type:String
    },
    user_id:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

mongoose.model("Address",userSchema)