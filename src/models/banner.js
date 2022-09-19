const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    banner:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

mongoose.model("Banner",userSchema)