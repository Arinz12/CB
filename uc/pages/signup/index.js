import { Button } from "@mui/material"
import Head from "next/head"
import Link from "next/link"
import { useRef,useState } from "react"

const Signup=()=>{
    const email=useRef("");
    const pho=useRef("");
    const pass=useRef("");
    const usn=useRef("");
    const msg=useRef("");
    const umsg=useRef("");
    const emsg=useRef("")
    const pmsg=useRef("")
    const passmsg=useRef("")
    const [valid,setValid]=useState(false)

    const [success,setSuccess]=useState(false)

    const [failed,setFailed]=useState(false)


    function checkValidity(){
        if(pass.current.value&&usn.current.value&&email.current.value&&pho.current.value){
            setValid(true)
        }
        else{
                        setValid(false)

        }
    }

     async function submit(){
       
        //check if email is existing
        const res1=await fetch("https://expert-memory-9774x9pr545ghvx5-3000.app.github.dev/validate",{method:"post",body:JSON.stringify({email:email.current.value,phone:pho.current.value,usn:usn.current.value}),headers:{"Content-Type":"application/json"}})
        if(!res1.ok){
            const ress= await res1.json()
                            msg.current.parentNode.classList.remove("hidden")
                         msg.current.parentNode.classList.add("block")


            if(ress.email){
                            
msg.current.innerHTML="Email already exists"
            }
            else if(ress.usn){
msg.current.innerHTML="Username already exists"
            }
            else{

msg.current.innerHTML="Phonenumber already exists"
            }
            setTimeout(() => {
                msg.current.parentNode.classList.add("hidden")
}, 3000);
return}
        
const res=await fetch("https://expert-memory-9774x9pr545ghvx5-3000.app.github.dev/signup",{method:"post",body:JSON.stringify({email:email.current.value,password:pass.current.value,phone:pho.current.value,usn:usn.current.value}),headers:{"Content-Type":"application/json"}})
    if(res.ok){
console.log("successfull signup")
setSuccess(true)
setTimeout(() => {
    setSuccess(false)
}, 3000);
    }
    else{
        console.log("failed to signup")
        setFailed(true)
setTimeout(() => {
    setFailed(false)
}, 3000)
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
{success && <div className="bg-white rounded text-center absolute top-1 left-1 slide  p-5">
    <span className="text-orange-500 rubik-b">You have successfully created an account <br/>
    proceed to login
    </span>
</div>}
{failed && <div className="bg-white rounded text-center absolute top-1 left-1 slide  p-5">
    <span className="text-red-500 rubik-b">failed to create an account</span>
</div>}
{ <div  className="bg-white rounded text-center absolute top-1 hidden left-1 slide  p-5">
    <span  ref={msg} className="text-red-500 rubik-b"></span>
</div>}
            {/* form */}
            <div className="p-4 rounded-sm overflow-hidden  flex flex-col slide2 gap-5">
                <span className="text-orange-500 text-xl rubik-h">Create an Account</span>
<label>Username:  <input 
onKeyUp={
    ()=>{
if(usn.current.value.length<4
){
    umsg.current.innerHTML="Username must be up to 4 characters"
    setValid(false)
}
else{
        umsg.current.innerHTML=""
    checkValidity()
}
}} ref={usn} className="p-3 rounded focus:outline-none text-black rubik-b" type="text" placeholder="John"/></label>
<span ref={umsg} className="text-red-400" style={{fontSize:"12px"}}></span>
<label>Email: <input
onKeyUp={
    ()=>{
        const test=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
if(!test.test(email.current.value)
){
    emsg.current.innerHTML="correct email is needed"
        setValid(false)

}
else{
        emsg.current.innerHTML=""

    checkValidity()
}
}}
ref={email} className="p-3 rounded focus:outline-none text-black rubik-b" type="email" placeholder="example@gmail.com"/></label>
<span ref={emsg} className="text-red-400" style={{fontSize:"12px"}}></span>

<label>Phone: <input
onKeyUp={
    ()=>{
        const test=/^(?:(?:\+?234)|0)[789][01]\d{8}$/
if(!test.test(pho.current.value)){
    pmsg.current.innerHTML="correct number is required (whatsapp preferably)"
        setValid(false)

}
else{
        pmsg.current.innerHTML=""

    checkValidity()
}
}}
ref={pho} className="p-3 rounded focus:outline-none text-black rubik-b" type="text" placeholder="000000000"/></label>
<span ref={pmsg} className="text-red-400" style={{fontSize:"12px"}}></span>

<label>Password: <input
onKeyUp={
    ()=>{
if(pass.current.value.length<5
){
    passmsg.current.innerHTML="password must be up to 5 characters"
        setValid(false)

}
else{
        passmsg.current.innerHTML=""

    checkValidity()

}
}}
ref={pass} className="p-3 rounded focus:outline-none text-black rubik-b" type="password" placeholder="*****"/></label>
<span ref={passmsg} className="text-red-400" style={{fontSize:"12px"}}></span>

<Button disabled={!valid} onClick={submit} className="rubik-b" variant="contained" sx={{color:"white",textTransform:"none",backgroundColor:"#f97316"}}>Create </Button>
<span className="">Already have an account? <Link className="text-orange-400 rubik-b" href="/login">login</Link></span>

            </div>

<div></div>

        </div>
        </>
    )
}
export default Signup