import { ArrowForwardIosRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import Head from "next/head"
import Link from "next/link";
const Usertype=()=>{
    return (<>
    <div style={{height:"100vh"}} className="flex flex-col items-center justify-center">
          <div  className="flex md:flex-row gap-6 flex-col   justify-evenly w-full items-center">
             <div className=" w-60 text-center text-orange-500 text-2xl flex flex-col gap-3 justify-center items-center gvr rounded-xl bg-white h-64">
                
                 <span>Continue as guest</span>
<Link href="/product"><Button  className="rubik-b" variant="contained" sx={{color:"white",textTransform:"none",backgroundColor:"#f97316"}}>Continue </Button> </Link>  
         </div>

<div className="md:text-5xl gvr">OR</div>


             <div className="w-60 text-center text-orange-500 text-2xl flex flex-col gap-3 justify-center items-center gvr rounded-xl bg-white h-64">

                <span>Create an account</span>
<Link href="/signup"><Button  className="rubik-b" variant="contained" sx={{color:"white",textTransform:"none",backgroundColor:"#f97316"}}>Continue</Button></Link>
                </div>
          </div>
</div>
    </>)
}
export default Usertype;