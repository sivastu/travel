const express = require('express')
const app = express.Router()
const mongoose = require('mongoose')

require('../models/login')
require('../models/admin_map')
require('../models/profile')

const Login = mongoose.model("Login")
const Admin_map = mongoose.model("Admin_map")
const Profile = mongoose.model("Profile")



app.post("/login", async (req, res) => {

    //parameter    phone

    let phone = req.body.phone

    let otp = Math.random().toString().substr(2, 6)
    
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
        return result;
    }

    let name = makeid(8)
    

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
        else{
            const one =  new Login({
                phone : phone,
                otp : otp
            })
            await one.save()

            //error


            // .then(async(res)=>{
            //     await Profile.find({name : { $eq : name }})
            //     .then(async(ree)=>{
            //         if(ree.length > 0){
            //             let name = makeid(8)
            //         }

            //         if(ree.length > 0 ){
            //             const Profiless = new Profile({
            //                 name : name
            //             })
            //             await Profiless.save()
            //             .then((fo)=>{
            //                 res.json({
            //                     "status" : true,
            //                     "message" : 'Pro sus',
            //                     "otp" : otp
            //                 })
            //             })
            //             .catch((errs)=>{
            //                 res.json({
            //                     "status" : false,
            //                     "message" : "something went wrong1"
            //                 })
            //             })
            //         }else{
            //             res.json({
            //                 "status" : false,
            //                 "message" : "something went wrong2"
            //             })
            //         }
            //     })
            // })
            // .catch((errs)=>{
            //     res.json({
            //         "status" : false,
            //         "message" : "something went wrong3",
            //         "err" : errs
            //     })
            // })
        }
    })
});

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
});

app.post("/admin_map", async (req, res) => {

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

});


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
});

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
});

module.exports = app