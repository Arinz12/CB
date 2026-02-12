require("dotenv").config()
const mongoose=require("mongoose")
mongoose.set("strictQuery",false)
const schema= new mongoose.Schema({
  Email:{type:String,unique:false},
  Username:{type:String,unique:false},
  Phonenumber:{type:String,unique:true},
})
const User=mongoose.models.Email||mongoose.model("User",schema)
module.exports={User}