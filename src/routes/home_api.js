const express = require('express')
const app = express.Router()
const mongoose = require('mongoose')

require('../models/admin_map')
require('../models/profile')

const Admin_map = mongoose.model("Admin_map")
const Profile = mongoose.model("Profile")

app.post("/home_map_api", async (req, res) => {

    await Admin_map.findOne({status : 1 })
    .then((re)=>{
        res.json({
            "status" : true ,
            "message" : re
        })
    })
    .catch((err)=>{
        res.json({
            "status" : false,
            "message" : "something went wrong"
        })
    })

})

app.post("/profile", async (req, res) => {

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
    await Profile.findOneAndUpdate({_id:id},{$set: data})
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

app.post("/message_map", async (req, res) => {

    let id = req.body.id

    let mapid = req.body.mapid

    let name = req.body.name

    let message = req.body.message

    let image = req.body.image

    if(id === '' || id === undefined){
        res.json({
            "status" : false,
            "message" : 'Id is empty'
        })
        return
    }
    if(message === '' || message === undefined){
        res.json({
            "status" : false,
            "message" : 'meassage is empty'
        })
        return
    }
    await Admin_map.updateOne({_id:id},
        {
            $push : {
                commends :  {
                        mapid : mapid,
                        name : name ,
                        message : message,
                        image : image
                    } 
                }
            })
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

module.exports = app