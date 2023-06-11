import React, { useState } from 'react'

const Paths = () => {
  const [mode,setmode]=useState(1)
  const [running,setrunning]=useState(0)
  const[start,setstart]=useState(-1)
  const[end,setend]=useState(-1)
  const setwall=()=>{
    for(let i=0;i<40;i++){
      let k=Math.floor(Math.random()*20);
      let j=Math.floor(Math.random()*30);
      if(100*k+j!==start && 100*k+j!==end){
      document.getElementById(`${100*k+j}`).innerHTML="<img src='wall.jpg' alt='n' height=29px width=29px/>"
      document.getElementById(`${100*k+j}`).style.backgroundColor="grey"
      }
    }
  }
  const clearb=()=>{
    if(running){return}
    setstart(-1)
    setend(-1)
    setmode(1)
    document.getElementById("b1").style.backgroundColor="red"
    document.getElementById("b2").style.backgroundColor="white"
    document.getElementById("b3").style.backgroundColor="white"
    document.getElementById("b4").style.backgroundColor="white"
    document.getElementById("b5").style.backgroundColor="white"
    for(let i=0;i<20;i++){
      for(let j=0;j<30;j++){
        document.getElementById(`${100*i+j}`).innerHTML=""
        document.getElementById(`${100*i+j}`).style.backgroundColor="white"
      }
    }
  }

  const isavail=(n)=>{
    if (Math.floor(n/100)<0 || Math.floor(n/100)>19 || n%100>29){return 0}
    if (document.getElementById(n).style.backgroundColor==="grey"){return 0}
    return 1
  }

  const ispresent=(arr,x)=>{
    let ans=0;
    for(let i=0;i<arr.length;i++){
      if(arr[i]===x){ans=1}
    }
    return ans
  }

  // algorithms
  const bfs=async()=>{
    if(running){return}
    document.getElementById("b4").style.backgroundColor="red"
    document.getElementById("b5").style.backgroundColor="white"
    setrunning(1)
    let visited=[start]
    let parent={} 
    let arr=[start]
    while(1){
      let found=0
      let newarr=[]
      for(let i=0;i<arr.length;i++){
        let e=arr[i]
        document.getElementById(e).style.backgroundColor="#deeaee"
        
        console.log("inside bfs",e)
        if(isavail(e-100) && ! ispresent(visited,e-100)){newarr.push(e-100);visited.push(e-100);document.getElementById(e-100).style.backgroundColor="lightblue"; parent[e-100]=e;if(e-100===end){found=1}}
        if(isavail(e+100) && ! ispresent(visited,e+100)){newarr.push(e+100);visited.push(e+100);document.getElementById(e+100).style.backgroundColor="lightblue"; parent[e+100]=e;if(e+100===end){found=1}}
        if(isavail(e-1) && ! ispresent(visited,e-1)){newarr.push(e-1);visited.push(e-1);document.getElementById(e-1).style.backgroundColor="lightblue"          ; parent[e-1]=e;if(e-1===end){found=1}}
        if(isavail(e+1) && ! ispresent(visited,e+1)){newarr.push(e+1);visited.push(e+1);document.getElementById(e+1).style.backgroundColor="lightblue"          ; parent[e+1]=e;if(e+1===end){found=1}}        
      };
      await sleep(200)
      if (found===1){
        let now=end;
        let path=[]
        while(now!==start){
          // document.getElementById(now).style.backgroundColor="violet"
          path.push(now)
          now=parent[now]
        }
        console.log(path)
        for(let i=path.length-1;i>=0;i--){
          document.getElementById(path[i]).style.backgroundColor="yellow"
          await sleep(50)
        }
        break
      }
      arr=newarr
      // break
    }
    setrunning(0)
  }
  const dfs=async()=>{
    if(running){return}
    document.getElementById("b4").style.backgroundColor="white"
    document.getElementById("b5").style.backgroundColor="red"
    setrunning(1)
    let visited=[start]
    let parent={} 
    let arr=new Array([])
    arr.push(start)
    while(1){
      let found=0
      let e=arr[arr.length-1];
      arr=arr.slice(0,arr.length-1);
      if(isavail(e-100) && ! ispresent(visited,e-100)){arr.push(e-100);visited.push(e-100); parent[e-100]=e;}
      if(isavail(e-1) && ! ispresent(visited,e-1)){arr.push(e-1);visited.push(e-1); parent[e-1]=e;}
      if(isavail(e+100) && ! ispresent(visited,e+100)){arr.push(e+100);visited.push(e+100); parent[e+100]=e;}
      if(isavail(e+1) && ! ispresent(visited,e+1)){arr.push(e+1);visited.push(e+1); parent[e+1]=e;}        
      if(e===end){found=1}
      document.getElementById(e).style.backgroundColor="blue"
      // console.log(e,arr)
      await sleep(50)
      if (found===1){
        let now=end;
        let path=[]
        while(now!==start){
          path.push(now)
          now=parent[now]
        }
        for(let i=path.length-1;i>=0;i--){
          document.getElementById(path[i]).style.backgroundColor="yellow"
          await sleep(50)
        }
        break
      }
    }
    setrunning(0)
  }
  return (
    <div style={{display:"flex"}}>
      <div style={{ width:"300px"}}>
        <div>sidebar</div>
        <img src="logo192.png" alt="n" width={"20px"} height={"20px"}></img>
        <div>
          <button onClick={()=>{setmode(1)
              document.getElementById("b1").style.backgroundColor="red"
              document.getElementById("b2").style.backgroundColor="white"
              document.getElementById("b3").style.backgroundColor="white"
          }} id="b1">startnode</button>
          <button onClick={()=>{setmode(2)
              document.getElementById("b2").style.backgroundColor="red"
              document.getElementById("b1").style.backgroundColor="white"
              document.getElementById("b3").style.backgroundColor="white"
              console.log(mode)
          }} id="b2">endnode</button>
          <button onClick={()=>{setmode(3)
              document.getElementById("b3").style.backgroundColor="red"
              document.getElementById("b2").style.backgroundColor="white"
              document.getElementById("b1").style.backgroundColor="white"
          }} id="b3">wall</button>
        </div>
        <div>
        <button onClick={setwall}>Random-wall</button>
        <button onClick={clearb}>clear board</button>
        </div>
        <div>
          <div>Algorithms</div>
        <button onClick={bfs}  id='b4'>BFS(or)Djkstra</button>
        <button onClick={dfs}  id='b5'>DFS</button>
        </div>
      </div>
        
      <div className="Grid" style={{border:"solid",borderColor:"lightblue", margin:"0px",padding:"0px", width:"920px"}}>
        {Array.apply(0, Array(20)).map(function (x, i) {
          return  <div className={`row-${i}`} style={{display:"flex",justifyContent:"center"}}>
            {Array.apply(0, Array(30)).map(function (y, j) {
                return  <div id={`${100*i+j}`} style={{ width:"30px",height:"30px",border:"solid 1px",borderColor:"lightgreen"}} onClick={
                  ()=>{
                    if(mode===1){
                      if(document.getElementById(`${100*i+j}`).style.backgroundColor==="grey" && 100*i+j===start){
                        document.getElementById(`${100*i+j}`).innerHTML=""
                        document.getElementById(`${100*i+j}`).style.backgroundColor="white"
                        setstart(-1)
                      }else if(start===-1){
                      document.getElementById(`${100*i+j}`).innerHTML="<img src='start.jpg' alt='n' height=29px width=29px/>"
                      document.getElementById(`${100*i+j}`).style.backgroundColor="grey"
                      setstart(100*i+j)
                      }
                    }
                    if(mode===2){
                      if(document.getElementById(`${100*i+j}`).style.backgroundColor==="violet"&& 100*i+j===end){
                        document.getElementById(`${100*i+j}`).innerHTML=""
                        document.getElementById(`${100*i+j}`).style.backgroundColor="white"
                        setend(-1)
                      }else if(end===-1){
                      document.getElementById(`${100*i+j}`).innerHTML="<img src='end.jpg' alt='n' height=29px width=29px/>"
                      document.getElementById(`${100*i+j}`).style.backgroundColor="violet"
                      setend(100*i+j)
                      }
                    }
                    if(mode===3){
                      if(document.getElementById(`${100*i+j}`).style.backgroundColor==="grey"){
                        document.getElementById(`${100*i+j}`).innerHTML=""
                        document.getElementById(`${100*i+j}`).style.backgroundColor="white"
                      }else {
                      document.getElementById(`${100*i+j}`).innerHTML="<img src='wall.jpg' alt='n' height=29px width=29px/>"
                      document.getElementById(`${100*i+j}`).style.backgroundColor="grey"
                      }
                    }
                  }
                }></div>
            })}
        </div>})
        }
        </div>
    </div>);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default Paths