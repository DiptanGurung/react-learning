import React from 'react'

const [curValue,setCurvalue] = useState("Diptan")

function Input() {
  console.log("current Value:",curValue)

  return (
    <>
    
    <input
    type="number"
    className='border-2'
    value={curValue} 
    onChange={(e) => setCurvalue(e.target, curValue)}
    placeholder='Type your number'
    />
    
    
    </>
  )
}

export default Input