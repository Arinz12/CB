import { Button } from "@mui/material"
import Head from "next/head"
import Link from "next/link"
import { useRef,useState } from "react"

const Login=()=>{
    const [failed,setFailed]=useState(false)
//     async function submit(){
// const res=await fetch("/login",{method:"post",body:JSON.stringify({email,password:pass}),headers:{"Content-Type":"application/json"}})
//     }
const val= async (e)=>{
    e.preventDefault();
    console.log("entered")
       try{
        const exist= await fetch("https://expert-memory-9774x9pr545ghvx5-3000.app.github.dev/api/valUser",
        {method:"post",body:JSON.stringify({email:document.getElementsByName("email")[0].value.trim().toLowerCase() ,password:document.getElementsByName("password")[0].value.trim()}),headers:{"Content-Type":"application/json"}});
      if(!exist.ok){
setFailed(true);
      setTimeout(()=>{setFailed(false)
    },3000)
      console.log("You are not in")
      return
      }
      e.target.submit();
      console.log("you are in...")
      return
      }

    catch(er){
        er.preventDefault()
        console.log("connect to the internet")
    }}

    return (
        <>
        <Head>
            <title>UC | Login</title>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Monomaniac+One&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet"/>
        </Head>

        <div style={{height:"100vh"}} className="md:flex-row md:ml-4 overflow-hidden relative flex md:justify-between items-center">
            <div className="gvr absolute top-1  right-2 text-orange-500  text-2xl ">UC PERFUME</div>

            {failed && <div className="bg-white rounded text-center absolute top-1 left-1 slide  p-5">
    <span className="text-red-500 rubik-b">wrong credentials provided</span>
</div>}

            {/* form */}
<form action={"https://expert-memory-9774x9pr545ghvx5-3000.app.github.dev/login"} method="post" onSubmit={val} autoComplete="off">
            <div className="p-4 rounded-sm overflow-hidden  flex flex-col slide2 gap-5">
                <span className="text-orange-500 text-xl rubik-h">Login</span>
{/* <label>Username:  <input className="p-3 rounded focus:outline-none text-black rubik-b" type="text" placeholder="John"/></label> */}
<label>Email: <input name={"email"} className="p-3 rounded focus:outline-none text-black rubik-b" type="email" placeholder="example@gmail.com"/></label>
{/* <label>Phone: <input className="p-3 rounded focus:outline-none text-black rubik-b" type="text" placeholder="000000000"/></label> */}
<label>Password: <input name={"password"} className="p-3 rounded focus:outline-none text-black rubik-b" type="password" placeholder="*****"/></label>
<Button type="submit" className="rubik-b" variant="contained" sx={{color:"white",textTransform:"none",backgroundColor:"#f97316"}}>Continue </Button>
<span className="">{"Don't"} have an account? <Link className="text-orange-400 rubik-b" href="/signup">Create</Link></span>


            </div>
</form>
<div></div>

        </div>
        </>
    )
}
export default Login