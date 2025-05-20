import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [data, setData] = useState(null)
  const [isloading, setIsloading] = useState(false)
  const [error, setError] = useState(null);

  const fetchData = () => {
    setIsloading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((value) => {
        // console.log("Value is : ", value)
        return value.json();
      })
      .then((data) => {
        console.log("Response data is : ", data[0]);
        setIsloading(false);
        setData(data);
      })
      .catch((error) => {
        setIsloading(false);
        setError(error);
        console.log("Error is : ", error);
      });
  };


  useEffect(() => {
    fetchData();
  }, []);

  if (isloading) {
    return <span>Loading ..... </span>;
  }

  return (
    <>
      <div className='h-screen w-full bg-slate-200'>
        {data && data.map((value, index) => {
          return (
            <div key={index} className='h-fit w-fit bg-blue-500 my-2'>
              <h1>{value?.id}</h1>
              <h1>{value?.title}</h1>
              <h1>{value?.body}</h1>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App
