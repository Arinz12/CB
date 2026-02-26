import { Button } from "@mui/material"
import Link from "next/link"
import Head from "next/head"
import "@fontsource/roboto"
import { ArrowForwardIosRounded, Forward } from "@mui/icons-material"
import Image from "next/image"
import Carousel from "@/components/Carousel"
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
  const newItems=[
    {
 title: "'MEN's SPECIAL'",
    description: 'Cool Fragrance for men.',
    id: 1,
    icon: <Image width={200} priority={true} height={400} src="/perf.png" />
    },
      {
 title: "'WOMEN's SPECIAL'",
    description: 'Cool Fragrance for women.',
    id: 1,
    icon: <Image width={200} priority={true} height={400} src="/perf.png" />
    },
    {
 title: "'WOMEN's SPECIAL'",
    description: 'Cool Fragrance for women.',
    id: 1,
    icon: <Image width={200} priority={true} height={400} src="/perf.png" />
    },
  ]

const Index=()=>{
  return(
    <>
    <Head>

      <title>UC | Home</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Monomaniac+One&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet"/>

      
    </Head>
    <div style={{height:"70vh",backgroundColor:"wheat"}} className="overflow-hidden relative md:static flex flex-col items-center mx-auto text-center">
      <div className=" ml-4 mt-4 flex flex-row justify-between gap-28 items-center w-full">
<div className="gvr  text-2xl ">UC PERFUME</div>
<div className="hidden  md:flex flex-row justify-between w-full px-7 items-center  mt-3">
  <span className="text-black font-bold gvr cta"> <Link href={"/"}>Home</Link></span>
  <span className="text-black font-bold gvr cta"> <Link href={"/product"}>Product</Link></span>
  <span className="text-black font-bold gvr cta"> <Link href={"/about"}>About</Link> </span>
  <span className="text-black font-bold gvr cta"> <Link href={"/"}>Location</Link></span>
</div>
</div>
<div className="md:flex  overflow-hidden flex-row justify-between items-center px-2 mt-6">
<Image className="animate-pulse1 reveal" priority={true} alt={"perfume"}  width={400} height={300} src={"/perf.png"}/>
<div className="md:flex md:bg-transparent overflow-hidden  bg-black/50 flex rounded-md md:static   w-full left-0  absolute top-0 h-full  flex-col gap-7  justify-center items-center">
      <div className="text-white text-3xl rubik-b slide">STRONG AND LASTING FRAGRANCE FOR EVERYONE</div>
      <Button href="/usertype" sx={{backgroundColor:"black",color:"#FDBA74"}}  variant="contained" endIcon={<ArrowForwardIosRounded/>} className="cta mx-auto slide  w-30">Shop now</Button>
</div></div>
    </div>
    <div className=" mx-auto mt-3 md:flex md:flex-row md:justify-center md:items-center md:gap-16 flex flex-col justify-center items-center gap-2 text-center">
      <div className="text-4xl md:text-7xl gvr  text-orange-500 font-bold">Featured Collections</div>
<div className="text-center mx-auto">
<div className="mx-auto text-center" style={{ position: 'relative' }}>
  <Carousel
  items={newItems}
    baseWidth={350}
    autoplay
    autoplayDelay={3000}
    pauseOnHover={false}
    loop={true}
    round={false}
  />
</div>
    </div></div>
{/* <customer testimonies> */}
    <p className="text-4xl text-center mt-12 md:text-7xl gvr mb-6 text-orange-500 font-bold">Customers' Testimonies</p>
    
    <div  className=" overflow-y-auto overflow-hidden  relative   mt-6  bg-transparent flex flex-row ">

<div style={{height:'200px',textAlignLast:'center'}} className="w-11/12 md:w-3/12 bg-white  p-3 mx-4  flex-shrink-0  text-xl rounded-xl flex justify-center items-center    text-orange-400 rubik-b ">
'The perfume was so nice and long lasting and I recommend uc perfumes'
</div>

<div style={{height:'200px',textAlignLast:'center'}} className="w-11/12 bg-white  flex-shrink-0 p-3 text-xl rounded-xl flex justify-center items-center md:w-3/12  mx-4 text-orange-400 rubik-b ">
"I love perfume was so nice and long lasting and I recommend uc perfumes"
</div>

<div style={{height:'200px',textAlignLast:'center'}} className="w-11/12 bg-white  flex-shrink-0 p-3 text-xl rounded-xl flex justify-center items-center md:w-3/12  mx-4 text-orange-400 rubik-b ">
"Its so  nice and long lasting and I recommend uc perfumes"
</div>

<div style={{height:'200px',textAlignLast:'center'}} className="w-11/12 bg-white flex-shrink-0 p-3 text-xl rounded-xl flex justify-center items-center md:w-3/12  mx-4 text-orange-400 rubik-b ">
"Such a  nice and long lasting and I recommend uc perfumes"
</div>

    </div>
    
    <div className="h-40 flex-col gap-2 mx-auto mt-10">

<div className="flex flex-col gap-5 justify-center items-center">
 <p className="rubik-b">Subscribe to our Email Newsletter</p>
  <input  className=' text-black border-2 focus:outline-none rounded-md p-4 border-orange-200' type="email" placeholder="example@gmail.com"/>
  <button className="rubik-b text-orange-300 bg-black p-3 rounded-md">Subscribe</button>
</div>

<div  className='p-5  ml-1 mr-1 md:grid md:grid-cols-4 flex justify-center justify-self-start items-center gap-12 flex-col text-white bg-black mt-9  rounded-t-lg'>
    <div className="rubik-b text-center" style={{textAlignLast:"center",maxWidth:"400px"}}>At uc perfume store we make the purchase of perfumes seamless using our digital processess to make it happen</div>
    <div className='flex flex-col'>
      <h3 className='rubik-h text-center'style={{fontSize:"17px"}}>Company</h3>
      <Button sx={{color:"#FDBA74"}} href='/about' className=" text-orange-300 text-center">About us</Button>
      <Button sx={{color:"#FDBA74"}} href='/privacy' className="text-center"> privacy policy</ Button>
      <Button sx={{color:"#FDBA74"}} href='/terms' className="text-center">Terms of use</ Button>
    </div>
    <div id="contact" className='flex flex-col'>
      <h3 className='rubik-h text-center 'style={{fontSize:"17px"}}>Get in touch</h3>
      < Button  sx={{color:"#FDBA74",textTransform:"none"}}  className="text-center">+234 7042035475</ Button>
      < Button  sx={{color:"#FDBA74",textTransform:"none"}}  href="" className="text-center" >Email us</ Button>
    </div>
    <div className='flex flex-col justify-center items-center '>
      <h3 className='rubik-h text-center'style={{fontSize:"17px"}}>Social media</h3>
 <a href={""}>
   {<Button sx={{color:"#FDBA74",textTransform:"none"}}   startIcon={<InstagramIcon />} variant="text" className="text-center">Instagram</Button>}
   </a>
      </div>
      <div className="mx-auto font-bold md:col-span-4">&copy;2026 Uc enterprise</div>
</div>

    </div>
    </>
  )
}
export default Index