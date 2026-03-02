require("dotenv").config()
const express = require('express');
const next = require('next');
const mongoose=require("mongoose");
const Items = require("./Collections/items");
const { duration } = require("@mui/material");
const multer = require("multer");
const bcrypt=require("bcrypt")
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
const path=require("path");
const { Emails } = require("./Collections/emails");
const passport=require("passport")
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore=require("connect-mongo");
const cookieParser = require('cookie-parser');
const { User } = require("./Collections/users");



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
if(req.isAuthenticated()){
  return res.redirect("/dashboard");
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
  store: MongoStore.create(
    {
     mongoUrl:process.env.DATABASEURL,
     collectionName:"sessionsofusers",
     ttl: 1 * 24 * 60 * 60,  // Session TTL in MongoDB (1 day)
autoRemove:"native",
  }
),
  secret: 'Niceone',
  resave: false,
  saveUninitialized: false,
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

login

server.post("/login",logged,passport.authenticate("local",{
  failureRedirect:"/signup",
  successRedirect:"/products"
}))
//signup
server.post("/signup",async (req,res)=>{
  console.log("body",req.body)
  const {email,pho,pass}=req.body;
  res.end()
} )
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

  // All other routes are handled by Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });


  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
})