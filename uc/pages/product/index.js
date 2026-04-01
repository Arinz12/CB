import Head from "next/head"
import Image from "next/image"
import { Button } from "@mui/material";
import { HomeRounded, WalletRounded, Add, SettingsRounded } from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState,useRef } from "react"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CartIconWithBadge from "../../components/cart"
const {DateTime}=require("luxon")

const Product=({items})=>{
const [success,setSuccess]=useState(false)
const [failed,setFailed]=useState(false)
const [pro,setPro]=useState(false)
const [update,setUpdate]=useState([""])
/**async function add(id,wait,resolve){
wait()
    const res=await fetch("https://expert-memory-9774x9pr545ghvx5-3000.app.github.dev/addtocart",{
        method:"post",
        body:JSON.stringify({id}),
        headers:{
            "Content-Type":"application/json"
        }
    });
    if(res.ok){
setUpdate([...update,id])
resolve()
      setSuccess(true)
        console.log("success")
        setTimeout(() => {
        setSuccess(false)

        }, 3000);
    }
    else{
resolve()
setFailed(true)
console.log("failed")
setTimeout(() => {
        setFailed(false)

        }, 3000);    }
}**/
    function capitalizeFirstLetter(str) {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const timinit = DateTime.now().setZone("Africa/Lagos");
    const timer = timinit.toFormat("a").toLowerCase();
    let greet;
    
    if (timer == "am") {
        greet = "Good morning, ";
    } else if (timer == "pm" && (parseInt(timinit.toFormat("h")) < 4 || parseInt(timinit.toFormat("h")) == 12)) {
        greet = "Good afternoon, ";
    } else {
        greet = "Good evening, ";
    }

    return (<>
    <Head>
        <title>UC | PRODUCTS</title>
         {/* <style>{`
       body{
        background-color: rgb(214, 219, 220) !important
       }
       
       `}
    </style> */}
         <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Monomaniac+One&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet"/>
    </Head>
    <div  className="h-full  flex flex-col  justify-center">
        <div style={{backgroundColor:"rgb(214, 219, 220)"}} className="flex flex-row z-50 sticky top-0 p-4 justify-between items-center">
        <div className="rubik-h text-orange-500 text-2xl">Products</div>
        <div className="flex flex-col justify-center items-center space-x-3">
                        
                            <AccountCircleIcon className="text-orange-600 w-9 h-9 cursor-pointer" />
                    
                       {/* {user && <h1 className="text-lg rubik-b md:text-xl font-bold text-orange-400">
                            {}{capitalizeFirstLetter(user.Username)}
                        </h1>} */}
                    </div>
</div>
{/* list container */}
<div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {items.map((aa)=>{
        return <div key={aa.Uid} className="bg-white mx-2   p-4 rounded">
<Image alt="product image" priority={true} className="rounded-md" width={200}  height={400} src={aa.Image.split(".dev")[1]} />   
    <div className="text-orange-500 rubik-b">{aa.Name}</div>
    <div className="text-orange-500 rubik-b">{aa.Longevity} hrs</div>
    <div className="text-orange-500 rubik-b">{aa.Brand}</div>
     <div className="text-orange-500  rubik-b">
        <svg className="inline-block w-3 h-3 md:w-3 md:h-3 " viewBox="0 0 115.09 122.88">
                                    <path fill="currentColor" d="M13.42,0H32.1a1.25,1.25,0,0,1,1,.6L58,42.26H83.17v-41A1.23,1.23,0,0,1,84.39,0h17.28a1.23,1.23,0,0,1,1.23,1.23v41h11a1.23,1.23,0,0,1,1.23,1.23V54.55a1.23,1.23,0,0,1-1.23,1.23h-11v9.41h11a1.23,1.23,0,0,1,1.23,1.22V77.48a1.23,1.23,0,0,1-1.23,1.22h-11v43a1.23,1.23,0,0,1-1.23,1.23H84.39a1.25,1.25,0,0,1-1-.6L58,78.7H33.26v43A1.23,1.23,0,0,1,32,122.88H13.42a1.23,1.23,0,0,1-1.23-1.23V78.7h-11A1.23,1.23,0,0,1,0,77.48V66.41a1.23,1.23,0,0,1,1.23-1.22h11V55.78h-11A1.23,1.23,0,0,1,0,54.55V43.49a1.23,1.23,0,0,1,1.23-1.23h11v-41A1.23,1.23,0,0,1,13.42,0ZM33.26,55.78v9.41h17l-4.4-9.41ZM70,65.19H83.17V55.78H65.68L70,65.19ZM83.17,78.7H77.88l5.29,11v-11ZM33.26,32.76v9.5h4.57l-4.57-9.5Z"/>
                                </svg>
    {parseInt(aa.Price).toLocaleString()}</div>
{update.includes(aa.Uid)?
<Button className="rubik-b" variant="contained" sx={{color:"white",textTransform:"none",backgroundColor:"#f97316"}} endIcon={<CheckCircleIcon/>}>Added</Button>:
    <Button href="/login" key={aa.Uid} className="rubik-b" variant="contained" sx={{color:"white",textTransform:"none",backgroundColor:"#f97316"}} endIcon={<Add/>}>{"Login to add"}</Button>
    }
        </div>
    })}
</div></div>
    </>)
}

export async function getServerSideProps(context) {
    const Items=require("@/Collections/items")
if(context.req.user&&context.req.user.Admin=="true"){

}
else if(context.req.user){
console.log("logged in");
}
else{
console.log("user not logged in")
}
    try{
    const arrayOfItems=await Items.find();
    if(context.req.isAuthenticated()){
   return {
            redirect:{
                destination:"/products",
                permanent:false
            }
        }
}
    else{
   return {
        props:{items:JSON.parse(JSON.stringify(arrayOfItems))}
    }
    }

}
    catch(e){
        return {
            redirect:{
                destination:"/login",
                permanent:false
            }
        }
    }
    finally{
        console.log("product page has settled for guests")
    }
}
export default Product