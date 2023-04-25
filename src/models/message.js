const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    id:{
        type:String
    },
    message:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

mongoose.model("Message",userSchema)