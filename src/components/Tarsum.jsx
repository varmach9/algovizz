import React, { useState } from 'react'

const Tarsum = () => {
    const [arr,setarr]= useState([1,2,3,4,5,7,8,11])
    const [target,settarget]=useState([8])
    const [running,isrunning]=useState(0)
    const [str,setstr]=useState("")
    const [str2,setstr2]=useState("")
    const twosum=()=>{}
    const threesum=()=>{}
    const handleSubmit=(event)=>{
      let t=str.split(" ")
      let newarr=[]
      t.forEach(element => {
        newarr.push(Number(element))
      });
      t.sort(function(a, b){return a-b})
      console.log(t)
      setarr(t)
      event.preventDefault();
    }
    const handleSubmit2=(event)=>{
      settarget(str2)
      event.preventDefault();
    }
    const randomize=()=>{
      let t=[]
      for(let i=0;i<15;i++){
        t.push(Math.ceil(Math.random()*15))
      }
      t.sort(function(a, b){return a-b})
      setarr(t)
    }
  return (
    <div>
      <div style={{display:"flex"}}>
        <div>
        <form onSubmit={handleSubmit}>
                  <label>
                    Array input:
                    <input type="text" value={str} onChange={(e)=>{setstr(e.target.value)}}/>
                  </label>
                  <input type="submit" value="Submit" />
          </form>
          <form onSubmit={handleSubmit2}>
                  <label>
                    Target input:
                    <input type="integer" value={str2} onChange={(e)=>{setstr2(e.target.value)}}/>
                  </label>
                  <input type="submit" value="Submit" />
          </form>
          <div>
            <button onClick={randomize}>Randomize Array</button>
          </div>
        </div>
      </div>
      <div>
        {arr.map((val,ind)=>{
          return <div>{val}</div>
        })}
      </div>
        {/* <div>{target}</div> */}
        <div> Two-sum Algorithm: finds if two elements in an array sum to given target  </div>
        <div>Three-sum Algorithm: finds if three elements in an array sum to given target</div>
    </div>
  )
}

export default Tarsum