import  React, { useState,useEffect} from 'react';
import LeaderLine from "leader-line-new";
import { Link } from 'react-router-dom';

function Canvas(){
  const [nodes,Setnodes]=useState(1)
  const [arr,setarr]=useState([])
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
  if (nodes===0||nodes===1){
    alert("not enough nodes to execute algorithm");
    return;
  }
  if (d>=nodes){
    alert("wrong starting node");
    return;
  }
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
        document.getElementById(`resultText`).innerText=document.getElementById(`resultText`).innerText+` ${vertex}`;
        await sleep(1000);
        for (const neighbor of graph[vertex]) {
          queue.push(neighbor);
        }
      }
    }
  
    console.log(result);
  }
// dfs
const dfs=async()=>{
  if (nodes===0||nodes===1){
    alert("not enough nodes to execute algorithm");
    return;
  }
  if (d>=nodes){
    alert("wrong starting node");
    return;
  }
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
        document.getElementById(`resultText`).innerText=document.getElementById(`resultText`).innerText+` ${vertex}`;
        await sleep(1000);
        for (const neighbor of graph[vertex]) {
        stack.push(neighbor);
      }
    }
  }
  console.log(result);
} 
// djkstras
const djk=async(graph=adjlist, src=d)=> {
  if (nodes===0||nodes===1){
    alert("not enough nodes to execute algorithm");
    return;
  }
  if (src>=nodes){
    alert("wrong starting node");
    return;
  }
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


}
// bip
const bip=async()=>{
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
  for(let i=0;i<nodes-1;i++){
    document.getElementById(`${arr[i]}`).style.backgroundColor="green";
  }
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
    let i=1;
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

        return (
          <div style={{display:"flex"}}>
            <div style={{display:"flex", paddingRight:"30px"}}>
              <div>sidebar</div>
              <div>
                <h2>Add edge</h2>
                <form onSubmit={addEdge}>
                  <label>
                    select nodes:
                    <input type="integer"  value={a} onChange={(e)=>{seta(Number(e.target.value))}}/>
                    <input type="integer"  value={b} onChange={(e)=>{setb(Number(e.target.value))}}/>
                    distance between them
                    <input type="integer"  value={c} onChange={(e)=>{setc(Number(e.target.value))}}/>
                  </label>
                  <input type="submit" value="Add directed Edge" />
                </form>
                <form onSubmit={addEdges}>
                  <input type="submit" value="Add undirected Edge" />
                </form>
                <div style={{paddingTop:"50px"}}>
              <form onSubmit={setStart}>
                  <label>
                    select Starting node:
                    <input type="integer"  value={d} onChange={(e)=>{setd(Number(e.target.value))}}/>
                  </label>
                  <input type="submit" value="submit" />
                </form>
              </div>
              <div style={{marginBottom:"30px",marginTop:"30px"}}>
                <button onClick={bfs} style={{marginLeft:"1px"}}>bfs</button>
                <button onClick={dfs} style={{marginLeft:"10px"}}>dfs</button>
                <button onClick={djk} style={{marginLeft:"10px"}}>djikstra's</button>
                <button onClick={bip} style={{marginLeft:"10px"}}>Check bi-partite</button>

              </div>
              <div>
                <button onClick={adjmatfn}>Get adjacency Matrix</button>
                <button onClick={adjlistfn}>Get adjacency List</button>
              </div>
              </div>
            </div>
            <div>
              <div style={{textAlign:"right"}}>
              <div style={{display:"inline",float:"left"}}>
                  <div style={{display:"inline",float:"left",textAlign:"left"}}>result : </div>
                  <div id='resultText' style={{display:"inline",float:"left",width:"700px",textAlign:"left",marginLeft:"10px"}}></div>
                </div>
                <button onClick={creategraph1}>Sample Graph-1</button>
                <button onClick={creategraph2}>Sample Graph-2</button>
              </div>
            <div className="Grid" style={{border:"solid", margin:"0px",padding:"0px"}}>
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
          </div>);
    }

function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

export default Canvas;