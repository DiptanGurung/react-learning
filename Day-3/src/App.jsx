import { useState } from "react"
import Color from "./Color";


 function App(){
const [value,setValue]=useState(0);
const [data,setData]=useState(0);
  return(
    <>
  <div className="bg-yellow-500 my-6">

    <div className="bg-green-100">
      <p>value is: {value}</p>
      <button className="bg-indigo-600 px-10 py-2" onClick={()=>setValue(value=>value+1)}>Incremet:{value}</button>
    </div>
    <div className="bg-green-100">
      <p>value is: {data}</p>
      <button className="bg-red-600 px-8 py-2" onClick={()=>setData(value=>value-1)}>Decremet:{data}</button>
    </div> 

  </div>
   <Color/>
    </>
  )
}


export default  App;