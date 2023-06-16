import React, { useState } from 'react'
import YoutubeEmbed from './utils/Youtube'

const Paths = () => {
  const [mode,setmode]=useState(1)
  const [running,setrunning]=useState(0)
  const[start,setstart]=useState(-1)
  const[end,setend]=useState(-1)
  const[speed,setspeed]=useState(100)
  const setwall=()=>{
    for(let i=0;i<40;i++){
      let k=Math.floor(Math.random()*20);
      let j=Math.floor(Math.random()*30);
      if(100*k+j!==start && 100*k+j!==end){
      document.getElementById(`${100*k+j}`).innerHTML="<img src='walll.jpg' alt='n' height=29px width=29px/>"
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
    document.getElementById("b2").style.backgroundColor=""
    document.getElementById("b3").style.backgroundColor=""
    document.getElementById("b4").style.backgroundColor=""
    document.getElementById("b5").style.backgroundColor=""
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
    if(running===1 || start===-1|| end===-1){return}
    document.getElementById("b4").style.backgroundColor="darkorange"
    document.getElementById("b5").style.backgroundColor=""
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
      await sleep(speed)
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
    document.getElementById("b4").style.backgroundColor=""
    setrunning(0)
  }
  const dfs=async()=>{    
    if(running===1 || start===-1|| end===-1){return}
    document.getElementById("b4").style.backgroundColor=""
    document.getElementById("b5").style.backgroundColor="darkorange"
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
      await sleep(speed)
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
    document.getElementById("b5").style.backgroundColor=""
    setrunning(0)
  }
  return (
    <div>
      <div style={{display:"flex",justifyContent:"center",width:"1500px"}}><h1 style={{fontWeight:"bolder",color:"blue", textShadow: "0 0 1px blue"}}>Traversal in a Grid</h1></div>
    
    <div style={{display:"flex",width:"1500px"}}>
      <div style={{ width:"600px",paddingLeft:"50px"}}>
        <div style={{color:"green"}}><h4>Controls:</h4></div>
        <div style={{margin:"10px",display:"flex"}}>
          <div style={{marginRight:"20px"}}>Select Marker: </div>
          <button type="button" class="btn btn-primary btn-sm" style={{backgroundColor:"red",marginRight:"10px"}}onClick={()=>{setmode(1)
              document.getElementById("b1").style.backgroundColor="red"
              document.getElementById("b2").style.backgroundColor=""
              document.getElementById("b3").style.backgroundColor=""
          }} id="b1">Startnode</button>
          <button type="button" class="btn btn-primary btn-sm" style={{marginRight:"10px"}} onClick={()=>{setmode(2)
              document.getElementById("b2").style.backgroundColor="red"
              document.getElementById("b1").style.backgroundColor=""
              document.getElementById("b3").style.backgroundColor=""
              console.log(mode)
          }} id="b2">Endnode</button>
          <button type="button" class="btn btn-primary btn-sm" style={{marginRight:"10px",width:"70px"}} onClick={()=>{setmode(3)
              document.getElementById("b3").style.backgroundColor="red"
              document.getElementById("b2").style.backgroundColor=""
              document.getElementById("b1").style.backgroundColor=""
          }} id="b3">Wall</button>
        </div>
        <div style={{marginTop:"10px",marginLeft:"140px"}}>
        <button type="button" class="btn btn-primary btn-sm" onClick={setwall} style={{marginRight:"10px"}}>Random-wall</button>
        <button type="button" class="btn btn-primary btn-sm" onClick={clearb}>clear board</button>
        </div>
        
        <div style={{marginTop:"5px",marginBottom:"10px",marginLeft:"10px"}}>Adjust Speed:</div>
            <div style={{marginLeft:"20px"}}>
                <button type="button" className={classNames("btn", (speed!==200)?"btn-light":"btn-info", "btn-sm", "border",(speed===200)?"border-link":"",(speed===200)?"border-5":"")} style={{marginLeft:"10px"}} onClick={()=>{setspeed(200)}}>Slow</button>
                <button type="button" className={classNames("btn", (speed!==100)?"btn-light": "btn-info", "btn-sm", "border",(speed===100)?"border-link": "",(speed===100)?"border-5":"")} style={{marginLeft:"10px" }} onClick={()=>{setspeed(100)}}>Medium</button>
                <button type="button" className={classNames("btn", (speed!==40)?"btn-light": "btn-info", "btn-sm", "border",(speed===40)?"border-link": "",(speed===40)?"border-5":"")} style={{marginLeft:"10px" }} onClick={()=>{setspeed(40)}}>Fast</button>
            </div>

        <div style={{margin:"10px"}}>
          <div>Select Algorithms to Visualize:</div>
        <button type="button" class="btn btn-warning btn-sm" onClick={bfs}  id='b4' style={{marginLeft:"10px",marginBottom:"20px",marginTop:"10px"}}>BFS(or)Dijkstra</button>
        <button type="button" class="btn btn-warning btn-sm" onClick={dfs}  id='b5' style={{marginLeft:"10px",marginBottom:"20px",marginTop:"10px"}}>DFS</button>
        </div>
        <div style={{border:"solid",marginRight:"20px",padding:"10px",color:"green",backgroundColor:""}}>
        <div className="grid-traversal">
      <p>
        The following algorithm can be followed to perform grid traversal:
      </p>
      <ol>
        <li>Initialize the grid with false values to indicate that no cell is visited.</li>
        <li>Start the traversal using the cell in the grid.</li>
        <li>Mark the cell as visited.</li>
        <li>Use the direction vectors to generate the neighbors of the cell.</li>
        <li>
          If the generated coordinates are within the matrix and the cell
          represented by the coordinate is unvisited, then make a recursive call
          to the traversal function using this coordinate.
        </li>
        <li>Repeat the steps 2–5 until all the cells in the grid have been visited.</li>
      </ol>
    </div>

        </div>
        
      </div>
        
      <div className="Grid" style={{border:"solid",borderColor:"", margin:"0px",padding:"0px", width:"900px",height:"605px"}}>
        {Array.apply(0, Array(20)).map(function (x, i) {
          return  <div className={`row-${i}`} style={{display:"flex",justifyContent:"center"}}>
            {Array.apply(0, Array(30)).map(function (y, j) {
                return  <div id={`${100*i+j}`} style={{ width:"30px",height:"30px",border:"solid 1px",borderColor:"lightgrey"}} onClick={
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
                      document.getElementById(`${100*i+j}`).innerHTML="<img src='walll.jpg' alt='n' height=29px width=29px/>"
                      document.getElementById(`${100*i+j}`).style.backgroundColor="grey"
                      }
                    }
                  }
                }></div>
            })}
        </div>})
        }
        </div>
    </div>
    <div className="yt-section" style={{paddingLeft:"50px"}}>
    <div style={{display:"flex",marginTop:"30px",color:"orangered",marginLeft:"50px"}}><h2>Learn More </h2></div>
    <hr style={{width:"95%",margin:"auto"}}></hr>
    <div className='' style={{display: "flex",marginTop:"30px",color:"green",textAlign:"center"}}>
        
   <div className="" style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="155rbd224H0" title="DFS in a Grid" /></div>
   <div className="" style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="wNr-CG0AUPk" title="BFS in a Grid" /></div>
   <div className="" style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="sduu1n5uZUE" title="Islands Problem"/></div>
   <div className="" style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="UDQ_FgNbArA" title="Word in a Grid"/></div> 
    </div>
   </div>
   <div style={{marginLeft:"50px"}}>
    <div style={{display:"flex",marginTop:"30px",marginLeft:"10px",color:"orangered"}}><h2>Practice Grid Trversal</h2></div>
    <hr style={{width:"95%",margin:"auto"}}></hr>
<div style={{textAlign:"left",width:"1400px",paddingLeft:"20px",marginBottom:"50px"}}>

      <h5>1. <a href="https://www.geeksforgeeks.org/rat-in-a-maze/" style={{textDecoration:"none"}}> Rat in a Maze</a></h5>
      <p style={{marginLeft:"20px"}}>
        Given a maze represented by a 2D grid, find a path to reach the destination from the starting position. The rat can only move in four directions ( ↑ ↓ → ← ) and cannot move through walls.
      </p>

      <h5>2. <a href="https://www.geeksforgeeks.org/find-the-number-of-islands-using-dfs/" style={{textDecoration:"none"}}> Number of Islands</a></h5>
      <p style={{marginLeft:"20px"}}>
        Given a 2D grid where '1' represents land and '0' represents water, find the number of islands in the grid. An island is formed by connecting adjacent land cells horizontally or vertically.
      </p>

      <h5>3. <a href="https://www.geeksforgeeks.org/search-a-word-in-a-2d-grid-of-characters/" style={{textDecoration:"none"}}> Word Search</a></h5>
      <p style={{marginLeft:"20px"}}>
        Given a 2D grid of characters and a word, determine if the word exists in the grid. The word can be constructed from adjacent cells (horizontally or vertically) in the grid.
      </p>

      <h5>4. <a href="https://www.geeksforgeeks.org/flood-fill-algorithm-implement-fill-paint/" style={{textDecoration:"none"}}> Flood Fill</a></h5>
      <p style={{marginLeft:"20px"}}>
        Given a 2D grid and a starting position, perform a flood fill operation to fill a specific region of the grid with a new color. The flood fill algorithm colors adjacent cells with the same color.
      </p>
      <h5>5. <a href="https://leetcode.com/problems/shortest-bridge/description/" style={{textDecoration:"none"}}> Shortest Bridge</a></h5>
      <p style={{marginLeft:"20px"}}>
        Given a 2D grid where '1' represents land and '0' represents water, find the number of islands in the grid. An island is formed by connecting adjacent land cells horizontally or vertically.
      </p>
      <h5>6. <a href="https://www.geeksforgeeks.org/breadth-first-traversal-bfs-on-a-2d-array/" style={{textDecoration:"none"}}> BFS in a Grid</a></h5>
      <p style={{marginLeft:"20px"}}>
      Given a matrix of size M x N consisting of integers, the task is to print the matrix elements using Breadth-First Search traversal.
      </p>
      <h5>7. <a href="https://www.geeksforgeeks.org/depth-first-traversal-dfs-on-a-2d-array/" style={{textDecoration:"none"}}> DFS in a Grid</a></h5>
      <p style={{marginLeft:"20px"}}>
      Given a matrix of size M x N consisting of integers, the task is to print the matrix elements using Depth-First Search traversal.
      </p>
</div>
    </div>
    </div>
    );
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function classNames(...args) {
  return args.filter(Boolean).join(' ')
}

export default Paths