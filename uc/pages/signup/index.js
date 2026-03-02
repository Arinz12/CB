import { Button } from "@mui/material"
import Head from "next/head"
import Link from "next/link"
import { useRef } from "react"

const Signup=()=>{
    const email=useRef("");
    const pho=useRef("");
    const pass=useRef("");
    const usn=useRef("");

     async function submit(){
const res=await fetch("https://expert-memory-9774x9pr545ghvx5-3000.app.github.dev/signup",{method:"post",body:JSON.stringify({email,password:pass,phone:pho,usn}),headers:{"Content-Type":"application/json"}})
    if(res.ok){
console.log("successfull signup")
    }
    else{
        console.log("failed to signup")
    }}

    return (
        <>
        <Head>
            <title>UC | Sign up</title>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Monomaniac+One&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet"/>
        </Head>

        <div style={{height:"100vh"}} className="md:flex-row md:ml-4 relative overflow-hidden flex md:justify-between items-center">
            <div className="gvr absolute top-1 right-2 text-orange-500  text-2xl ">UC PERFUME</div>

            {/* form */}
            <div className="p-4 rounded-sm overflow-hidden  flex flex-col slide2 gap-5">
                <span className="text-orange-500 text-xl rubik-h">Create an Account</span>
<label>Username:  <input ref={usn} className="p-3 rounded focus:outline-none text-black rubik-b" type="text" placeholder="John"/></label>
<label>Email: <input ref={email} className="p-3 rounded focus:outline-none text-black rubik-b" type="email" placeholder="example@gmail.com"/></label>
<label>Phone: <input ref={pho} className="p-3 rounded focus:outline-none text-black rubik-b" type="text" placeholder="000000000"/></label>
<label>Password: <input ref={pass} className="p-3 rounded focus:outline-none text-black rubik-b" type="password" placeholder="*****"/></label>
<Button onClick={submit} className="rubik-b" variant="contained" sx={{color:"white",textTransform:"none",backgroundColor:"#f97316"}}>Create </Button>
<span className="">Already have an account? <Link className="text-orange-400 rubik-b" href="/login">login</Link></span>

            </div>

<div></div>

        </div>
        </>
    )
}
export default Signup