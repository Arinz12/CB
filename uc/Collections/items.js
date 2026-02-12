require("dotenv").config()
const mongoose=require("mongoose")
mongoose.set("strictQuery",false)
const schema=new mongoose.Schema({
    Name:{type:String,unique:false},
    Image:{type:String,unique:false},
    Longevity:{type:String,unique:false},
    Brand:{type:String,unique:false},
    Price:{type:String,unique:false},
    Description:{type:String,unique:false},
    Volume:{type:String,unique:false},
    Availabe:{type:String,unique:false},
})
const Items= mongoose.models.perfumes|| mongoose.model("Items",schema)
module.exports=Items;