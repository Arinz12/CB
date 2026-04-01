import Link from "next/link"
import Head from "next/head"
import Image from "next/image"
import { Button } from "@mui/material"
import InstagramIcon from '@mui/icons-material/Instagram';
const About=()=>{
    return (
        <>
        <Head>
            <title>About</title>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Monomaniac+One&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet"/>
        </Head>
<div className="bg-white p-4 w-full">
         <div className=" ml-4 mt-4 flex flex-row justify-between gap-28 items-center w-full">
        <div className="gvr  text-2xl ">UC PERFUME</div>
        <div className="hidden  md:flex flex-row justify-between w-full px-7 items-center  mt-3">
          <span className="text-black font-bold gvr cta"> <Link href={"/"}>Home</Link></span>
          <span className="text-black font-bold gvr cta"> <Link href={"/product"}>Product</Link></span>
          <span className="text-black font-bold gvr cta"> <Link href={"/about"}>About</Link> </span>
          <span className="text-black font-bold gvr cta"> <Link href={"/"}>Location</Link></span>
        </div>
        </div>
        
        <div className="text-center p-5 flex flex-col-reverse items-center justify-between md:flex-row mt-12">
<div className=" md:max-w-96">
        <p className=" bg-white md:text-7xl gvr text-4xl text-orange-600"><u>About us</u></p>
        <span className="rubik-b text-orange-400">Official Oil Perfume is a fast-growing fragrance brand based in Anambra state, Nigeria. The brand was created to provide affordable luxury perfumes that last long and make people feel confident</span>
</div>
        <Image className="shrink-0"  priority={true} alt={"perfume"}  width={400} height={300} src={"/perf.png"}/>
</div>

 <div className="text-center p-5 flex flex-col-reverse items-center justify-between md:flex-row-reverse mt-4">
<div className=" md:max-w-96">
        <p className=" bg-white md:text-7xl gvr text-4xl text-orange-600"><u>Our mission</u></p>
        <span className="rubik-b text-orange-400">We are relentless in giving quality we do as we say. Trust us and be satisfied. We make sure to present the best for all tastes</span>
</div>
        <Image className="shrink-0"  priority={true} alt={"perfume"}  width={400} height={300} src={"/perf.png"}/>
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
export default About