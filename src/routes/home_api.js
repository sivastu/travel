const express = require('express')
const app = express.Router()
const mongoose = require('mongoose')

require('../models/admin_map')

const Admin_map = mongoose.model("Admin_map")

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


module.exports = app