const express = require('express')
const app = express.Router()
const mongoose = require('mongoose')

require('../models/login')
require('../models/banner')
require('../models/prodect')
require('../models/addtocart')
require('../models/address')

const Login = mongoose.model("Login")
const Banner = mongoose.model("Banner")
const Prodect = mongoose.model('Prodect')
const Addtocart = mongoose.model('Addtocart')
const Address = mongoose.model('Address')



app.post("/login", async (req, res) => {

    //parameter    phone

    let phone = req.body.phone

    let otp = Math.random().toString().substr(2, 6)

    if(req.body.phone === ''){
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
                phone,
                otp : otp
            })
            await one.save()
            res.json({
                "status" : true,
                "message" : 'Otp',
                "otp" : otp
            })
        }
    })
});

app.post("/otp", async (req, res) => {

    let otp = req.body.otp

    let phone = req.body.phone

    if(otp === ''){
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

app.post("/banner", async (req, res) => {
    Banner.find()
    .then((ress)=>{
        if(ress.length === 0 ){
            Banner.insertMany([{banner : 'https://images.unsplash.com/photo-1506765515384-028b60a970df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'} , {banner : 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'} , {banner : 'https://images.unsplash.com/photo-1579547621869-0ddb5f237392?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'}])
            .then((resss)=>{
                res.json({
                    "status" : true,
                    "message" : resss
                })
            })
        }else{
            res.json({
                "status" : true,
                "message" : ress
            })
        }
    })
});

app.post("/prodect", async (req, res) => {
    Prodect.find()
    .then((ress)=>{
        if(ress.length === 0 ){
            Prodect.insertMany([
            {
                pro_name : 'samsung A03 4gb 64gb',
                pro_des : 'Samsung Galaxy A03 Blue, 3GB RAM, 32GB Storage with No Cost EMI/Additional Exchange Offers',
                amount : 20000,
                offer : '10',
                img : 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a03.jpg',
                pro_cat : 'phone',
                pro_detail : '<table class="a-normal a-spacing-micro">  <tbody><tr class="a-spacing-small po-brand"> <td class="a-span3"> <span class="a-size-base a-text-bold">Brand</span> </td> <td class="a-span9">    <span class="a-size-base">Samsung</span>   </td> </tr>  <tr class="a-spacing-small po-model_name"> <td class="a-span3"> <span class="a-size-base a-text-bold">Model Name</span> </td> <td class="a-span9">    <span class="a-size-base">Samsung Galaxy A03</span>   </td> </tr>  <tr class="a-spacing-small po-wireless_provider"> <td class="a-span3"> <span class="a-size-base a-text-bold">Network Service Provider</span> </td> <td class="a-span9">    <span class="a-size-base">Unlocked for All Carriers</span>   </td> </tr>  <tr class="a-spacing-small po-operating_system"> <td class="a-span3"> <span class="a-size-base a-text-bold"> OS </span> </td> <td class="a-span9">    <span class="a-size-base">Android 11</span>   </td> </tr>  <tr class="a-spacing-small po-cellular_technology"> <td class="a-span3"> <span class="a-size-base a-text-bold">Cellular Technology</span> </td> <td class="a-span9">    <span class="a-size-base">LTE</span>   </td> </tr>  </tbody></table>',
                popular : 100,
                like: 100
            } , {
                pro_name : 'vivo A05 4gb 64gb siva',
                pro_des : 'Samsung Galaxy A03 Blue, 3GB RAM, 32GB Storage with No Cost EMI/Additional Exchange Offers',
                amount : 2000,
                offer : '1',
                img : 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a03.jpg',
                pro_cat : 'phone',
                pro_detail : '<table class="a-normal a-spacing-micro">  <tbody><tr class="a-spacing-small po-brand"> <td class="a-span3"> <span class="a-size-base a-text-bold">Brand</span> </td> <td class="a-span9">    <span class="a-size-base">Samsung</span>   </td> </tr>  <tr class="a-spacing-small po-model_name"> <td class="a-span3"> <span class="a-size-base a-text-bold">Model Name</span> </td> <td class="a-span9">    <span class="a-size-base">Samsung Galaxy A03</span>   </td> </tr>  <tr class="a-spacing-small po-wireless_provider"> <td class="a-span3"> <span class="a-size-base a-text-bold">Network Service Provider</span> </td> <td class="a-span9">    <span class="a-size-base">Unlocked for All Carriers</span>   </td> </tr>  <tr class="a-spacing-small po-operating_system"> <td class="a-span3"> <span class="a-size-base a-text-bold"> OS </span> </td> <td class="a-span9">    <span class="a-size-base">Android 11</span>   </td> </tr>  <tr class="a-spacing-small po-cellular_technology"> <td class="a-span3"> <span class="a-size-base a-text-bold">Cellular Technology</span> </td> <td class="a-span9">    <span class="a-size-base">LTE</span>   </td> </tr>  </tbody></table>',
                popular : 60,
                like: 10

            } , {
                pro_name : 'samsung A04 4gb 64gb',
                pro_des : 'Samsung Galaxy A03 Blue, 3GB RAM, 32GB Storage with No Cost EMI/Additional Exchange Offers',
                amount : 30000,
                offer : '5',
                img : 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a03.jpg',
                pro_cat : 'phone',
                pro_detail : '<table class="a-normal a-spacing-micro">  <tbody><tr class="a-spacing-small po-brand"> <td class="a-span3"> <span class="a-size-base a-text-bold">Brand</span> </td> <td class="a-span9">    <span class="a-size-base">Samsung</span>   </td> </tr>  <tr class="a-spacing-small po-model_name"> <td class="a-span3"> <span class="a-size-base a-text-bold">Model Name</span> </td> <td class="a-span9">    <span class="a-size-base">Samsung Galaxy A03</span>   </td> </tr>  <tr class="a-spacing-small po-wireless_provider"> <td class="a-span3"> <span class="a-size-base a-text-bold">Network Service Provider</span> </td> <td class="a-span9">    <span class="a-size-base">Unlocked for All Carriers</span>   </td> </tr>  <tr class="a-spacing-small po-operating_system"> <td class="a-span3"> <span class="a-size-base a-text-bold"> OS </span> </td> <td class="a-span9">    <span class="a-size-base">Android 11</span>   </td> </tr>  <tr class="a-spacing-small po-cellular_technology"> <td class="a-span3"> <span class="a-size-base a-text-bold">Cellular Technology</span> </td> <td class="a-span9">    <span class="a-size-base">LTE</span>   </td> </tr>  </tbody></table>',
                popular : 10,
                like: 1000

            }
            ])
            .then((resss)=>{
                res.json({
                    "status" : true,
                    "message" : resss
                })
            })
        }else{
            res.json({
                "status" : true,
                "message" : ress
            })
        }
    })
});


app.post("/popular", async (req, res) => {
    Prodect.find({popular : { $gte : 70 }})
    .then((ress)=>{
        res.json({
            "status" : true,
            "message" : ress
        })
    })
    .catch((err)=>{
        res.json({
            "status" : false,
            "message" : err
        })
    })
});

app.post("/best", async (req, res) => {
    Prodect.find({popular : { $gte : 10 }})
    .then((ress)=>{
        res.json({
            "status" : true,
            "message" : ress
        })
    })
    .catch((err)=>{
        res.json({
            "status" : false,
            "message" : err
        })
    })
});

app.post("/search", async(req,res)=>{
    let seearch = req.body.search
    if(seearch === undefined){
        res.json({
            "status" : false,
            "message" : 'The Search field is empty'
        })
    }
    await Prodect.find({$text : { $search: seearch }})
    .then((ress)=>{
        res.json({
            "status" : true,
            "message" : ress
        })
    })
    .catch((err)=>{
        res.json({
            "status" : false,
            "message" : 'No Items is there'
        })
    })
})

app.post("/addtocart" , async (req,res) => {
    let ids = req.body.pro_ids
    let count = req.body.count
    let userid = req.body.userid
    if(ids === undefined || count === undefined || userid === undefined ){
        res.json({
            "status" : false,
            "message" : 'Something Went Wrong'
        })
    }
    await Addtocart.create({
        count : count,
        pro_id : ids,
        user_id : userid
    })
    .then((r)=>{
        res.json({
            "status" : true,
            "message" : 'Prodect Added Successfully'
        })
    })
    .catch((err)=>{
        res.json({
            "status" : false,
            "message" : 'Something Went Wrong'
        })
    })
})

app.post("/address" , async (req,res) => {
    let country = req.body.country
    let pin = req.body.pin
    let address = req.body.address
    let user_id = req.body.user_id

    if(user_id === undefined || pin === undefined || address === undefined ){
        res.json({
            "status" : false,
            "message" : 'Something Went Wrong'
        })
    }
    await Address.create({
        country : country,
        pin : pin,
        address : address,
        user_id : user_id
    })
    .then((r)=>{
        res.json({
            "status" : true,
            "message" : r
        })
    })
    .catch((err)=>{
        res.json({
            "status" : false,
            "message" : 'Something Went Wrong'
        })
    })
})

app.post("/updateaddress" , async (req,res) => {
    let country = req.body.country
    let pin = req.body.pin
    let address = req.body.address
    let user_id = req.body.user_id

    if(user_id === undefined || pin === undefined || address === undefined ){
        res.json({
            "status" : false,
            "message" : 'Something Went Wrong'
        })
    }
    await Address.updateOne({user_id : user_id},{
        country : country,
        pin : pin,
        address : address
    })
    .then((r)=>{
        res.json({
            "status" : true,
            "message" : 'Address Updated Successfully'
        })
    })
    .catch((err)=>{
        res.json({
            "status" : false,
            "message" : 'Something Went Wrong'
        })
    })
})

app.post("/deleteaddress" , async (req,res) => {
    let country = req.body.country
    let pin = req.body.pin
    let address = req.body.address
    let user_id = req.body.user_id

    if(user_id === undefined || pin === undefined || address === undefined ){
        res.json({
            "status" : false,
            "message" : 'Something Went Wrong'
        })
    }
    await Address.updateOne({user_id : user_id},{
        country : country,
        pin : pin,
        address : address
    })
    .then((r)=>{
        res.json({
            "status" : true,
            "message" : 'Address Updated Successfully'
        })
    })
    .catch((err)=>{
        res.json({
            "status" : false,
            "message" : 'Something Went Wrong'
        })
    })
})

module.exports = app