require("dotenv").config()
const express = require('express');
const next = require('next');
const mongoose=require("mongoose");
const Items = require("./Collections/items");
const { duration } = require("@mui/material");
const multer = require("multer");
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
const path=require("path")


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

app.prepare().then(() => {
  const server = express();

  // Express middleware
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

  // All other routes are handled by Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });


  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
})