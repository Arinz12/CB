const  Customers=({a,b})=>{
    return(
        <>
        <div className="bg-yellow-500 p-6  rounded-sm text-center text-3x">
            This is the Customers page{a+b}
        </div>
        </>
    )
}
export default Customers
export async function getServerSideProps(context){
console.log("The request method is ",context.req.method)
return {
    props:{a:1,b:2}
}
}