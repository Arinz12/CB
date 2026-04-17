import Head from "next/head";
import CartIconWithBadge from "../../components/cart"
import Image from "next/image";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { Button } from "@mui/material";
import router from "next/router";
import { useEffect, useRef, useState } from "react";
import Link from "next/link"
import { ArrowBack, CloseSharp } from "@mui/icons-material";
const { v4: uuidv4 } = require('uuid');
import Script from 'next/script';

const Cart=({items,user})=>{
    const [success,setSuccess]=useState(false)
    const [failed,setFailed]=useState(false)
    const [pro,setPro]=useState(false)
    const [update,setUpdate]=useState([""])
    const prices=useRef([])
    const container=useRef("")
    const review=useRef("")
    const state=useRef("")
    const location=useRef("")
    const productInfo=useRef([])
    const [amount, setAmount]=useState(items.reduce((total, item) => {
  return total + parseInt(item.Price, 10);
}, 0))
let info
const finalAmount=useRef("")
const [empty,SetEmpty]=useState(false)
useEffect(()=>{
    if(amount==0){
        SetEmpty(true)
    }
     prices.current=document.querySelectorAll("span[data-product]")
    // console.log(prices.current)
 console.log(Array.from(prices.current).reduce((total, item) => {
  return total + parseInt(item.innerHTML, 10);
}, 0))
 info=[]
Array.from(document.querySelectorAll("span[data-product]")).forEach(element => {
    info.push({productId:element.dataset.product,quantity:(element.dataset.quantity||1),price:element.innerHTML})
    console.log(Array.from(document.querySelectorAll("span[data-product]")).length)
});
productInfo.current=info
setAmount(Array.from(prices.current).reduce((total, item) => {
  return total + parseInt(item.innerHTML, 10);
}, 0)   
)

})
function makePayment() {
	FlutterwaveCheckout({
		public_key: 'FLWPUBK-254af65d33d3f2e4cbfa5e025673d67f-X',
		tx_ref: uuidv4(),
		amount: finalAmount.current.value,
		currency: 'NGN',
		payment_options: 'card, mobilemoneyghana, ussd',
		redirect_url: 'https://expert-memory-9774x9pr545ghvx5-3000.app.github.dev/products',
		meta: {
			//consumer_id: 23,
         order: JSON.stringify({productInfo,address:location.current.value,state:state.current.value})

		},
		customer: {
			email: user.Email,
			phone_number: user.Phonenumber,
			name: user.Username,
		},
		customizations: {
			title: 'D&G Signature',
			description: 'Payment for a product',
			logo: 'https://expert-memory-9774x9pr545ghvx5-3000.app.github.dev/item/logo.png',
		},
	});
}

const product=[]
// items.forEach(a => {
//     productInfo.push({productId:a.Uid})
// });


    async function remove(id,wait,resolve,amt){
wait()
    const res=await fetch("https://expert-memory-9774x9pr545ghvx5-3000.app.github.dev/removefromcart",{
        method:"post",
        body:JSON.stringify({id}),
        headers:{
            "Content-Type":"application/json"
        }
    });
    if(res.ok){
setAmount(amount-amt)
setUpdate([...update,id])

resolve()
 console.log("success")
       
    }
    else{
resolve()
console.log("failed")
}
}
    return (<>
    <Head>
        <title>UC|Cart</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Monomaniac+One&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet"/>
    </Head>
    <Script strategy="beforeInteractive" src="https://checkout.flutterwave.com/v3.js"></Script>
    <div className="h-full">
    <div style={{backgroundColor:"rgb(214, 219, 220)"}} className="sticky z-20 top-0 rounded-md ">
            <div className="rubik-h text-orange-600   mt-2 ml-2 text-2xl"><ArrowBack onClick={()=>
                {router.back()}
            }/> Cart</div>
<div  className="text-orange-600    text-right mr-6 p-4 rubik-h">Total:  
      <svg className="inline-block w-3 h-3 md:w-3 md:h-3 " viewBox="0 0 115.09 122.88">
                                        <path fill="currentColor" d="M13.42,0H32.1a1.25,1.25,0,0,1,1,.6L58,42.26H83.17v-41A1.23,1.23,0,0,1,84.39,0h17.28a1.23,1.23,0,0,1,1.23,1.23v41h11a1.23,1.23,0,0,1,1.23,1.23V54.55a1.23,1.23,0,0,1-1.23,1.23h-11v9.41h11a1.23,1.23,0,0,1,1.23,1.22V77.48a1.23,1.23,0,0,1-1.23,1.22h-11v43a1.23,1.23,0,0,1-1.23,1.23H84.39a1.25,1.25,0,0,1-1-.6L58,78.7H33.26v43A1.23,1.23,0,0,1,32,122.88H13.42a1.23,1.23,0,0,1-1.23-1.23V78.7h-11A1.23,1.23,0,0,1,0,77.48V66.41a1.23,1.23,0,0,1,1.23-1.22h11V55.78h-11A1.23,1.23,0,0,1,0,54.55V43.49a1.23,1.23,0,0,1,1.23-1.23h11v-41A1.23,1.23,0,0,1,13.42,0ZM33.26,55.78v9.41h17l-4.4-9.41ZM70,65.19H83.17V55.78H65.68L70,65.19ZM83.17,78.7H77.88l5.29,11v-11ZM33.26,32.76v9.5h4.57l-4.57-9.5Z"/>
                                    </svg>{amount.toLocaleString()}</div></div>
        <div style={{height:"100%"}} className="h-full  flex flex-col items-center  justify-center">
        {items.length==0||empty? <div className="h-full flex flex-col items-center  justify-center gap-6">
<ProductionQuantityLimitsIcon sx={{color:"#f97316",height:"170px",width:"170px"}} className=""/>
<div className="rubik-b mx-auto text-center text-orange-400">Cart is Empty</div>
<div className="mb-24"><Link href="/products"><Button className="w-full" variant="contained" sx={{color:"white",backgroundColor:"#f97316"}}>Add items</Button></Link></div>
        </div>:
<div ref={container} className="mt-4 grid grid-cols-2 w-full md:grid-cols-3 lg:grid-cols-4 gap-2">
     {items.map((aa)=>
     {
        if(update.includes(aa.Uid)){
            return null
        }
            return <div style={{width:"fit-Content"}} key={aa.Uid} className="bg-white mx-2    p-4 rounded">
    <Image alt="product image" priority={true} className="rounded-md" width={200}  height={400} src={aa.Image.split(".dev")[1]} />   
        <div className="text-orange-500 rubik-b">{aa.Name}</div>
        <div className="text-orange-500 rubik-b">{aa.Longevity}hrs</div>
        <div className="text-orange-500 rubik-b">{aa.Brand}</div>
         <div className="text-orange-500  rubik-b">
            <svg className="inline-block w-3 h-3 md:w-3 md:h-3 " viewBox="0 0 115.09 122.88">
                                        <path fill="currentColor" d="M13.42,0H32.1a1.25,1.25,0,0,1,1,.6L58,42.26H83.17v-41A1.23,1.23,0,0,1,84.39,0h17.28a1.23,1.23,0,0,1,1.23,1.23v41h11a1.23,1.23,0,0,1,1.23,1.23V54.55a1.23,1.23,0,0,1-1.23,1.23h-11v9.41h11a1.23,1.23,0,0,1,1.23,1.22V77.48a1.23,1.23,0,0,1-1.23,1.22h-11v43a1.23,1.23,0,0,1-1.23,1.23H84.39a1.25,1.25,0,0,1-1-.6L58,78.7H33.26v43A1.23,1.23,0,0,1,32,122.88H13.42a1.23,1.23,0,0,1-1.23-1.23V78.7h-11A1.23,1.23,0,0,1,0,77.48V66.41a1.23,1.23,0,0,1,1.23-1.22h11V55.78h-11A1.23,1.23,0,0,1,0,54.55V43.49a1.23,1.23,0,0,1,1.23-1.23h11v-41A1.23,1.23,0,0,1,13.42,0ZM33.26,55.78v9.41h17l-4.4-9.41ZM70,65.19H83.17V55.78H65.68L70,65.19ZM83.17,78.7H77.88l5.29,11v-11ZM33.26,32.76v9.5h4.57l-4.57-9.5Z"/>
                                    </svg>
            {parseInt(aa.Discount)?
    <div className="inline-block "><del>{parseInt(aa.Price).toLocaleString()} </del>
     <div className="inline-block "> {(parseInt(aa.Price)-((parseInt(aa.Discount)/100)*parseInt(aa.Price))).toLocaleString()}</div></div>:parseInt(aa.Price).toLocaleString()}</div>
        <div className="mb-2"><label className="text-orange-500 rubik-b">Qty: <input 
        onBlur={(e)=>{
            if(!e.target.value){
                e.target.value=1
            }
        }}
        onChange={(e)=>{
            const ele=e.target.parentElement.parentElement.parentElement.getElementsByTagName('span')[0];
ele.innerHTML=(e.target.value*(parseInt(aa.Price)-((parseInt(aa.Discount)/100)*parseInt(aa.Price))))
ele.dataset.quantity=e.target.value;
setAmount(Array.from(prices.current).reduce((total, item) => {
  return total + parseInt(item.innerHTML, 10);
}, 0)   
)
}}
        type="number" min={1} max={10}  inputMode="numeric" className="focus:outline-none w-fit text-center px-2 border rounded border-orange-500" defaultValue={1} /></label></div>
<div className="block text-orange-500 py-3 rubik-b">Amount: <svg className="inline-block w-3 h-3 md:w-3 md:h-3 " viewBox="0 0 115.09 122.88">
                                        <path fill="currentColor" d="M13.42,0H32.1a1.25,1.25,0,0,1,1,.6L58,42.26H83.17v-41A1.23,1.23,0,0,1,84.39,0h17.28a1.23,1.23,0,0,1,1.23,1.23v41h11a1.23,1.23,0,0,1,1.23,1.23V54.55a1.23,1.23,0,0,1-1.23,1.23h-11v9.41h11a1.23,1.23,0,0,1,1.23,1.22V77.48a1.23,1.23,0,0,1-1.23,1.22h-11v43a1.23,1.23,0,0,1-1.23,1.23H84.39a1.25,1.25,0,0,1-1-.6L58,78.7H33.26v43A1.23,1.23,0,0,1,32,122.88H13.42a1.23,1.23,0,0,1-1.23-1.23V78.7h-11A1.23,1.23,0,0,1,0,77.48V66.41a1.23,1.23,0,0,1,1.23-1.22h11V55.78h-11A1.23,1.23,0,0,1,0,54.55V43.49a1.23,1.23,0,0,1,1.23-1.23h11v-41A1.23,1.23,0,0,1,13.42,0ZM33.26,55.78v9.41h17l-4.4-9.41ZM70,65.19H83.17V55.78H65.68L70,65.19ZM83.17,78.7H77.88l5.29,11v-11ZM33.26,32.76v9.5h4.57l-4.57-9.5Z"/>
                                    </svg> <span data-product={aa.Uid}>{(parseInt(aa.Price)-((parseInt(aa.Discount)/100)*parseInt(aa.Price)))}</span></div> 
{
       true?<Button
       onClick={(e)=>{
        remove(aa.Uid,()=>{
            e.target.innerHTML="removing..."
        },()=>{
            e.target.innerHTML="remove"
        },aa.Price)
    }}
       sx={{color:"white",textTransform:"none",backgroundColor:"#f97316"}} >
Remove
       </Button>:<Button sx={{color:"white",textTransform:"none",backgroundColor:"#f97316"}} >
       </Button>
    }
     </div>
     
     })}
   </div>}

   <Button onClick={()=>{
    console.log(productInfo)
        review.current.classList.remove("hidden")
    review.current.classList.add("flex")
   }} disabled={empty} className="md:w-96  bottom-1 mt-4 text-2xl w-11/12 " sx={{color:"white",position:"fixed !important",textTransform:"none",backgroundColor:"#f97316",borderRadius:"20px"}}>Checkout {amount.toLocaleString()}</Button>

   </div>

    <div ref={review} className="fixed  top-0 h-full w-full bg-white/30 flex-col reveal2 hidden items-center justify-center  backdrop-blur-sm z-50">
   <div className="flex relative bg-white rounded-md mx-1 flex-col gap-4 justify-center items-center p-4">
    <div onClick={()=>{
      review.current.classList.remove("flex")
    review.current.classList.add("hidden")  
    }} className="absolute top-2 right-1 p-4 text-orange-500 rubik-b"><CloseSharp/></div>
<label className="text-black mt-6 rubik-b">Email: <br/>  <input className="text-black rubik-b border focus:outline-none border-orange-500 rounded p-2" typeof="text" readOnly value={user.Email} placeholder="example@gmail.com"/></label>
<label className="text-black rubik-b">State:<br/><input ref={state} className=" text-black rubik-b border focus:outline-none border-orange-500 rounded p-2" typeof="text" placeholder="Anambra"/></label>
<label className="text-black rubik-b">Address:<br/><input ref={location} className="text-black rubik-b border focus:outline-none border-orange-500 rounded p-2" typeof="text" placeholder="no 14 street Abuja Nigeria"/></label>
<label className="text-black  rubik-b">Total:<br/>   <input ref={finalAmount} className="text-black rubik-b border focus:outline-none border-orange-500 rounded p-2" value={amount} typeof="number" readOnly placeholder="10,000"/></label>
<Button onClick={makePayment} className="w-80" sx={{color:"white",textTransform:"none",backgroundColor:"#f97316"}} >
      Pay now </Button>
   </div>
   
   
   </div>
   </div>
   
    </>)
}
export async function getServerSideProps(context){
    const Items=require("@/Collections/items")
    // console.log(context.req.user)
   
    if(!context.req.isAuthenticated()){
        return{
            redirect:{
                destination:"/login",
                permanent:false
            }
        }
    }
  else{  
    const  ids=context.req.user.Cart.map((a)=> a.Product)
    const list=await Items.find({Uid:{$in :ids}})
return{
    props:{items:JSON.parse(JSON.stringify(list)),user:JSON.parse(JSON.stringify(context.req.user))}
}}
}
export default Cart;