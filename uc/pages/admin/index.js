import Link from "next/link"
import InventoryIcon from '@mui/icons-material/Inventory';
import Head from "next/head"
import { Add, Discount, Search } from "@mui/icons-material"
const Admin=({users,orders,comOrders,itemCount})=>{
return (<>
<Head>
    <title>UC | Admin</title>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Monomaniac+One&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet"/>
</Head>
<div style={{height:"100vh"}} className="h-full">
<div className="rubik-h text-orange-500 text-2xl ml-2 mt-2">Admin Dashboard</div>

<div className="flex-row flex justify-center mb-10 mt-10 gap-6">
<div style={{fontSize:"20px"}} className="p-5 text-black font-bold bg-white mx-2 rounded-md rubik-b ">Registered Users: {users}</div>
<div style={{fontSize:"20px"}} className="p-5 text-black font-bold bg-white mx-2 rounded-md rubik-b ">Orders: {orders}</div>
</div>

<div className="flex-row flex justify-center mb-10 mt-10 gap-1">
<div style={{fontSize:"20px"}} className="py-3 px-2 flex flex-col text-black  bg-white mx-2 rounded-md rubik-b ">
   <span> Items: {itemCount}</span>
   

        {/* <Link href="/admin/search" className="text-orange-500" style={{fontSize:"15px"}}>Find item</Link>
        <Link href="/products" className="text-orange-500" style={{fontSize:"15px"}}>view items</Link> */}

    </div>
<div style={{fontSize:"20px"}} className="p-4 text-black bg-white mx-2 rounded-md rubik-b ">Payments receieved: {0}</div>
</div>

<div className="flex-col flex justify-center gap-6">
<div  className="p-3 rounded-md text-black flex flex-row justify-between items-center bg-white mx-2 rubik-b ">
   <span style={{fontSize:"20px"}}> Resolved Orders: {comOrders}</span>
   <Link href="/" className="text-orange-500" style={{fontSize:"15px"}}>view</Link>
    </div>
    <div  className="p-3 rounded-md text-black flex flex-row justify-between items-center bg-white mx-2 rubik-b ">
   <span style={{fontSize:"20px"}}> Pending Orders: {orders}</span>
   <Link href="/admin/processing" className="text-orange-500" style={{fontSize:"15px"}}>view</Link>
    </div>
</div>

<div className="grid grid-cols-3 justify-center items-center relative mx-2 bg-white mt-4 rounded-md p-5">
    <div className="absolute top-1 left-1  text-orange-400 rubik-b">More Actions</div>
    <div className="p-3 flex flex-col justify-center items-center">
    <Add sx={{color:"#f97316"}}/>
    <Link href="/admin/additem" className="text-orange-500 rubik-b" style={{fontSize:"15px"}}>Add item</Link>
    </div>

    <div className="p-3  flex flex-col justify-center items-center">
    <Search sx={{color:"#f97316"}}/>
    <Link href="/admin/search" className="text-orange-500 rubik-b" style={{fontSize:"15px"}}>find item</Link>
    </div>

    <div className="p-3  flex flex-col justify-center items-center">
    <InventoryIcon sx={{color:"#f97316"}}/>
    <Link href="/products" className="text-orange-500 rubik-b" style={{fontSize:"15px"}}>products</Link>
    </div>

     <div className="p-3  flex flex-col justify-center items-center">
    <Discount sx={{color:"#f97316"}}/>
    <Link href="/admin/discount" className="text-orange-500  rubik-b" style={{fontSize:"15px"}}>Discount</Link>
    </div>
    </div>
</div>

</>)
}
export default Admin
export async function getServerSideProps(context){
if(!context.req.isAuthenticated()||!context.req.user.Admin){
    return{
        redirect:{
            destination:"/product",
            permanent:false
        }
    }
}
    const User=require("@/Collections/users")
    // get all registered users
const regUsers=await User.countDocuments()
// get all orders that have been placed
const Order=require("@/Collections/orders")
    const orders= await Order.countDocuments({
    Status:"pending"})
//get orders that has been completed
const comOrders= await User.countDocuments({
    Cart: {$elemMatch: {Status:"done"}}
})
const Items=require("@/Collections/items")
const itemCount=await Items.countDocuments()
// console.log(regUsers)
return{
    props:{users:regUsers,orders,comOrders,itemCount}
}

}