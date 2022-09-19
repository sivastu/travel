const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    count:{
        type: String
    },
    pro_id:{
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

mongoose.model("Addtocart",userSchema)