require("dotenv").config()
const mongoose=require("mongoose")
mongoose.set("strictQuery",false)
const schema=new mongoose.Schema({
    Uid:{type:String,unique:true},
    User:{type:String},
    PhoneNumber:{type:String},
    Purchase:{type:[
{
    Product:{type:String},
    Quantity:{type:Number}
}
    ]},
    Status:{type:String,default:"pending"
    },
    Total:{type:Number},
    Date:{type:String}
})
const Order= mongoose.models.Order|| mongoose.model("Order",schema)
module.exports=Order;