const express = require('express')
const app = express()
const cors = require('cors');
const mongoose  = require('mongoose')
const dotenv = require('dotenv');

//register view engine
app.set('view engine','ejs')

//cross orgin
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
}

//middleware
app.use(cors(corsOptions))
dotenv.config();
mongoose.connect(process.env.Db_connect,{ useNewUrlParser: true,useUnifiedTopology: true},() => {
    console.log('conected to dp')
});   
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongoo")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

app.use(express.json())

app.get('/', (req, res) => {
    res.render('index')
})

//admin panel
app.use(require('./src/routes/login_master'))
app.use(require('./src/routes/admin_api'))

//web

app.use(require('./src/routes/home_api'))

app.listen(process.env.port,()=>console.log('Server up and running',process.env.port));

