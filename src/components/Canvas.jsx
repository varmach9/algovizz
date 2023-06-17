import  React, { useState,useEffect} from 'react';
import LeaderLine from "leader-line-new";
import YoutubeEmbed from './utils/Youtube';

function Canvas(){
  const [nodes,Setnodes]=useState(1)
  const [arr,setarr]=useState([])
  const [running,setrunning]=useState(0)
  const [adjlist,setadjlist]=useState([[]])
  const [adjMat,setadjMat]=useState([[0]])
  useEffect(() => {
    console.log(nodes,arr)
  }, [nodes,arr]);
  // for edge setting form
  const [a,seta]=useState(1)
  const [b,setb]=useState(2)
  const [c,setc]=useState(1)
  // for starting node form
  const [d,setd]=useState(1) 

//  algorithms

// bfs
const bfs=async()=>{
  if(running){return}
  if (nodes===0||nodes===1){
    alert("not enough nodes to execute algorithm");
    return;
  }
  if (d>=nodes){
    alert("wrong starting node");
    return;
  }
  setrunning(1)
  document.getElementById(`resultText`).innerText="";
  for(let i=0;i<nodes-1;i++){
    document.getElementById(`${arr[i]}`).style.backgroundColor="green";
  }
    const queue = [d];
    const graph=adjlist;
    const visited = new Set();
    const result = [];
  
    while (queue.length) {
      const vertex = queue.shift();
      if (!visited.has(vertex)) {
        visited.add(vertex);
        result.push(vertex);
        document.getElementById(`${arr[vertex-1]}`).style.backgroundColor="red";
        document.getElementById(`resultText`).innerText=document.getElementById(`resultText`).innerText+` ${vertex} - `;
        await sleep(1000);
        for (const neighbor of graph[vertex]) {
          queue.push(neighbor);
        }
      }
    }
    document.getElementById(`resultText`).innerText=document.getElementById(`resultText`).innerText.slice(0,document.getElementById(`resultText`).innerText.length-2)
    console.log(result);
setrunning(0)
  }
// dfs
const dfs=async()=>{
  if(running){return}
  if (nodes===0||nodes===1){
    alert("not enough nodes to execute algorithm");
    return;
  }
  if (d>=nodes){
    alert("wrong starting node");
    return;
  }
  setrunning(1)
  document.getElementById(`resultText`).innerText="";
  for(let i=0;i<nodes-1;i++){
    document.getElementById(`${arr[i]}`).style.backgroundColor="green";
  }
  const stack = [d];
  const graph=adjlist;
  const visited = new Set();
  const result = [];

  while (stack.length) {
    const vertex = stack.pop();
    if (!visited.has(vertex)) {
      visited.add(vertex);
      result.push(vertex);
        document.getElementById(`${arr[vertex-1]}`).style.backgroundColor="red";
        document.getElementById(`resultText`).innerText=document.getElementById(`resultText`).innerText+` ${vertex} - `;
        await sleep(1000);
        for (const neighbor of graph[vertex]) {
        stack.push(neighbor);
      }
    }
  }
  console.log(result);
  document.getElementById(`resultText`).innerText=document.getElementById(`resultText`).innerText.slice(0,document.getElementById(`resultText`).innerText.length-2)

setrunning(0)

} 
// djkstras
const djk=async(graph=adjlist, src=d)=> {
  if(running){return}
  if (nodes===0||nodes===1){
    alert("not enough nodes to execute algorithm");
    return;
  }
  if (src>=nodes){
    alert("wrong starting node");
    return;
  }
  
  setrunning(1)
  document.getElementById(`resultText`).innerText="";
  for(let i=0;i<nodes-1;i++){
    document.getElementById(`${arr[i]}`).style.backgroundColor="green";
  }
console.log(adjMat)
let visited=[]
for(let i=0;i<nodes;i++){visited.push(0)}
let values=[]
for(let i=0;i<nodes;i++){values.push(1000000)}
values[d]=0
let contentionList=[d]
while(1){
  let mini=1000000
  let miniel=0
  for(const a of contentionList){
    if(mini>values[a]){
      mini=values[a]
      miniel=a
    }
  }
  document.getElementById("resultText").innerHTML+=`${miniel}: "${mini}", `
  document.getElementById(`${arr[miniel-1]}`).style.backgroundColor="red"
  await sleep(1000)
  visited[miniel]=1
  for(const b of adjlist[miniel]) {
    if (visited[b]!==1){
        values[b]=Math.min(values[b],values[miniel]+adjMat[miniel][b])
        contentionList.push(b)
        document.getElementById(`${arr[b-1]}`).style.backgroundColor="purple"
        await sleep(1000)
      }
  }
  const newarr=[]
  contentionList.forEach(element => {
    if (element!==miniel){
      newarr.push(element)
    }
  });
  contentionList=newarr
  if(contentionList.length===0){
    break
  }
}
  document.getElementById("resultText").innerHTML= document.getElementById("resultText").innerHTML.slice(0,document.getElementById("resultText").innerHTML.length-2)
setrunning(0)

}
// bip
const bip=async()=>{
  if(running){return}
  if (nodes===0||nodes===1){
    alert("not enough nodes to execute algorithm");
    return;
  }
  if (d>=nodes){
    alert("wrong starting node");
    return;
  }
  
  setrunning(1)
  for(let i=0;i<nodes-1;i++){
    document.getElementById(`${arr[i]}`).style.backgroundColor="green";
  }
  document.getElementById(`resultText`).innerHTML="checking..";
  let src=[d]
  let now="blue"
  let visited=[]
  for(let i=0;i<nodes+1;i++){visited.push(0)}
  while(1){
    console.log(src)
    let newarr=[];
    now=(now==="blue")?"yellow":"blue"
    for(const ele of src){
      console.log(ele)
      visited[ele]=1
      if (document.getElementById(`${arr[ele-1]}`).style.backgroundColor==="green"){
        document.getElementById(`${arr[ele-1]}`).style.backgroundColor=now;
        await sleep(500);
      }
      if(document.getElementById(`${arr[ele-1]}`).style.backgroundColor!==now){
        document.getElementById(`resultText`).innerHTML="not bipartite";
        await sleep(500)
        break
      }

      adjlist[ele].forEach(e=>{
        if (visited[e]===0){
        newarr.push(e)
        }
      })
    };
    src=newarr
    if (src.length===0){break;}
  }

  if(document.getElementById(`resultText`).innerHTML==="checking..")
  {document.getElementById(`resultText`).innerHTML="the graph is bipartite";}
  // for(let i=0;i<nodes-1;i++){
  //   document.getElementById(`${arr[i]}`).style.backgroundColor="green";
  // }
setrunning(0)

}

  const handleClick=async()=>{
    Setnodes(nodes+1)
    await setTimeout(20)
    console.log(nodes)
  }
  const addEdge=(event)=>{
    console.log(a,b,c)
    let t=[]
    adjlist.forEach(ele=> {
      t.push(ele)
    });
    t[a].push(b)
    console.log(t)
    setadjlist(t)
    let ti=[];
    adjMat.forEach(e => {
      ti.push(e)
    });
    ti[a][b]=c
    setadjMat(ti)
    console.log(ti)
    if(a>nodes || b>nodes){
      alert("entry failed.. Please select available nodes only")
      event.preventDefault();
      return;
    }
    var line=new LeaderLine(
      document.getElementById(`${arr[a-1]}`),
      document.getElementById(`${arr[b-1]}`),
      {middleLabel: LeaderLine.pathLabel(`${c}`),}
    );
    line.path="straight";
    
    event.preventDefault();
  }
  const addEdges=(event)=>{
    console.log(a,b,c)
    let t=[]
    adjlist.forEach(ele=> {
      t.push(ele)
    });
    t[a].push(b)
    t[b].push(a)
    console.log(t)
    setadjlist(t)
    let ti=[];
    adjMat.forEach(e => {
      ti.push(e)
    });
    ti[a][b]=c
    ti[b][a]=c
    setadjMat(ti)
    console.log(ti)
    if(a>nodes || b>nodes){
      alert("entry failed.. Please select available nodes only")
      event.preventDefault();
      return;
    }
    var line=new LeaderLine(
      document.getElementById(`${arr[a-1]}`),
      document.getElementById(`${arr[b-1]}`),
      {middleLabel: LeaderLine.pathLabel(`${c}`)}
    );
    line.path="straight";
    var line2=new LeaderLine(
      document.getElementById(`${arr[b-1]}`),
      document.getElementById(`${arr[a-1]}`),
    );
    line2.path="straight";
    event.preventDefault();
  }

  const setStart=(event)=>{
    for(let i=1;i<nodes;i++){
    document.getElementById(`${arr[i-1]}`).style.backgroundColor="green"
    }
    document.getElementById(`${arr[d-1]}`).style.backgroundColor="red"
    event.preventDefault();
  }

  const createnode=async(id,numb)=>{
    document.getElementById(`${id}`).style.backgroundColor="green";
    document.getElementById(`${id}`).style.borderRadius="50%";
    document.getElementById(`${id}`).innerHTML=`${numb}`;
    document.getElementById(`${id}`).style.alignItems="center";
    document.getElementById(`${id}`).style.justifyContent="center";
  }
  

  const helper=(a,b,c)=>{
    var line=new LeaderLine(
      document.getElementById(`${a}`),
      document.getElementById(`${b}`),
      {middleLabel: LeaderLine.pathLabel(`${c}`)}
    );
    line.path="straight";
    var line2=new LeaderLine(
      document.getElementById(`${b}`),
      document.getElementById(`${a}`),
    );
    line2.path="straight";
  }
  const creategraph1=()=>{
    createnode("101",1)
    createnode("213",2)
    createnode("903",3)
    createnode("910",4)
    createnode("1006",5)
    createnode("309",6)
    Setnodes(7)
    setarr(["101","213","903","910","1006","309"])
    helper("101","309",2)
    helper("101","910",2)
    helper("903","213",2)
    helper("309","213",3)
    helper("910","213",1)
    helper("1006","910",7)
    helper("903","1006",3)
    helper("101","903",4)
    setadjlist([[],[3,4,6],[3,4,6],[1,2,5],[1,2,5],[3,4],[1,2]])
    setadjMat([
      [0,0,0,0,0,0,0],
      [0,0,0,4,2,0,2],
      [0,0,0,2,1,0,3],
      [0,4,2,0,0,3,0],
      [0,2,1,0,0,7,0],
      [0,0,0,3,7,0,0],
      [0,2,3,0,0,0,0]
    ])
    // console.log(nodes,arr)
  }

  const creategraph2=()=>{
    createnode("301",1)
    createnode("513",2)
    createnode("703",3)
    createnode("610",4)
    createnode("906",5)
    createnode("408",6)
    createnode("110",7)
    Setnodes(8)
    setarr(["301","513","703","610","906","408","110"])
    helper("703","408",2)
    helper("408","610",2)
    helper("906","610",2)
    helper("703","906",3)
    helper("301","703",1)
    helper("301","110",7)
    helper("110","513",3)
    helper("610","513",4)
    setadjlist([[],[3,7],[4,7],[1,5,6],[2,5,6],[3,4],[3,4],[1,2]])
    setadjMat([
      [0,0,0,0,0,0,0,0],
      [0,0,0,1,0,0,0,7],
      [0,0,0,0,4,0,0,3],
      [0,1,0,0,0,3,2,0],
      [0,0,4,0,0,2,2,0],
      [0,0,0,3,2,0,0,0],
      [0,0,0,2,2,0,0,0],
      [0,7,3,0,0,0,0,0]
    ])
    // console.log(nodes,arr)
  }

  const adjmatfn=()=>{
    let mat="Adjacency Matrix is: \n [ \n"
    adjMat.slice(1,nodes).forEach(element => {
      let st=`[`
      element.slice(1,nodes).forEach(e=>{st+=` ${e},`})
      mat+=(st.slice(0,-1)+"]")
      mat+="\n"
    });
    alert(mat+"]")
  }
  const adjlistfn=()=>{
    let mat="Adjacency list is: \n "
    let i=1;
    adjlist.slice(1,nodes).forEach(element => {
      console.log(i,element)
      let st=`${i} :`
      element.forEach(e=>{st+=` ${e},`})
      i++;
      mat+=st.slice(0,-1)
      mat+="\n"
    });
    alert(mat)
  }
  const delnode=()=>{
    if(nodes<2){return}
    console.log("endbn",arr,nodes,arr[nodes-2])
    document.getElementById(`${arr[nodes-2]}`).style.backgroundColor="white";
    document.getElementById(`${arr[nodes-2]}`).style.borderRadius="100%";
    document.getElementById(`${arr[nodes-2]}`).innerHTML=``;
    setarr([...arr.slice(0,-1)])
    Setnodes(nodes-1)
    let t=[]
    adjlist.slice(0,-1).forEach(ele=> {
      let aaaa=[]
      ele.forEach(e => {
        if(e!==nodes-1){aaaa.push(e)}
      });
      t.push(aaaa)
    });
    // console.log(t)
    setadjlist(t)
    let ti=[];
    adjMat.slice(0,-1).forEach(e => {
      ti.push(e.slice(0,-1))
    });
    setadjMat(ti)
    // console.log(ti)
  }

        return (
          <div style={{paddingLeft:"50px"}}>
      <div style={{display:"flex",justifyContent:"left",width:"1450px",margin:"10px"}}>
      <div style={{marginLeft:"30px",width:"600px",marginTop:"30px",display:"flex"}}>
        <h5 style={{width:"100px",color:"brown"}}>Visualize:</h5>
                <button type="button" class="btn btn-primary btn-sm" onClick={bfs} style={{marginLeft:"0px"}}>BFS</button>
                <button type="button" class="btn btn-primary btn-sm" onClick={dfs} style={{marginLeft:"10px"}}>DFS</button>
                <button type="button" class="btn btn-primary btn-sm" onClick={djk} style={{marginLeft:"10px"}}>Dijkstra's</button>
                <button type="button" class="btn btn-primary btn-sm" onClick={bip} style={{marginLeft:"10px"}}>Check bi-partite</button>

              </div>
        <h2 style={{fontWeight:"bolder",color:"red", textShadow: "0 0 1px blue",paddingLeft:"5px",paddingRight:"5px"}}>GRAPH ALGORITHMS</h2>
        
        <div style={{marginLeft:"160px",marginTop:"30px"}}>
                <button type="button" class="btn btn-primary btn-sm" style={{marginRight:"10px"}}onClick={adjmatfn}>Get adjacency Matrix</button>
                <button type="button" class="btn btn-primary btn-sm" style={{marginRight:"10px"}}onClick={adjlistfn}>Get adjacency List</button>
              </div>
        </div>

          <div style={{display:"flex",marginLeft:"30px"}}>
            <div style={{display:"flex", paddingRight:"20px"}}>
              <div style={{marginTop:"30px"}}>
                <h6>Add edge:</h6>
                <form onSubmit={addEdge}>
                  <label>
                    select nodes:
                    <input type="integer" style={{width:"50px",marginLeft:"20px"}} value={a} onChange={(e)=>{seta(Number(e.target.value))}}/>
                    <input type="integer" style={{width:"50px",marginLeft:"20px"}} value={b} onChange={(e)=>{setb(Number(e.target.value))}}/> 
                    <div style={{margin:"5px"}}></div><label>Add Distance between them :</label>
                    <input type="integer" style={{width:"50px",marginLeft:"20px"}} value={c} onChange={(e)=>{setc(Number(e.target.value))}}/>
                  </label>
                  <div></div>
                  <input type="submit" class="btn btn-warning btn-sm" value="Add directed Edge" />
                </form>
                <form onSubmit={addEdges}>
                  <div style={{margin:"5px"}}></div>
                  <input type="submit" class="btn btn-warning btn-sm" value="Add undirected Edge" />
                </form>
                <div style={{paddingTop:"20px"}}>
              <form onSubmit={setStart}>
                  <label>
                    Starting node:
                    <input type="integer" style={{width:"40px",marginRight:"10px",marginLeft:"10px"}} value={d} onChange={(e)=>{setd(Number(e.target.value))}}/>
                  </label>
                  <input type="submit" value="submit" class="btn btn-primary btn-sm" />
                </form>
              </div>
              <div>
                <button type="button" class="btn btn-secondary btn-sm" onClick={delnode}>Undo node</button>
              </div>
              <div class="algorithm-description" style={{marginTop:"30px",width:"385px"}}>
  <p>
    <strong>BFS (Breadth-First Search):</strong> A graph traversal algorithm that explores all neighbors of a node before moving to the next level.
  </p>
  <p>
    <strong>DFS (Depth-First Search):</strong> A graph traversal algorithm that explores as far as possible along each branch before backtracking.
  </p>
  <p>
    <strong>Dijkstra's Algorithm:</strong> A shortest path algorithm that finds the shortest path between nodes in a weighted graph.
  </p>
  <p>
    <strong>Bipartite:</strong> A graph property where the vertices can be divided into two disjoint sets such that no two vertices within the same set have an edge connecting them.
  </p>
</div>

              </div>
            </div>
            <div>
              <div style={{textAlign:"left"}}>
              <div style={{display:"inline",float:"left"}}>
                  <div style={{display:"inline",float:"left",textAlign:"left"}}>Result : </div>
                  <div id='resultText' style={{display:"inline",float:"left",width:"660px",textAlign:"left",marginLeft:"10px",color:"green",fontWeight:"bolder"}}></div>
                </div>
                <button class="btn btn-secondary btn-sm"  onClick={creategraph1} style={{marginLeft:"10px"}}>Sample Graph-1</button>
                <button class="btn btn-secondary btn-sm"  onClick={creategraph2} style={{marginLeft:"10px"}}>Sample Graph-2</button>
              </div>
            <div className="Grid" style={{border:"solid", marginRight:"30px",padding:"0px"}}>
                {Array.apply(0, Array(15)).map(function (x, i) {
                return  <div>
                  <div className={`row-${i}`} style={{display:"flex"}}>
                    {Array.apply(0, Array(20)).map(function (y, j) {
                        return  <div id={`${i*100+j}`} style={{display:"flex", marginLeft:"10px", width:"40px", height:"40px", backgroundColor:"white"}} onClick={()=>{
                          console.log(i*100+j)
                          handleClick()
                          document.getElementById(`${i*100+j}`).style.backgroundColor="green";
                          document.getElementById(`${i*100+j}`).style.borderRadius="50%";
                          document.getElementById(`${i*100+j}`).innerHTML=`${nodes}`;
                          document.getElementById(`${i*100+j}`).style.alignItems="center";
                          document.getElementById(`${i*100+j}`).style.justifyContent="center";
                          setadjlist([...adjlist,[]])
                          let ti=[];
                          adjMat.forEach(e => {
                            ti.push([...e,0])
                          });
                          let temp=[0]
                          for(let i=0;i<nodes;i++){temp.push(0)}
                          ti.push(temp)
                          setadjMat(ti)
                          console.log(ti)
                          console.log(adjlist)
                          setarr([...arr,i*100+j])
                          }}>
                            <div style={{padding:"10px"}}></div>
                        </div>;
                    })}
                    </div>
                  </div>;
                })}
                </div>
            </div>
          </div>
                  
    <div style={{display:"flex",marginTop:"30px",marginLeft:"50px",color:"orangered"}}><h2>Learn More </h2></div>
    <hr style={{width:"95%",margin:"auto"}}></hr>
    <div className='' style={{display: "flex",marginTop:"30px",color:"green",textAlign:"center"}}>
        
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="59fUtYYz7ZU" title="Graphs Overview" />  </div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="XB4MIexjvY0" title="Dijkstra's Algorithm"/></div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="-vu34sct1g8" title="Bipartite Graph"/></div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="UPfUFoWjk5w" title="Cycle in graph"/>    </div>
   </div>
   <div className='' style={{display: "flex",marginTop:"30px",color:"green",textAlign:"center"}}>   
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="5lZ0iJMrUMk" title="Topological Sort"/>    </div> 
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="0vVofAhAYjc" title="Bellman Ford"/>     </div> 
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="YbY8cVwWAvw" title="Floyd Warshall"/>     </div> 
   <div className=" " style={{marginLeft:"50px",width:"300px"}}> <YoutubeEmbed embedId="4ZlRH0eK-qQ" title="Prims & Kruskal MST"/>      </div> 
    </div>
    <div className='' style={{display: "flex",marginTop:"30px",color:"green",textAlign:"center"}}>
        
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="aBxjDBC4M1U" title="DSU" />  </div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}></div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}></div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}>   </div>
   </div>

    <div>
    <div style={{display:"flex",marginTop:"30px",marginLeft:"50px",color:"orangered"}}><h2>Practice Graph Algorithms</h2></div>
    <hr style={{width:"95%",margin:"auto"}}></hr>
<div style={{textAlign:"left",width:"1400px",marginLeft:"50px"}}>
<p><strong><a name="bfsndfs"></a>BFS and DFS in Graph:</strong></p>
<ol><li><a href="https://www.geeksforgeeks.org/breadth-first-traversal-for-a-graph/">Breadth First Traversal for a Graph</a></li><li><a href="https://www.geeksforgeeks.org/depth-first-traversal-for-a-graph/">Depth First Traversal for a Graph</a></li><li><a href="https://www.geeksforgeeks.org/applications-of-depth-first-search/">Applications of Depth First Search</a></li><li><a href="https://www.geeksforgeeks.org/applications-of-breadth-first-traversal/">Applications of Breadth First Traversal</a></li><li><a href="https://www.geeksforgeeks.org/iterative-depth-first-traversal/">Iterative Depth First Search</a></li><li><a href="https://www.geeksforgeeks.org/bfs-disconnected-graph/">BFS for Disconnected Graph</a></li><li><a href="https://www.geeksforgeeks.org/transitive-closure-of-a-graph-using-dfs/">Transitive Closure of a Graph using DFS</a></li><li><a href="https://www.geeksforgeeks.org/difference-between-bfs-and-dfs/">Difference between BFS and DFS</a></li></ol>
<p><strong><a name="cycle"></a>Cycles in Graph:</strong></p>
<ol><li><a href="https://www.geeksforgeeks.org/detect-cycle-in-a-graph/">Detect Cycle in a Directed Graph</a></li><li><a href="https://www.geeksforgeeks.org/detect-cycle-undirected-graph/">Detect cycle in an undirected graph</a></li><li><a href="https://www.geeksforgeeks.org/detect-cycle-direct-graph-using-colors/">Detect cycle in a direct graph using colors</a></li><li><a href="https://www.geeksforgeeks.org/detect-negative-cycle-graph-bellman-ford/">Detect a negative cycle in a Graph | (Bellman Ford)</a></li><li><a href="https://www.geeksforgeeks.org/cycles-of-length-n-in-an-undirected-and-connected-graph/">Cycles of length n in an undirected and connected graph</a></li><li><a href="https://www.geeksforgeeks.org/detecting-negative-cycle-using-floyd-warshall/">Detecting negative cycle using Floyd Warshall</a></li><li><a href="https://www.geeksforgeeks.org/clone-directed-acyclic-graph/">Clone a Directed Acyclic Graph</a></li><li><a href="https://www.geeksforgeeks.org/union-by-rank-and-path-compression-in-union-find-algorithm/">Union By Rank and Path Compression in Union-Find Algorithm</a></li><li><a href="https://www.geeksforgeeks.org/introduction-to-disjoint-set-data-structure-or-union-find-algorithm/">Introduction to Disjoint Set Data Structure or Union-Find Algorithm</a></li></ol>
<p><strong><a name="shortest"></a>Shortest Path in Graph:</strong></p>
<ol><li><a href="https://www.geeksforgeeks.org/greedy-algorithms-set-6-dijkstras-shortest-path-algorithm/">Dijkstra’s shortest path algorithm</a></li><li><a href="https://www.geeksforgeeks.org/dynamic-programming-set-23-bellman-ford-algorithm/">Bellman–Ford Algorithm</a></li><li><a href="https://www.geeksforgeeks.org/dynamic-programming-set-16-floyd-warshall-algorithm/">Floyd Warshall Algorithm</a></li><li><a href="https://www.geeksforgeeks.org/johnsons-algorithm/">Johnson’s algorithm for All-pairs shortest paths</a></li><li><a href="https://www.geeksforgeeks.org/shortest-path-for-directed-acyclic-graphs/">Shortest Path in Directed Acyclic Graph</a></li><li><a href="https://www.geeksforgeeks.org/dials-algorithm-optimized-dijkstra-for-small-range-weights/">Dial’s Algorithm</a></li><li><a href="https://www.geeksforgeeks.org/multistage-graph-shortest-path/">Multistage Graph (Shortest Path)</a></li><li><a href="https://www.geeksforgeeks.org/shortest-path-unweighted-graph/">Shortest path in an unweighted graph</a></li><li><a href="https://www.geeksforgeeks.org/karps-minimum-mean-average-weight-cycle-algorithm/">Karp’s minimum mean (or average) weight cycle algorithm</a></li><li><a href="https://www.geeksforgeeks.org/0-1-bfs-shortest-path-binary-graph/">0-1 BFS (Shortest Path in a Binary Weight Graph)</a></li><li><a href="https://www.geeksforgeeks.org/find-minimum-weight-cycle-undirected-graph/">Find minimum weight cycle in an undirected graph</a></li></ol>
<p><strong><a name="mustdo"></a>Some must do Problems on Graph:</strong></p>
<ol><li><a href="https://www.geeksforgeeks.org/find-length-largest-region-boolean-matrix/">Find length of the largest region in Boolean Matrix</a></li><li><a href="https://www.geeksforgeeks.org/count-number-trees-forest/">Count number of trees in a forest</a></li><li><a href="https://www.geeksforgeeks.org/peterson-graph/">A Peterson Graph Problem</a></li><li><a href="https://www.geeksforgeeks.org/clone-an-undirected-graph/">Clone an Undirected Graph</a></li><li><a href="https://www.geeksforgeeks.org/graph-coloring-applications/">Graph Coloring (Introduction and Applications)</a></li><li><a href="https://www.geeksforgeeks.org/traveling-salesman-problem-tsp-implementation/">Traveling Salesman Problem (TSP) Implementation</a></li><li><a href="https://www.geeksforgeeks.org/vertex-cover-problem-set-1-introduction-approximate-algorithm-2/">Vertex Cover Problem | Set 1 (Introduction and Approximate Algorithm)</a></li><li><a href="https://www.geeksforgeeks.org/k-centers-problem-set-1-greedy-approximate-algorithm/">K Centers Problem | Set 1 (Greedy Approximate Algorithm)</a></li><li><a href="https://www.geeksforgeeks.org/erdos-renyl-model-generating-random-graphs/">Erdos Renyl Model (for generating Random Graphs)</a></li><li><a href="https://www.geeksforgeeks.org/chinese-postman-route-inspection-set-1-introduction/">Chinese Postman or Route Inspection | Set 1 (introduction)</a></li><li><a href="https://www.geeksforgeeks.org/hierholzers-algorithm-directed-graph/">Hierholzer’s Algorithm for directed graph</a></li><li><a href="https://www.geeksforgeeks.org/bipartite-graph/">Check whether a given graph is Bipartite or not</a></li><li><a href="https://www.geeksforgeeks.org/snake-ladder-problem-2/">Snake and Ladder Problem</a></li><li><a href="https://www.geeksforgeeks.org/boggle-find-possible-words-board-characters/">Boggle (Find all possible words in a board of characters)</a></li><li><a href="https://www.geeksforgeeks.org/hopcroft-karp-algorithm-for-maximum-matching-set-1-introduction/">Hopcroft Karp Algorithm for Maximum Matching-Introduction</a></li><li><a href="https://www.geeksforgeeks.org/minimum-time-required-so-that-all-oranges-become-rotten/">Minimum Time to rot all oranges</a></li><li><a href="https://www.geeksforgeeks.org/construct-graph-given-degrees-vertices/">Construct a graph from given degrees of all vertices</a></li><li><a href="https://www.geeksforgeeks.org/determine-whether-universal-sink-exists-directed-graph/">Determine whether a universal sink exists in a directed graph</a></li><li><a href="https://www.geeksforgeeks.org/number-sink-nodes-graph/">Number of sink nodes in a graph</a></li><li><a href="https://www.geeksforgeeks.org/two-clique-problem-check-graph-can-divided-two-cliques/">Two Clique Problem (Check if Graph can be divided in two Cliques)</a></li></ol>

</div>
    </div>
          </div>);
    }

function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

export default Canvas;