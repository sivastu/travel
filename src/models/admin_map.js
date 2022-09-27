const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({

    name:{
        type:String
    },
    slug:{
        type:String
    },
    des:{
        type:String
    },
    detail:{
        type:String
    },
    lan:{
        type:String
    },
    lon:{
        type:String
    },
    images:{
        type:String
    },
    icon:{
        type:String
    },
    star:{
        type:String
    },
    popular:{
        type:String
    },
    commend:{
        type:String
    },
    users:{
        type:String
    },
    last_update:{
        type:String
    },
    route:{
        type:String
    },
    status : {
        type : Number,
        default : 1
    },
    color : {
        type : String,
        default : '#000000'
    },
    map_id : {
        type : String
    },
    date:{
        type:Date,
        default:Date.now()
    },
    commends:[{
        mapid : String,
        name : String,
        message : String,
        image : String,
        date:{
            type:Date,
            default:Date.now()
        }
    }],
})

mongoose.model("Admin_map",userSchema)