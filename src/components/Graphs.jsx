import React from 'react'
import Canvas from './Canvas'
import { useEffect } from 'react'
const Graphs = () => {
  useEffect(()=>{window.scroll({
    top: 0, 
    behavior:"instant"
  });},[])
  return (
    <div>
      {/* <div style={{display:"flex",justifyContent:"center",width:"1500px",margin:"10px"}}><h2 style={{fontWeight:"bolder",color:"blue", textShadow: "0 0 1px blue",paddingLeft:"5px",paddingRight:"5px"}}>GRAPH ALGORITHMS</h2></div> */}
       <Canvas/>
    </div>
  )
}

export default Graphs