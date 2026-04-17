require("dotenv").config()
const express = require('express');
const next = require('next');
const mongoose=require("mongoose");
const Items = require("./Collections/items");
const { duration } = require("@mui/material");
const multer = require("multer");
const cors=require("cors")
const bcrypt=require("bcrypt")
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
const path=require("path");
const { Emails } = require("./Collections/emails");
const passport=require("passport")
const session = require('express-session');
const {DateTime} =require("luxon")
const LocalStrategy = require('passport-local').Strategy;
const MongoStore=require("connect-mongo");
const cookieParser = require('cookie-parser');
const User = require("./Collections/users");
const Order = require("./Collections/orders");
const sendEmailAdmin = require("./SvrFuncs/notify");
const sendd = require("./SvrFuncs/mailSender");
const { Flid, updateFlid } = require("./Collections/FlutterwaveIds");
const vet = require("./SvrFuncs/verifyT");



const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});


//DB CONNECT
mongoose.connect(process.env.DATABASEURL , {
   serverSelectionTimeoutMS:5000,
   socketTimeoutMS:45000
   }).then(() => {console.log('MongoDB FOR UC PERFUMES connected successfully');
}).catch(err => console.error('MongoDB connection error:', err));

 const logged=(req,res,next)=>{
if(req.isAuthenticated()&&req.user.Email==req.body.email){
  return res.redirect("/product");
}
else{
  next();
}
  }

app.prepare().then(() => {
  const server = express();

  // Express middleware
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  server.use(session(
    {
      secret: 'Niceone',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create(
    {
     mongoUrl:process.env.DATABASEURL,
     collectionName:"sessionsofusers",
     ttl: 1 * 24 * 60 * 60,  // Session TTL in MongoDB (1 day)
autoRemove:"native",
  }
),
  
cookie:{
  httpOnly:true,
  sameSite:"lax",
  maxAge: 2*12*3600 * 1000,  // Cookie expires 
  secure:false,
  path:"/"
}
})
);

server.use(passport.initialize());
server.use(passport.session());
passport.use(new LocalStrategy({
  usernameField: 'email'},
  async (username, password, done) => {
    try {
      // Step 1: Find the user by username
      const user = await User.findOne({ Email:username.trim().toLowerCase()});

      // Step 2: If user doesn't exist, return an error
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const isit= bcrypt.compareSync(password,user.Password)
      // Step 3: Compare the provided password with the stored hash
      //const isMatch = await user.comparePassword(password);

      // Step 4: If passwords don't match, return an error
      if (!isit) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      // Step 5: Authentication successful, return the user object
      return done(null, user);
    } catch (err) {
      console.log(" Error From passport auth")
      return done(err);
    }
  }
));
passport.serializeUser((user, done) => {
  done(null, user.id); // Store only the user ID in the session
});
// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Fetch user from DB by ID
    done(null, user); // Attach the full user object to the request as req.user
  } catch (err) {
    done(err);
  }
});

//login

server.post("/login",logged,passport.authenticate("local",{
  failureRedirect:"/signup",
  successRedirect:"/products"
}))
//signup
server.post("/signup",async (req,res)=>{
  console.log("body",req.body)
  const {email,phone,password,usn}=req.body;
  await User.create(
    {
      Email:email,
      Username:usn,
      Phonenumber:phone,
      Password:bcrypt.hashSync(password,10),
      Admin:false
    }
  ).then(()=>{
    console.log("A user has been saved")
    res.status(200).end()
  }).catch(()=>{
    console.log("A user failed to save")
    res.status(400).end()
  })
  res.end()
} )

//check login details
server.post("/api/valUser",async (req,res)=>{
const {email,password}=req.body;
const userAgentParser = require('ua-parser-js'); 
//get ip info
let ipInfoo
let browserName
try{
const query= req.headers['x-forwarded-for'];
const agent=req.headers["user-agent"]||"";
const ua =userAgentParser(agent)
browserName = ua.browser.name
console.log("Ip is",query)
const ipInfo= await fetch(`http://ip-api.com/json/${query}`,{method:"Get"})
 ipInfoo= await ipInfo.json()}
catch(e){
  console.log("error at finding ip at /ValUser",e)
ipInfoo={regionName:"Not found"}
}
try{
const detail= await User.findOne({Email:email});
//This logs a user found
 //console.log(detail);

if(detail){
  if(!bcrypt.compareSync(password,detail.Password)){
    return res.status(400).send("verification failed")
  }
 
  
  console.log("verified..");
  return res.status(200).send("verified");
}
else{
  console.log("Not verified")
  return res.status(400).send("verification failed")
}}
catch(e){
  console.log("connection error: "+e)
}
  })

//validate signup info
server.post("/validate",async (req,res)=>{
    const {email,phone,password,usn}=req.body;
  const resp= await User.findOne({$or:[
    {Email:email},
    {Phonenumber:phone},
    {Username:usn}
  ]})

if(resp){
  console.log(resp)
  console.log("Data already existing in DB")
  if(email==resp.Email){
  return res.status(400).json({email:true})}
  else if(phone==resp.Phonenumber){
      return res.status(400).json({phone:true})}
else{
       return res.status(400).json({usn:true})

}
  }

else{
  res.status(200).end()
}
})

  // Custom API routes (Express)
  server.get('/api/test', (req, res) => {
    res.json({ message: 'This is a backend test and it was successfull' });
  });

//ADD an item
server.post("/api/additem",upload.single('image'), async (req,res)=>{
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const baseUrlInterim="https://expert-memory-9774x9pr545ghvx5-3000.app.github.dev"
   const imageUrl = `${baseUrlInterim}/uploads/${req.file.filename}`;
console.log("Item wants to be added")
console.log(req.body);
const {name,longevity,brand,price,description,volume,available,}=req.body;
await Items.create(
  {
Name:name,
Image:imageUrl,
Longevity:longevity,
Brand:brand,
Price:price,
Description:description,
Volume:volume,
Available:available,
Uid:Math.random().toString(36).substring(2, 11)
  }
).then(()=>{
  console.log("An item has been successfully added")
   res.status(200)
   res.end()
}).catch((e)=>{
  console.log("Item adding failed",e)
  res.status(400)
  res.end()
});
return res.status(400).end();
}
)

//Email newsletter subscribption
server.post("/api/subscribe",async (req,res)=>{
  console.log("server on",req.body.email)
  await Emails.create({
    Email:req.body.email
}).then(()=>{return res.status(200).end()})
.catch(()=>{return res.status(400).end()})
res.end()
}
)

//Add to cart
server.post("/addtocart",async (req,res)=>{
  console.log("body",req.body)
  if(req.isAuthenticated()){
await User.updateOne({Email:req.user.Email},{
  $push:{
    Cart:{
      Status:"Pending",
      Product:req.body.id,
    }
  }
}).then(()=>{
  console.log("An item was added to cart")
  return res.status(200).end()
}).catch((e)=>{
console.log("AN error occured",e)
  return res.status(400).end()
})
  }
  else{
    console.log("log in first")
  return res.status(400).end()
  }
})
//remove from cart
server.post("/removefromcart",async(req,res)=>{
  
   console.log("body",req.body)
  if(req.isAuthenticated()){
await User.updateOne({Email:req.user.Email},{
  $pull:{
    Cart:{Product:req.body.id}
    }
  }
).then(()=>{
  console.log("An item was removed from cart")
  return res.status(200).end()
}).catch((e)=>{
console.log("AN error occured",e)
  return res.status(400).end()
})
  }
  else{
    console.log("log in first")
  return res.status(400).end()
  }
})


//confirm payment webhook

server.post("/done",cors(),async (req,res)=>{
  console.log("done path has been entered")
  // Here req.body.data is ued to check requests coming from outside Billsly frontend
  // console.log(req);
//check if request came from a webhook
  if(req.body.data&&!req.isAuthenticated()){
    console.log("request came from a webhook flutterwave to be supposed")
  if((req.headers["verif-hash"]!=="ariwa"||!req.headers["verif-hash"])){
    console.log("correct header was not passed");
    return res.status(200).end()
  }}
  //handle failed transactions
  if(req.body.data&&!req.isAuthenticated()){
  if(req.body.data.status!="successful"){
    sendd("igwebuikea626@gmail.com",`This order txn failed for ${req.body.data.customer.email}`,undefined,"order Failure")
return res.status(200).end()
  }} 
  else{
    if(!req.isAuthenticated()){
      return res.end()}
  }
  let userEmail;
      userEmail= (req.isAuthenticated())? req.user.Email : req.body.data.customer.email
  let tx_ref;
  let transaction_id;
  let usernow;
  if(!req.isAuthenticated()){
   usernow=await User.findOne({Email:req.body.data.customer.email})}
   console.log("USERPASSPORT",usernow)
  const Id = (req.isAuthenticated())? mongoose.Types.ObjectId(req.user._id): usernow._id;
  console.log(Id)
  if(req.body.data&&!req.isAuthenticated()){
    tx_ref=req.body.data.tx_ref;
    transaction_id= req.body.data.id;
  }else{
   tx_ref=req.body.tx_ref;
 transaction_id= req.body.transaction_id;}
  console.log(tx_ref)
  //check if id has been verified before.
  let flidObj;
  flidObj=await Flid.findOne({Customer:userEmail})
  if(!flidObj){
    await Flid.create({
      Customer:userEmail,
      Ids:[]
  })
  console.log(userEmail+" "+"history id has been created")
  }
  flidObj=await Flid.findOne({Customer:userEmail})
  if(flidObj.Ids.includes(transaction_id)){
    console.log("This transaction has already been settled")
    sendd("igwebuikea626@gmail.com","An already verified txn_id  attempted to be verified",undefined,"Duplicate pay-ver alert")
   return  res.status(200).json({message:"this transaction has alrady been settled"})
  }
  console.log(transaction_id)
    try{
     const resss= await vet(tx_ref,transaction_id,Id,userEmail);
     if(resss=="success"){
                await  updateFlid(userEmail,transaction_id);

    console.log("oredr completed")
  res.status(200).json({message:"Payment successfull"})}
  else{
        res.status(500).json({message:"payment failed..."})

  }
  }
  catch(e){
console.log("Error caught...",e)
    res.status(500).json({message:"payment failed..."})
  } 
  
})
//place an order after payment has been confirmed


server.post("/order",cors(),async (req,res)=>{
  console.log("order receieved...")
  const id=Math.random().toString(36).substring(2, 11);
  const {productInfo,state,address,user,phone}=req.body
  //create message
   const message= `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Order Notification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
        .header {
          background-color: #f97316;
          color: white;
          padding: 15px;
          text-align: center;
          border-radius: 5px;
          margin-bottom: 20px;
        }
        .order-details {
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          margin-bottom: 20px;
        }
        .detail-row {
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid #eee;
        }
        .label {
          font-weight: bold;
          display: inline-block;
          width: 120px;
          color: #555;
        }
        .value {
          display: inline-block;
          color: #333;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #777;
          margin-top: 20px;
          padding-top: 10px;
          border-top: 1px solid #ddd;
        }
        .badge {
          display: inline-block;
          background-color: #4CAF50;
          color: white;
          padding: 3px 8px;
          border-radius: 3px;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🛒 New Order Received!</h2>
          <p>OrderId ${id}</p>
        </div>
        
        <div class="order-details">
          <h3>Order Details</h3>
          
          <div class="detail-row">
            <span class="label">Order ID:</span>
            <span class="value">${id}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Customer Email:</span>
            <span class="value">${user}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Phone Number:</span>
            <span class="value">${phone}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Order Date:</span>
            <span class="value">${DateTime.local().setZone("Africa/Lagos").toFormat('LLLL dd, yyyy')}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Delivery Location:</span>
            <span class="value">${address}</span>
          </div>

          <div class="detail-row">
            <span class="label">Delivery State:</span>
            <span class="value">${state}</span>
          </div>
          
          
            <div class="detail-row">
              <span class="label">Items:</span>
              <span class="value"><b>
                ${productInfo.map(item => `${item.productId} x${item.quantity}`).join('<br />')}</b>
              </span>
            </div>
         
          
          
            <div class="detail-row">
              <span class="label">Total Amount:</span>
              <span class="value"> ${productInfo.reduce((sum, product) => sum + parseInt(product.price), 0)} NGN</span>
            </div>
          
        </div>
        
        <div class="footer">
          <p>This is an automated notification. Please process this order promptly.</p>
          <p>© ${new Date().getFullYear()} D&G Signature</p>
        </div>
      </div>
    </body>
    </html>
  `
  console.log(productInfo)
  try{
for (const a of productInfo){
await Order.updateOne({User:user,Uid:id},
  {
$push:{
  Purchase:{
    Product:a.productId,Quantity:a.quantity
  },
  
},
 $set: {    
      Uid:id,
      Date:DateTime.local().setZone("Africa/Lagos").toFormat('LLLL dd, yyyy hh:mm a'),
      State:state,
      Address:address
   },
    $inc:{
Total:a.price
    }
},{upsert:true});
  }
  sendEmailAdmin(message,"arize1524@gmail.com")
  res.status(200).end("ok")
}
catch(e){
  console.log("failed",e)
  res.end()
}
})
//find product
server.post("/find",async (req,res)=>{
  console.log("looking for product...",req.body.pid)
  const {pid}=req.body
  try{
  const item=await Items.findOne({Uid:pid})
 if(item){
  return res.status(200).json(item)
  }
  else{
    console.log("not found")
      res.status(404).end

  }
  }
catch(e){
  console.log(e)
  res.status(404).end
}
res.end()

})

//discount price of items
server.post("/discount",async (req,res)=>{
  console.log("body",req.body)
  const {itemId,discount}=req.body
  if(!itemId){
    await Items.updateMany({},{$set: {Discount:discount}},{strict:false}).then(()=>{
      return res.status(200).end()
    }).catch(()=>{ return res.status(400).end()})
  }
  else{
  await Items.updateOne({Uid:itemId},{$set:{Discount:discount}},{strict:false}).then((e)=>{
    // console.log(e)
      return res.status(200).end()
    }).catch((e)=>{ 
      // console.log(e)
      return res.status(400).end()})}
  
})

  // All other routes are handled by Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });


  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
})