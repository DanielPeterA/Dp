const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({path:'./.env'})

const atlasurl = process.env.atlas_URL
const PORT = process.env.PORT || 8000

mongoose.connect(`${atlasurl}`,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("Moongoose is Connected Database ")}).catch((err)=>console.log(err));
const schemaModel = mongoose.Schema({
    name:String,
    id:String
})
const Schema = mongoose.model('notes',schemaModel)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.send('Express Running')
});

app.get('/userData',(req,res)=>{
    Schema.find({}).then((doc)=>{
        res.json(doc)
    }).catch((err)=>console.log(err))
})


app.listen(PORT,()=>{
    console.log("Express Connected");
})