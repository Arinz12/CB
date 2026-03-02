import Head from "next/head"
import Image from "next/image"

const ProductList=({items})=>{
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
    <div className="h-full  flex flex-col  justify-center">
        <div className="rubik-h text-orange-500 text-2xl">Products</div>
{/* list container */}
<div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
    {items.map((aa)=>{
        return <div className="bg-white  mx-auto p-4 rounded">
<Image className="rounded-md" width={200} priority={true} height={400} src={aa.Image.split(".dev")[1]} />   
    <div className="text-black rubik-b">{aa.Name}</div>
    <div className="text-black rubik-b">{aa.Longevity}</div>
    <div className="text-black rubik-b">{aa.Brand}</div>
<div className="text-black rubik-b">{aa.Price.toLocaleString('en-NG', {style: "currency", currency: "NGN"})}</div>
        </div>
    })}
</div></div>
    </>)
}

export async function getServerSideProps(context) {
    const Items=require("@/Collections/items")
if(context.req.user&&context.req.user.Admin=="true"){
console.log("user is an admin")
}
else if(context.req.user){
console.log("logged in");
}
else{
console.log("user not logged in")
}
    try{
    const arrayOfItems=await Items.find()
    return {
        props:{items:JSON.parse(JSON.stringify(arrayOfItems))}
    }}
    catch(e){
        return {
            redirect:{
                destination:"/login",
                permanent:"false"
            }
        }
    }
    finally{
        console.log("product page has settled")
    }
}
export default ProductList