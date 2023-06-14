import React, { useState } from 'react'

const Search = () => {
    const [arr,setarr]= useState([11,2,13,4,4,15,5,7,8,10,11,12,14,15,17,19,21,23,24,30])
    const [target,settarget]=useState(23)
    const [running,setrunning]=useState(0)
    const [str,setstr]=useState("")
    const [str2,setstr2]=useState("")

    const ls=async()=>{
        if (running){return}
        
        setrunning(1)
        let found=0
        for(let i=0;i<arr.length;i++){
            document.getElementById(i).style.backgroundColor="green"
            await sleep(1000)
            if(arr[i]===target){
                found=1
                for(let k=0;k<arr.length;k++){document.getElementById(k).style.backgroundColor="grey"}
                document.getElementById(i).style.backgroundColor="green"
                break
            }else{
            document.getElementById(i).style.backgroundColor="red"
            await sleep(1000)
            document.getElementById(i).style.backgroundColor="grey"
            }
        }
        if(found===1){
            document.getElementById("result").innerHTML="found"
          }else{
            document.getElementById("result").innerHTML="not found"
          }
        setrunning(0)
    }
    const bs=async()=>{
        if (running){return}
        setrunning(1)
        let found=0
        let newarr=[]
        arr.forEach(element => {
        newarr.push(Number(element))
      });
       newarr.sort(function(a, b){return a-b})
      setarr(newarr)
      let i=0;
      let j=newarr.length-1;
      while(i<=j){
        let mid=Math.floor((i+j)/2)
        document.getElementById(mid).style.backgroundColor="green"
        await sleep(1000)
        if(newarr[mid]===target){
            await sleep(500)
            found=1
            for(let k=0;k<newarr.length;k++){document.getElementById(k).style.backgroundColor="grey"}
            document.getElementById(mid).style.backgroundColor="green"
            break
        }else if(newarr[mid]>target){
            document.getElementById(mid).style.backgroundColor="red"
            await sleep(1000)
            for(let k=mid;k<=j;k++){
                document.getElementById(k).style.backgroundColor="grey"
            }
            j=mid-1;
        }else if(newarr[mid]<target){
            document.getElementById(mid).style.backgroundColor="red"
            await sleep(1000)
            for(let k=i;k<=mid;k++){
                document.getElementById(k).style.backgroundColor="grey"
            }
            i=mid+1;
        }
        await sleep(1000)
        document.getElementById(mid).style.backgroundColor="grey"
      }
      if(found===1){
        document.getElementById("result").innerHTML="found"
      }else{
        document.getElementById("result").innerHTML="not found"
      }
      setrunning(0)
    }
    const es=async()=>{
        if (running){return}
        setrunning(1)
        let found=0
        let newarr=[]
        arr.forEach(element => {
        newarr.push(Number(element))
      });
       newarr.sort(function(a, b){return a-b})
      setarr(newarr)

      let ind = 1;
      while (ind < newarr.length && newarr[ind] < target){
        console.log(ind,newarr[ind])
        document.getElementById(ind).style.backgroundColor="green"
        await sleep(1000)
        document.getElementById(ind).style.backgroundColor="red"
        for(let k=0;k<=ind;k++){
            document.getElementById(k).style.backgroundColor="grey"
        }
        await sleep(1000)
        ind = ind * 2;
    }
    if(newarr[ind]===target){
        document.getElementById(ind).style.backgroundColor="green"
        await sleep(1000)
        for(let k=0;k<newarr.length;k++){document.getElementById(k).style.backgroundColor="grey"}
        document.getElementById(ind).style.backgroundColor="green"
        document.getElementById("result").innerHTML="found"
        setrunning(0)
        return 1
    }else if(ind<newarr.length && newarr[ind]>target){
        document.getElementById(ind).style.backgroundColor="green"
        await sleep(1000)
        document.getElementById(ind).style.backgroundColor="red"
    }
      let i=Math.floor(ind/2)+1;
      let j=Math.min(newarr.length-1,ind-1);
        for(let k=j+1;k<newarr.length;k++){
        document.getElementById(k).style.backgroundColor="grey"
        }
        await sleep(1000)
      while(i<=j){
        let mid=Math.floor((i+j)/2)
        document.getElementById(mid).style.backgroundColor="green"
        await sleep(1000)
        if(newarr[mid]===target){
            await sleep(500)
            found=1
            for(let k=0;k<newarr.length;k++){document.getElementById(k).style.backgroundColor="grey"}
            document.getElementById(mid).style.backgroundColor="green"
            break
        }else if(newarr[mid]>target){
            document.getElementById(mid).style.backgroundColor="red"
            await sleep(1000)
            for(let k=mid;k<=j;k++){
                document.getElementById(k).style.backgroundColor="grey"
            }
            j=mid-1;
        }else if(newarr[mid]<target){
            document.getElementById(mid).style.backgroundColor="red"
            await sleep(1000)
            for(let k=i;k<=mid;k++){
                document.getElementById(k).style.backgroundColor="grey"
            }
            i=mid+1;
        }
        await sleep(1000)
        document.getElementById(mid).style.backgroundColor="grey"
      }
      if(found===1){
        document.getElementById("result").innerHTML="found"
      }else{
        document.getElementById("result").innerHTML="not found"
      }
      setrunning(0)
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
    //   t.sort(function(a, b){return a-b})
      console.log(t)
      setarr(t)
      event.preventDefault();
    }
    const handleSubmit2=(event)=>{
      if(running){return}
      document.getElementById("result").innerHTML=``
      for(let i=0;i<arr.length;i++){ document.getElementById(i).style.backgroundColor="white"}
      settarget(Number(str2))
      event.preventDefault();
    }
    const randomize=()=>{
      if(running){return}
      let t=[]
      document.getElementById("result").innerHTML=""
      for(let i=0;i<20;i++){
        t.push(Math.ceil(Math.random()*30))
        document.getElementById(i).style.backgroundColor="white"
      }
    //   t.sort(function(a, b){return a-b})
      setarr(t)
    }
  return (
    <div>
      <div style={{display:"flex"}}>
        <div>
        <form onSubmit={handleSubmit}>
                  <label>
                    Array input:
                    <input type="text" value={str} onChange={(e)=>{
                        if(running){return}
                        setstr(e.target.value)}}/>
                  </label>
                  <input type="submit" value="Submit" />
          </form>
          <form onSubmit={handleSubmit2}>
                  <label>
                    Target input:
                    <input type="integer" value={str2} onChange={(e)=>{
                        if(running){return}
                        setstr2(e.target.value)}}/>
                  </label>
                  <input type="submit" value="Submit" />
          </form>
          <div>
            <button onClick={ls}>Linear search</button>
          </div>
          <div>
            <button onClick={bs}>Binary-search</button>
          </div>
          <div>
            <button onClick={es}>Exponential-search</button>
          </div>
          <div>
            <button onClick={randomize}>Randomize Array</button>
          </div>
        </div>
      </div>
      <div>target = {target}</div>
      <div style={{display:"flex",justifyContent:"center"}}>
        {arr.map((val,ind)=>{
          return <div id={ind} style={{display:"flex",width:"30px",height:"30px",justifyContent:"center",border:"solid",marginLeft:"10px",marginTop:"20px",marginBottom:"20px"}}>{val}</div>
        })}
      </div>
        {/* <div>{target}</div> */}
        <div id="result"></div>
    </div>
  )
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default Search