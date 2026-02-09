// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
require("dotenv").config()
export default function handler(req, res) {
  console.log("ip detected ",req.headers['x-forwarded-for'])
  if(req.method=="POST" && req.headers["what"]==process.env.RC){
  res.json({message:"successfull"})}
  else{
    res.json({message:"failed"})
  }
  res.end()
}
