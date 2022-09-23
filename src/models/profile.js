const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    des:{
        type:String
    },
    status:{
        type:String
    },
    lan:{
        type:String
    },
    lon:{
        type:String
    },
    pro_image:{
        type:String
    },
    routes:{
        type:String
    },
    past_routes:{
        type:String
    },
    popular:{
        type:String
    },
    commend:{
        type:String
    },
    like:{
        type:String
    },
    like_given:{
        type:String
    },
    commend_given:{
        type:String
    },
    viewed_profile:{
        type:String
    },
    last_viewed_profile:{
        type:String
    },
    verified : {
        type : String,
    },
    token : {
        type : String,
    },
    places : {
        type : String,
    },
    date_of_birth : {
        type : String,
    },
    award : {
        type : String,
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

mongoose.model("Profile",userSchema)