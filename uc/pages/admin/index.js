import { Add } from "@mui/icons-material"
import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useRef } from "react"
import Head from "next/head"
const Admin=()=>{
const [done,setDone]=useState(false)
const [processing,setPro]=useState(false)
const [invalid,setInvalid]=useState(true)

const name=useRef(null)
const longevity=useRef(null)
const brand=useRef(null)
const price=useRef(null)
const description=useRef(null)
const volume=useRef(null)
const available=useRef(null)
const image=useRef(null)

function checkValidityOfInput(){
if(name.current.value && longevity.current.value && brand.current.value && price.current.value && description.current.value && volume.current.value && available.current.value && image.current.files[0] ){
    setInvalid(false)
}
else{
    setInvalid(true)
}
}

async function additem(){
    setInvalid(true);// disables the submit button
    setPro(true)
    const formdata= new FormData()
    formdata.append("name",name.current.value )
        formdata.append("longevity",longevity.current.value )
    formdata.append("brand",brand.current.value )
    formdata.append("price",price.current.value )
    formdata.append("description",description.current.value )
    formdata.append("volume",volume.current.value )
    formdata.append("available",available.current.value )
    formdata.append("image",image.current.files[0])

    // const data={
        
    //     name:name.current.value ,
    //     longevity:longevity.current.value,
    //     brand:brand.current.value,
    //     price:price.current.value,
    //     description:description.current.value,
    //     volume:volume.current.value,
    //     available:available.current.value,
    // image:image.current.value};
        
   try{ const result= await fetch("https://expert-memory-9774x9pr545ghvx5-3000.app.github.dev/api/additem",
    {method:"post",
    body:formdata
});
    if(result.ok){
        setPro(false)
    clear()//clears all input and disables the submit button
flashNote();
    }
    else{
        setPro(false)
        throw new Error("error occured")
    }
}
    catch(e){
console.log("adding failed",e)
    }
}
function flashNote(){
  setDone(true);
  setTimeout(()=>{setDone(false)},3000)  
}
function clear(){
    name.current.value="";
    longevity.current.value="";
    price.current.value="";
    brand.current.value="";
    description.current.value="";
    volume.current.value="";
    available.current.value="";
image.current.value=null;
setInvalid(true)
}


return (<>
<Head>
    <title>Add item</title>
    <style>{`
       body{
        background-color:white !important

       }
       
       `}
    </style>
    </Head>
<div className="">
    <p className="text-xl rubik-h text-left text-orange-400  p-5">ADD AN ITEM</p>
<div style={{backgroundColor:"rgb(214, 219, 220)"}} className="relative w-11/12 mx-auto p-4 py-6 rounded-md gap-5 justify-center items-center flex flex-col">
<span onClick={clear} className="absolute rubik-b text-orange-500 -top-5 right-2">Clear All</span>
<label className="font-semibold rubik-b">Name: <input onChange={checkValidityOfInput} className="p-3 focus:outline-orange-300 rounded-sm" type="text" ref={name}/></label>

<div className="flex flex-row justify-between items-center w-full py-1">
<label className="font-semibold rubik-b">Longevity: <input onChange={checkValidityOfInput} className="p-3 w-16 rounded-sm" type="text" placeholder="24hrs" ref={longevity}/></label>
<label className="font-semibold rubik-b">Price: <input onChange={checkValidityOfInput} className="p-3 w-20 rounded-sm" placeholder={"5000"} type="number" inputMode="numeric" ref={price}/></label></div>

<label className="font-semibold rubik-b">Brand: <input onChange={checkValidityOfInput} className="p-3 rounded-sm" type="text" ref={brand}/></label>

<label className="font-semibold rubik-b">Description:<textarea onChange={checkValidityOfInput} className="p-3 rounded-sm" placeholder="This is very great for children" type="text" ref={description}/></label>
<div className="flex flex-row justify-between items-center w-full py-1">

<label className="font-semibold rubik-b">Volume: <input onChange={checkValidityOfInput} className="p-3  w-16 rounded-sm" placeholder="24mg" type="text" ref={volume}/></label>
<label className="font-semibold rubik-b">Available: <input onChange={checkValidityOfInput} className="p-3 w-16  rounded-sm" placeholder="20" type="number" inputMode="numeric" ref={available}/></label>
</div>
<label className="font-semibold rubik-b">Upload item image<input onChange={checkValidityOfInput} p-4 text-orange-400 ref={image} multiple  type="file"/></label>
<Button disabled={invalid} onClick={additem} sx={{backgroundColor:"#FDBA74"}} endIcon={<Add/>} variant="contained" className="w-10/12 ">{processing? "Adding...":"Add"}</Button>
    </div>

   {done && <div className="z-50 slide fixed top-3 text-orange-500 rubik-b left-1 bg-white rounded-md p-4">
    An item has been successfully added
    </div>}

</div>
</>
)
}
export default Admin