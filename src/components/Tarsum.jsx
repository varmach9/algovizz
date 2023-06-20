import React, { useState,useEffect } from 'react'
import YoutubeEmbed from './utils/Youtube'
const Tarsum = () => {
    const [arr,setarr]= useState([1,2,3,4,4,5,5,7,8,10,11,12,14,15,17])
    const [target,settarget]=useState(23)
    const [running,setrunning]=useState(0)
    const [str,setstr]=useState("")
    const [str2,setstr2]=useState("")
    useEffect(()=>{window.scroll({
      top: 0, 
      behavior:"instant"
    });},[])
    const twosum=async()=>{
      document.getElementById("result").innerHTML=""
      if (arr.length<2){return}
      if(running){return}
      for(let p=0;p<=arr.length-1;p++){ document.getElementById(p).style.backgroundColor="white"  }
      setrunning(1)
      let i=0;
      let j=arr.length-1;
      let found=0;
      document.getElementById(i).style.backgroundColor="green"
      document.getElementById(j).style.backgroundColor="green"
      await sleep(500)
      while(i<j && found===0){
        console.log(arr[i],arr[j],arr[i]+arr[j],target,arr[i]+arr[j]===target)
        if(arr[i]+arr[j]===target){
          found=1;
          break
        }
        if(arr[i]+arr[j]<target){
          i++;
          document.getElementById(i-1).style.backgroundColor="red" 
          document.getElementById(i).style.backgroundColor="green"
          await sleep(500)
        }
        if(arr[i]+arr[j]>target){
          j--;
          document.getElementById(j+1).style.backgroundColor="red" 
          document.getElementById(j).style.backgroundColor="green" 
          await sleep(500)
        }
      }
      if (found===1){
        for(let i=0;i<arr.length;i++){
          if(document.getElementById(i).style.backgroundColor!=="green"){document.getElementById(i).style.backgroundColor="white"}
        }
      document.getElementById("result").innerHTML=` the values at indices ${i} and ${j} add upto target-sum`
      }else{
        for(let i=0;i<arr.length;i++){
        document.getElementById(i).style.backgroundColor="white"
      }
        document.getElementById("result").innerHTML=` target-sum can't be found `
      }
      setrunning(0)
    }
    const threesum=async()=>{
      document.getElementById("result").innerHTML=""
      if(running){return}
      if (arr.length<3){return}
      for(let p=0;p<=arr.length-1;p++){ document.getElementById(p).style.backgroundColor="white"  }
      setrunning(1)
      let i=1;
      let j=arr.length-1;
      let found=0;
      await sleep(500)
      for(let k=0;k<arr.length-2;k++){
        if (found===1){break;} 
        if(k!==0){  document.getElementById(k-1).style.backgroundColor="grey"  }
        document.getElementById(k).style.backgroundColor="violet"
        await sleep(500)
        let i=k+1;
        let j=arr.length-1;
        for(let p=i;p<=j;p++){ document.getElementById(p).style.backgroundColor="white"  }
        await sleep(200)
        document.getElementById(i).style.backgroundColor="green"
        document.getElementById(j).style.backgroundColor="green"
        await sleep(200)
        while(i<j && found===0){
          console.log(arr[k],arr[i],arr[j],target,arr[i]+arr[j]+arr[k]-target)
          if(arr[i]+arr[j]===target-arr[k]){
            found=1;
            document.getElementById(k).style.backgroundColor="green"
            break
          }
          if(arr[i]+arr[j]<target-arr[k]){
            i++;
            document.getElementById(i-1).style.backgroundColor="red" 
            document.getElementById(i).style.backgroundColor="green"
            await sleep(200)
          }
          if(arr[i]+arr[j]>target-arr[k]){
            j--;
            document.getElementById(j+1).style.backgroundColor="red" 
            document.getElementById(j).style.backgroundColor="green" 
            await sleep(200)
          }
      }
    }
      if (found){
        for(let p=0;p<arr.length;p++){
          if(document.getElementById(p).style.backgroundColor!=="green"){document.getElementById(p).style.backgroundColor="white"}
        }
        
        document.getElementById("result").innerHTML=` the values in green boxes add upto target-sum`
        }else{
          for(let i=0;i<arr.length;i++){
            document.getElementById(i).style.backgroundColor="white"
          }
          document.getElementById("result").innerHTML=` target-sum can't be found `
        }
      setrunning(0)
      console.log(i,j,"out")
  }
    const handleSubmit=(event)=>{
      if(running){return}
      document.getElementById("result").innerHTML=``
      for(let i=0;i<arr.length;i++){ document.getElementById(i).style.backgroundColor="white"}
      let t=str.split(" ")
      let newarr=[]
      t.forEach(element => {
        newarr.push(Number(element))
      });
      newarr.sort(function(a, b){return a-b})
      console.log(newarr)
      setarr(newarr)
      event.preventDefault();
    }
    const handleSubmit2=(event)=>{
      if(running){return}
      document.getElementById("result").innerHTML=``
      for(let i=0;i<arr.length;i++){ document.getElementById(i).style.backgroundColor="white"}
      settarget(Number(str2))
      console.log(Number(str2))
      event.preventDefault();
    }
    const randomize=()=>{
      if(running){return}
      let t=[]
      document.getElementById("result").innerHTML=""
      for(let i=0;i<15;i++){
        t.push(Math.ceil(Math.random()*15))
        document.getElementById(i).style.backgroundColor="white"
      }
      t.sort(function(a, b){return a-b})
      setarr(t)
    }
  return (
    <div style={{marginLeft:"50px"}}>
        <div style={{display:"flex",justifyContent:"center",width:"1300px",margin:"10px"}}><h1 style={{fontWeight:"bolder",color:"purple", textShadow: "0 0 1px blue",paddingLeft:"235px",paddingRight:"5px"}}>Target Sum</h1></div>

      <div style={{marginLeft:'100px'}}>
        <div>
        <form onSubmit={handleSubmit} style={{margin:"10px"}} >
                  <label>
                    Array input:
                    <input type="text" style={{marginLeft:"17px"}} value={str} onChange={(e)=>{
                        if(running){return}
                        setstr(e.target.value)}}/>
                  </label>
                  <input type="submit" class="btn btn-warning btn-sm"  style={{marginLeft:"20px"}} value="Submit" />
          </form>
          <form onSubmit={handleSubmit2} style={{margin:"10px"}}>
                  <label>
                    Target input:
                    <input type="integer" style={{marginLeft:"10px"}} value={str2} onChange={(e)=>{
                        if(running){return}
                        setstr2(e.target.value)}}/>
                  </label>
                  <input type="submit" class="btn btn-warning btn-sm" style={{marginLeft:"20px"}} value="Submit" />
          </form>
          <div style={{display:"flex"}}>
            <button style={{marginRight:'20px',marginTop:'20px'}} class="btn btn-primary btn-sm" onClick={twosum}>Two-sum</button>
            <button style={{marginRight:'20px',marginTop:'20px'}} class="btn btn-primary btn-sm" onClick={threesum}>Three-sum</button>
            <button style={{marginRight:'20px',marginTop:'20px'}} class="btn btn-primary btn-sm" onClick={randomize}>Randomize Array</button>
          </div>
        </div>
      </div>
      <div style={{display:"flex",marginLeft:'100px',marginTop:"20px"}}>Target = {target}</div>
      <div style={{display:"flex",justifyContent:"center"}}>
        {arr.map((val,ind)=>{
          return <div id={ind} style={{display:"flex",width:"50px",height:"50px",paddingTop:"10px",justifyContent:"center",border:"solid",marginLeft:"10px",marginTop:"20px",marginBottom:"20px"}}>{val}</div>
        })}
      </div>
        {/* <div>{target}</div> */}
        <div style={{marginLeft:"100px",marginBottom:"40px",display:"flex"}}>
          <div style={{marginRight:"10px"}}>Result:</div>
          <div id="result"></div>
        </div>
        <div style={{marginLeft:"100px"}}> Two-sum : finds if two elements in an array sum to given target  </div>
        <div style={{marginLeft:"100px"}}>Three-sum : finds if three elements in an array sum to given target</div>

        <div style={{display:"flex",marginTop:"30px",marginLeft:"50px",color:"orangered"}}><h2>Learn More </h2></div>
    <hr style={{width:"95%",margin:"auto"}}></hr>
    <div className='' style={{display: "flex",marginTop:"30px",marginBottom:"50px",color:"green",textAlign:"center"}}>
        
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="UXDSeD9mN-k" title="2-Sum" />  </div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="BCLfxQja9dI" title="3-Sum"/></div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="2wVjt3yhGwg" title="2 Pointer Technique"/></div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}> </div>
   </div>
    </div>
  )
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default Tarsum