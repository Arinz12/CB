import { Button } from "@mui/material"
import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import { ArrowBack } from "@mui/icons-material";
import Link from "next/link"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const Bonus=()=>{
    const forSpec=useRef("")
    const [fs,setFs]=useState(false)
    const forAll=useRef("")
    const discount=useRef("")
    const itemId=useRef("")
   const [success,setSuccess]=useState(false)
   const [failed,setFailed]=useState(false)
   const [pro,setPro]=useState(false)


    const [invalid,setInvalid]=useState(true)
    async function proceed(){
        setPro(true)
const res= await fetch("https://expert-memory-9774x9pr545ghvx5-3000.app.github.dev/discount",{method:"post",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({discount:discount.current.value,itemId:(forAll.current.checked)? null:itemId.current.value})
})
if(res.ok){
     setPro(false)
setSuccess(true)
setTimeout(() => {
    setSuccess(false)

}, 3000);
}
else{
    setFailed(true)
     setPro(false)
     setTimeout(() => {
    setFailed(false)
}, 3000);
}
    }
    
useEffect(()=>{

    
})
    return (<>
    <Head>
        
        <title>Admin | Bonus</title> 
        </Head>
     <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Monomaniac+One&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet"/>
    <div className="h-full flex flex-col justify-center items-center">
<div className="rubik-h text-3xl p-3 text-orange-500 ">Add Discount</div>
<div className="flex flex-row justify-between gap-7 p-3">

<div className="flex flex-row gap-2">
    <input onChange={()=>{
        if(forSpec.current.checked){
           setFs(true) 
        }else{
            setFs(false)
        }
       if((forAll.current.checked ||(forSpec.current.checked&&itemId.current.value)) && discount.current.value){
setInvalid(false)
    } 
    else{
       setInvalid(true)
 
    }
    }} id="fa" ref={forAll} type="radio" value={"forAll"} name="group"/>
<label htmlFor="fa"  className="text-orange-500 rubik-b">For all </label>
</div>

<div className="flex flex-row gap-2">
    <input onChange={()=>{
        if(forSpec.current.checked){
           setFs(true) 
        }else{
            setFs(false)
        }
        if((forAll.current.checked ||(forSpec.current.checked&&itemId.current.value)) && discount.current.value){
setInvalid(false)
    } 
    else{
       setInvalid(true)
 
    }
    }} ref={forSpec} value={"forSpec"}  id="fs" type="radio" name="group"/>
<label htmlFor="fs" className="text-orange-500 rubik-b">For specific product </label>
</div>

</div>

{<div className={`mt-5 ${fs ? "block" : "hidden"}`}><label className="mx-2 rubik-b text-orange-400">Product id: 
<input onChange={()=>{
    if((forAll.current.checked ||(forSpec.current.checked&&itemId.current.value)) && discount.current.value){
setInvalid(false)
    } 
    else{
       setInvalid(true)
 
    }
}} ref={itemId} className="rounded p-3 focus:outline-none" placeholder="1xdrt45"/>
</label></div>}

<div className="mt-5">
<label className="mx-2  rubik-b text-orange-400">Discount (%):  
<input onChange={()=>{
    if((forAll.current.checked ||(forSpec.current.checked&&itemId.current.value)) && discount.current.value){
setInvalid(false)
    } 
    else{
       setInvalid(true)
 
    }
}} ref={discount} name="discount" type="number" inputMode="numeric" className="rounded p-3 focus:outline-none" placeholder="2"/>
</label>
</div>

<div className="text-center mt-5 p-3">
{pro? <Button  className="rounded-md"  sx={{color:"white",textTransform:"none",backgroundColor:"#f97316"}}>please wait...</Button>:
<Button onClick={proceed} disabled={invalid} className="rounded-md"  sx={{color:"white",textTransform:"none",backgroundColor:"#f97316"}}>proceed</Button>
}
</div>

{success && <div  className="bg-white rounded text-center fixed top-1  left-1 slide  p-5">
    <span className="text-red-500 rubik-b">Discount success <CheckCircleIcon/> </span>
</div>}

{failed && <div  className="bg-white rounded text-center fixed top-1  left-1 slide  p-5">
    <span className="text-red-500 rubik-b">Discount failed <CancelIcon/> </span>
</div>}
        <Link className="text-orange-300"  href={"/admin"}><ArrowBack/> Admin Dashboard</Link>


    </div>
    </>)
}
export default Bonus
export async function getServerSideProps(context){
if(!context.req.isAuthenticated()||!context.req.user.Admin){
return {
    redirect:{
        destination:"/products",
        permanent:false
    }
}
}
else{
    return{
        props:{}
    }
}

}