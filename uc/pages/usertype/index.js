import { ArrowForwardIosRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import Head from "next/head"
const Usertype=()=>{
    return (<>
    <div style={{height:"100vh"}} className="flex flex-col items-center justify-center">
          <div  className="flex md:flex-row gap-6 flex-col   justify-evenly w-full items-center">
             <div className=" w-60 text-center text-2xl flex flex-col gap-3 justify-center items-center gvr rounded-xl bg-orange-400 h-64"> <span>Continue as guest</span>
<Button href="/usertype" sx={{backgroundColor:"black",color:"#FDBA74",textTransform:"none"}}  variant="contained" endIcon={<ArrowForwardIosRounded/>} className="cta mx-auto slide  w-30">proceed</Button>             </div>

<div className="md:text-5xl gvr">OR</div>


             <div className="w-60 text-center text-2xl flex flex-col gap-3 justify-center items-center gvr rounded-xl bg-orange-400 h-64">
                <span>Create an account</span>
<Button href="/usertype" sx={{backgroundColor:"black",color:"#FDBA74",textTransform:"none"}}  variant="contained" endIcon={<ArrowForwardIosRounded/>} className="cta mx-auto slide  w-30">proceed</Button>
                </div>
          </div>
</div>
    </>)
}
export default Usertype;