import { Button } from "@mui/material"
import Link from "next/link"
import Head from "next/head"
import "@fontsource/roboto"
import { ArrowForwardIosRounded, Forward } from "@mui/icons-material"
import Image from "next/image"
import Carousel from "@/components/Carousel"

  const newItems=[
    {
 title: "'MEN's SPECIAL'",
    description: 'Cool Fragrance for men.',
    id: 1,
    icon: null
    },
      {
 title: "'WOMEN's SPECIAL'",
    description: 'Cool Fragrance for women.',
    id: 1,
    icon: null
    },
  ]

const Index=()=>{
  return(
    <>
    <Head>

      <title>UC | Home</title>
    </Head>
    <div style={{height:"70vh",backgroundColor:"wheat"}} className="relative md:static flex flex-col items-center mx-auto text-center">
<div className="hidden  md:flex flex-row justify-between w-full px-7 items-center  mt-3">
  <span className="text-black font-bold cta"> <Link href={"/"}>Home</Link></span>
  <span className="text-black font-bold cta"> <Link href={"/product"}>Product</Link></span>
  <span className="text-black font-bold cta"> <Link href={"/about"}>About</Link> </span>
  <span className="text-black font-bold cta"> <Link href={"/"}>Location</Link></span>
</div>
<div className="md:flex  overflow-hidden flex-row justify-between items-center px-2 mt-6">
<Image className="animate-pulse1 reveal" priority={true} alt={"perfume"}  width={400} height={300} src={"/perf.png"}/>
<div className="md:flex md:bg-transparent overflow-hidden  bg-black/50 flex rounded-md md:static   w-full left-0  absolute top-0 h-full  flex-col gap-7  justify-center items-center">
      <div className="absolute top-0 left-1 md:hidden text-white">UC</div>
      <div className="text-white text-3xl slide">STRONG AND LASTING FRAGRANCE FOR EVERYONE</div>
      <Button sx={{backgroundColor:"black"}}  variant="contained" endIcon={<ArrowForwardIosRounded/>} className="cta mx-auto slide w-30">Shop now</Button>
</div></div>
    </div>
    <div className="mx-auto mt-3 flex flex-col justify-center items-center gap-2 text-center">
      <p className="text-2xl font-semibold">Featured Collections</p>


<div className="mx-auto text-center" style={{ height: '600px', position: 'relative' }}>
  <Carousel
  items={newItems}
    baseWidth={300}
    autoplay
    autoplayDelay={3000}
    pauseOnHover={false}
    loop={true}
    round={false}
  />
</div>
    </div>
    </>
  )
}
export default Index