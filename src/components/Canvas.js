import  React, { useState, useEffect} from 'react';
import LeaderLine from "leader-line-new";


function Canvas(){

  const [nodes,Setnodes]=useState(1)
  const [arr,setarr]=useState([])

  // for edge setting form
  const [a,seta]=useState(1)
  const [b,setb]=useState(2)
  const [c,setc]=useState(1)
  // for starting node form
  const [d,setd]=useState(1)

  
  const handleClick=async()=>{
    Setnodes(nodes+1)
    await setTimeout(20)
    console.log(nodes)
  }
  const addEdge=(event)=>{
    console.log(a,b,c)
    if(a>nodes || b>nodes){
      alert("entry failed.. Please select available nodes only")
      event.preventDefault();
      return;
    }
    var line=new LeaderLine(
      document.getElementById(`${arr[a-1]}`),
      document.getElementById(`${arr[b-1]}`)
    );
    line.path="straight";

    event.preventDefault();
  }
  const addEdges=(event)=>{
    console.log(a,b,c)
    if(a>nodes || b>nodes){
      alert("entry failed.. Please select available nodes only")
      event.preventDefault();
      return;
    }
    var line=new LeaderLine(
      document.getElementById(`${arr[a-1]}`),
      document.getElementById(`${arr[b-1]}`)
    );
    line.path="straight";
    var line2=new LeaderLine(
      document.getElementById(`${arr[b-1]}`),
      document.getElementById(`${arr[a-1]}`)
    );
    line2.path="straight";
    event.preventDefault();
  }

  const setStart=(event)=>{
    document.getElementById(`${arr[d-1]}`).style.backgroundColor="red"
    event.preventDefault();
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

              </div>
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
                          document.getElementById(`${i*100+j}`).innerText=nodes;
                          document.getElementById(`${i*100+j}`).style.alignItems="";
                          setarr([...arr,i*100+j])
                          // document.getElementById(`${i*100+j}`).style.
                          }}>
                            <div style={{padding:"10px"}}>{}</div>
                        </div>;
                    })}
                    </div>
                  </div>;
                })}
            </div>
          </div>);
    }

export default Canvas;