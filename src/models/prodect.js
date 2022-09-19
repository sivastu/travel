const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    amount:{
        type: Number
    },
    pro_des:{
        type:String
    },
    pro_name:{
        type:String
    },
    offer:{
        type:String
    },
    img:{
        type:String
    },
    pro_cat:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    },
    pro_detail : {
        type:String
    },
    popular : {
        type:Number
    },
    like : {
        type:Number
    }
})
userSchema.index({pro_name: 'text'});

mongoose.model("Prodect",userSchema)