require("dotenv").config()
const mongoose=require("mongoose")
mongoose.set("strictQuery",false)
const schema= new mongoose.Schema({
  Email:{type:String,unique:true},
  Username:{type:String,unique:false},
  Phonenumber:{type:String,unique:true},
  Password:{type:String,unique:true},
  Admin:{type:Boolean},
  Cart:{type:[{
    Status:{type:String,default:""},
    Product:{type:String,default:""},
  }]}
})
const User=mongoose.models.User||mongoose.model("User",schema)
module.exports=User