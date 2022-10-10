const express = require('express')
const app = express.Router()
const mongoose = require('mongoose')

require('../models/admin_map')
require('../models/admin')

const Admin_map = mongoose.model("Admin_map")
const Admin = mongoose.model("Admin")

app.post("/admin_map_api", async (req, res) => {

    await Admin_map.find()
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

app.post("/admin_login", async (req, res) => {
  
  let name = req.body.name
  let password = req.body.password

    await Admin.find({
      name : name,
      password : password
    })
    .then((re)=>{
      if (re.length >0){
         res.json({
            "status" : true ,
            "message" : 'login success'
        })
      }else{
        res.json({
            "status" : false ,
            "message" : 'name or password is wrong'
        })
      }
    })
    .catch((err)=>{
        res.json({
            "status" : false,
            "message" : "something went wrong"
        })
    })

})

module.exports = app