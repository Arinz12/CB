import Head from "next/head"
import { useEffect, useState } from "react"
import router from "next/router"
import { ArrowBack } from "@mui/icons-material"
const processing=({items})=>{
    const [empty,setEmpty]=useState(false)
    useEffect(()=>{
        if(empty){
            setEmpty(true)
        }
    })
 return (<>
 <Head>
    <title>UC | Pending</title>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Monomaniac+One&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet"/>
 </Head>
 
 <div className="h-full">
<div className="rubik-h text-orange-600   mt-2 ml-2 text-2xl"><ArrowBack onClick={()=>
                {router.back()}
            }/> Pending orders</div>
            {empty||items.length==0? <div style={{height:"100vh"}} className="flex flex-col  justify-center items-center">
   <div className="h-10/12 w-full text-2xl md:text-5xl rubik-h text-center"> No pending Orders!!!</div>
</div>:<div className="flex flex-col gap-4 p-3">
{items.map((a)=>{
  
    return(
        <div className="flex rubik-b p-3 rounded-md flex-col bg-white/40 gap-3">
       <div className="text-orange-500">Customer: <span className="text-orange-300">{a.User}</span></div>
       <div>PhoneNumber: {a.User}</div>
       <div>Products:</div>
      {
        a.Purchase.map((i)=>{
            return(<div className="ml-2">
                <div>Product: {i.Product}</div>
                <div>Quantity: {i.Quantity}</div>
            </div>

            )
        })
      }

            <div>Address: {a.Address}</div>
            <div>State: {a.State}</div>


      <div>Total: {a.Total.toLocaleString()}</div>

      <div>Date: {a.Date}</div>

        </div>)
})}</div>}

 </div>
 </>)   
}
export default processing
export async function getServerSideProps(context){
    if(!context.req.isAuthenticated()||!context.req.user.Admin){
        return{
            redirect:{
                destination:"/products",
                permanent:"false"
            }
        }
    }
    const Order=require("@/Collections/orders")
    const orders= await Order.find({
    Status:"pending"})
    return{
        props:{items:JSON.parse(JSON.stringify(orders))}
    }
}