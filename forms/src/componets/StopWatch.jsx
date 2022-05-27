import React, { useEffect, useRef,useState } from 'react'

const StopWatch = () => {
//   const [timerId,setTimerId] = useState(null);
const timerId = useRef(null)
  const [watch,setWatch] = useState(0);
 
  const start = ()=>{
      console.log(0)
      if(!timerId.current){
          let id = setInterval(() => {
              setWatch((prev)=> prev + 1)
              
          },1000);
          timerId.current = id;
      }
  }

  const pause = ()=>{
      clearInterval(timerId.current)
      console.log("a")
      timerId.current = null
  }
  const reset  = ()=>{
      clearInterval(timerId.current)
      setWatch(0)
      timerId.current = null
  }

  useEffect(()=>{
      return reset
  },[]);

  return (
      <>
    <div>
      <h2>StopWatch</h2>
      <h1>{watch}</h1>
    </div>

    <button onClick={start}>start</button>
    <button onClick={pause}>pause</button>
    <button onClick={reset}>reset</button>
    </>
  )
}

export default StopWatch