const express = require('express')
const app = express.Router()
const mongoose = require('mongoose')
const multiparty = require('multiparty')

require('../models/login')
require('../models/admin_map')
require('../models/message')

const Login = mongoose.model("Login")
const Admin_map = mongoose.model("Admin_map")
const Message = mongoose.model("Message")

const Image_dir = './image'
var util = require('util')

app.post("/login", async (req, res) => {

    //parameter    phone

    let phone = req.body.phone

    let otp = Math.random().toString().substr(2, 6)

    console.log(phone)

    if(req.body.phone === '' || req.body.phone === undefined){
        res.json({
            "status" : false,
            "message" : 'Insert Phone no'
        })
        return
    }

    Login.findOne({phone:phone})
    .then(async (respo)=>{
        if(respo){
            await Login.updateOne({phone:phone},{otp:otp})
            .then((resss)=>{
                res.json({
                    "status" : true,
                    "message" : 'Otp',
                    "otp" : otp
                })
            })
            return
        }
        const one =  new Login({
            phone : phone,
            otp : otp
        })
        await one.save()
        .then((re)=>{
            res.json({
                "status" : true,
                "message" : "Success",
                "otp" : otp
            })
        })
        .catch((err)=>{
            res.json({
                "status" : false,
                "message" : "something went wrong"
            })
        })
    })
})

app.post("/otp", async (req, res) => {

    let otp = req.body.otp

    let phone = req.body.phone

    if(otp === '' || otp === undefined){
        res.json({
            "status" : false,
            "message" : 'Invalid Otp'
        })
        return
    }

    Login.findOne({phone:phone})
    .then(async (respo)=>{
        if(respo.otp === otp){
            await Login.updateOne({phone:phone},{isVerified:true})
            .then((r)=>{
                res.json({
                    "status" : true,
                    "message" : 'Otp Verified Success',
                    'id' : respo._id
                })
            })
        }
        else{
            res.json({
                "status" : false,
                "message" : 'Otp Verified Failed'
            })
        }
    })
})

app.post("/admin_map", async (req, res) => {
  
  
  let form = new multiparty.Form({uploadDir:Image_dir})
  form.parse(req,function(err,fields , file ){
    res.writeHead(200, { 'content-type': 'text/plain' });
      res.write('received upload:\n\n');
      console.log(util.inspect(JSON.stringify({ fields: fields, files: file })))
      res.end(util.inspect({ fields: fields, files: file }))
  })

return
    let name = req.body.name
    let slug = req.body.slug
    let des = req.body.des
    let detail = req.body.detail
    let lan = req.body.lan
    let lon = req.body.lon
    let images = req.body.images
    let icon = req.body.icon
    let star = req.body.star
    let popular = req.body.popular
    let commend = req.body.commend
    let users = req.body.users
    let last_update = req.body.last_update
    let route = req.body.route
    let map_id = req.body.map_id

    if( name === '' || name === undefined ){
        res.json({
            "status" : false,
            "message" : 'Name is empty'
        })
        return
    }
    if(slug === '' || slug === undefined){
        res.json({
            "status" : false,
            "message" : 'Slug is empty'
        })
        return
    }
    if(des === '' || des === undefined){
        res.json({
            "status" : false,
            "message" : 'Des is empty'
        })
        return
    }
    if(detail === '' || detail === undefined){
        res.json({
            "status" : false,
            "message" : 'Detail is empty'
        })
        return
    }
    if(lan === '' || lan === undefined){
        res.json({
            "status" : false,
            "message" : 'Lan is empty'
        })
        return
    }
    if(lon === '' || lon === undefined){
        res.json({
            "status" : false,
            "message" : 'Lon is empty'
        })
        return
    }
    if(images === '' || images === undefined ){
        res.json({
            "status" : false,
            "message" : 'Image is empty'
        })
        return
    }
    if(icon === '' || icon === undefined){
        res.json({
            "status" : false,
            "message" : 'Icon is empty'
        })
        return
    }
    if(map_id === '' || map_id === undefined){
        res.json({
            "status" : false,
            "message" : 'Icon is empty'
        })
        return
    }else{
        await Admin_map.find({map_id : {$eq : map_id}})
        .then(async(ree)=>{
            console.log(ree.length)
            if(ree.length > 0 ){
                res.json({
                    "status" : false,
                    "message" : "Already Mapid is in the database"
                })
            }else{
                let one =  new Admin_map({
                    name : name,
                    slug : slug,
                    des : des ,
                    detail : detail ,
                    lan : lan ,
                    lon : lon ,
                    images : images , 
                    icon : icon ,
                    star : star ,
                    popular : popular ,
                    commend : commend ,
                    users : users ,
                    last_update : last_update ,
                    route : route ,
                    map_id : map_id
                })
                await one.save()
                .then((re)=>{
                    res.json({
                        "status" : true,
                        "message" : "Success"
                    })
                })
                .catch((err)=>{
                    res.json({
                        "status" : false,
                        "message" : "something went wrong"
                    })
                })
            }
        })
        .catch((err)=>{
            res.json({
                "status" : false,
                "message" : "something went wrong"
            })
            return
        })
    }
})


app.post("/admin_map_edit", async (req, res) => {

    let id = req.body.id

    let data = req.body.data

    if(data === '' || data === undefined){
        res.json({
            "status" : false,
            "message" : 'Data is empty'
        })
        return
    }

    if(id === '' || id === undefined){
        res.json({
            "status" : false,
            "message" : 'Id is empty'
        })
        return
    }

    await Admin_map.findOneAndUpdate({_id:id},{$set: data})
    .then((re)=>{
        res.json({
            "status" : true,
            "message" : "success"
        })
    })
    .catch((err)=>{
        res.json({
            "status" : false,
            "message" : "something went wrong"
        })
    })
})

app.post("/admin_map_delete", async (req, res) => {

    let id = req.body.id

    if(id === '' || id === undefined){
        res.json({
            "status" : false,
            "message" : 'Id is empty'
        })
        return
    }

    await Admin_map.remove({_id:id})
    .then((re)=>{
        res.json({
            "status" : true,
            "message" : "success"
        })
    })
    .catch((err)=>{
        res.json({
            "status" : false,
            "message" : "something went wrong"
        })
    })
})

// app.post("/message_admin_delete", async (req, res) => {

//     let id = req.body.id

//     let message = req.body.message

//     if(id === '' || id === undefined){
//         res.json({
//             "status" : false,
//             "message" : 'Id is empty'
//         })
//         return
//     }

//     if( message === '' || message === undefined){
//         res.json({
//             "status" : false,
//             "message" : 'Message is empty'
//         })
//         return
//     }
//     await Message.remove({id:id})
//     .then((resss)=>{
//         res.json({
//             "status" : true,
//             "message" : 'Message delete success',
//         })
//     })
//     .catch((err)=>{
//         res.json({
//             "status" : false,
//             "message" : 'Something went wrong'
//         })
//     })
// })

// app.post("/message_admin_show", async (req, res) => {

//     let id = req.body.id

//     let message = req.body.message

//     if(id === '' || id === undefined){
//         res.json({
//             "status" : false,
//             "message" : 'Id is empty'
//         })
//         return
//     }

//     if( message === '' || message === undefined){
//         res.json({
//             "status" : false,
//             "message" : 'Message is empty'
//         })
//         return
//     }
//     await Message.find()
//     .then((re)=>{
//         res.json({
//             "status" : true ,
//             "message" : re
//         })
//     })
//     .catch((err)=>{
//         res.json({
//             "status" : false,
//             "message" : "something went wrong"
//         })
//     })
// })

module.exports = app