import { Button } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import Head from "next/head"
import { useRef, useState } from "react"
import ErrorIcon from '@mui/icons-material/Error';
import Image from "next/image";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";

const Search=()=>{
    const id=useRef("")
    const [details,setDetails]=useState(null)
    const [pro,setPro]=useState(false)
    const [notfound,setNotfound]=useState(false)
    async function find(){
        if(!id.current.value){
return
        }
        setPro(true)
        setDetails(null)
        setNotfound(false)
const res= await fetch("https://expert-memory-9774x9pr545ghvx5-3000.app.github.dev/find",{method:"post",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({pid:id.current.value})
})
if(res.ok){
    const res1=await res.json()
    setDetails(res1)
    setPro(false)
}else{
    setPro(false)
    setNotfound(true)
}
    }
return (<>
<Head>
    <title>Find Product</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Monomaniac+One&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet"/>
</Head>
<div className="rubik-h text-orange-500 text-3xl ml-2 mt-2">Search Product</div>
<div className="rubik-b flex flex-col justify-center items-center gap-5">
<div className="p-3 flex flex-col gap-2 items-center">
    <input type="text" ref={id} placeholder="1we34rdt" className="rounded p-3 text-black" />
    <Button onClick={find} endIcon={<SearchIcon/>} sx={{color:"white",textTransform:"none",backgroundColor:"#f97316"}}>Find</Button>
</div>
{details && 
<div style={{width:"fit-Content"}} key={details.Uid} className="bg-white mx-2 reveal    p-4 rounded">
    <Image alt="product image" priority={true} className=" rounded-md" width={200}  height={400} src={details.Image.split(".dev")[1]} />   
        <div className="text-orange-500 rubik-b">{details.Name}</div>
        <div className="text-orange-500 rubik-b">{details.Longevity}hrs</div>
        <div className="text-orange-500 rubik-b">{details.Brand}</div>
        <div className="text-orange-500 rubik-b">
            <svg className="inline-block w-3 h-3 md:w-3 md:h-3 " viewBox="0 0 115.09 122.88">
                                        <path fill="currentColor" d="M13.42,0H32.1a1.25,1.25,0,0,1,1,.6L58,42.26H83.17v-41A1.23,1.23,0,0,1,84.39,0h17.28a1.23,1.23,0,0,1,1.23,1.23v41h11a1.23,1.23,0,0,1,1.23,1.23V54.55a1.23,1.23,0,0,1-1.23,1.23h-11v9.41h11a1.23,1.23,0,0,1,1.23,1.22V77.48a1.23,1.23,0,0,1-1.23,1.22h-11v43a1.23,1.23,0,0,1-1.23,1.23H84.39a1.25,1.25,0,0,1-1-.6L58,78.7H33.26v43A1.23,1.23,0,0,1,32,122.88H13.42a1.23,1.23,0,0,1-1.23-1.23V78.7h-11A1.23,1.23,0,0,1,0,77.48V66.41a1.23,1.23,0,0,1,1.23-1.22h11V55.78h-11A1.23,1.23,0,0,1,0,54.55V43.49a1.23,1.23,0,0,1,1.23-1.23h11v-41A1.23,1.23,0,0,1,13.42,0ZM33.26,55.78v9.41h17l-4.4-9.41ZM70,65.19H83.17V55.78H65.68L70,65.19ZM83.17,78.7H77.88l5.29,11v-11ZM33.26,32.76v9.5h4.57l-4.57-9.5Z"/>
                                    </svg>
        {parseInt(details.Price).toLocaleString()}</div>
     </div>
}
{pro && <div className="h-full flex flex-col animate-pulse justify-center items-center">
    please wait !!!
    </div>}
   {notfound && <div className="h-full flex flex-col  justify-center items-center">
    <ErrorIcon sx={{height:"200px",width:"200px"}}/>
    <div className="rubik-b text-orange-500">Product not found</div>
    </div>}
        <Link className="text-orange-300"  href={"/admin"}><ArrowBack/> Admin Dashboard</Link>
</div>
</>)
}
export default Search
export async function getServerSideProps(context){
    if(!context.req.isAuthenticated()||!context.req.user.Admin){
        return {
            redirect:{
                destination:"/product",
                permanent:false
            }
        }
    }
    return{
        props:{}
    }
}