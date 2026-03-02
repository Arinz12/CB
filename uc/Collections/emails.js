require("dotenv").config()
const mongoose=require("mongoose")
mongoose.set("strictQuery",false)
const schema= new mongoose.Schema({
  Email:{type:String,unique:false}  
})
const Emails=mongoose.models.Emails || mongoose.model("Emails",schema)
module.exports={Emails}