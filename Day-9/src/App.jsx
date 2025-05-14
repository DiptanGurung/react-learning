import React, { useEffect , useState} from 'react'

function Useeffect() {

  const [value, setValue] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log("Nepal has no dependency")
  })

  useEffect(() => {
    console.log("India has value dependency")
  }, [{ value }])

  useEffect(() => {
    console.log("China has 0 dependency")
  }, [])

    useEffect(() => {
    console.log("Korea has count dependency")
  }, [{ count }])

  return (
    <>
      <div className='flex flex-col mt-20 text-2xl'>
        <button onClick={() => setValue(prev => prev+1)} >1</button>
        <button onClick={() => setCount(prev => prev+1)}>2</button>
        <button onClick={() => setValue(prev => prev+1)}>3</button>
      </div>
    </>
  )
}

export default Useeffect