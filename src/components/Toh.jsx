import { useEffect, useState } from "react";

const TowersOfHanoi=()=>{
  const [n,setn]=useState(4)
  const [nsetter,setnsetter]=useState(4)
  const [dt1,setdt1]=useState([1,2,3,4])
  const [dt2,setdt2]=useState([])
  const [dt3,setdt3]=useState([])
  let t2=[]
  let t3=[]
  let ans=[]
  const [running,setrunning]=useState(0)
  useEffect(()=>{setdt1(Array.from({length: n}, (_, i) => i + 1));setdt2([]);setdt3([])},[n])
  // useEffect(()=>{},[t1,t2,t3])
  
  const [dwt1,setdwt1]=useState(0)
  const [dwt2,setdwt2]=useState(0)
  const [dwt3,setdwt3]=useState(0)
  let wt1=0
  let wt2=0
  let wt3=0
  // console.log(t1.length)
  const display=async()=>{
    for(let i=0;i<ans.length;i++){
      setdt1(ans[i][0])
      setdt2(ans[i][1])
      setdt3(ans[i][2])
      setdwt1(ans[i][3])
      setdwt2(ans[i][4])
      setdwt3(ans[i][5])
      console.log(i,ans[i])
      await sleep(500)
    }
    setrunning(0)
  }

  const fn=()=>{
    if(running===1){return}
    setrunning(1)
    let t1=dt1
    const toh=async(a,from,to,middle)=>{
      if(a===0){return}
      toh(a-1,from,middle,to)
      if (from===1 && to===2){wt1=t1[0];t1=t1.slice(1,t1.length);   ans.push([t1,t2,t3,wt1,wt2,wt3]);console.log(t1,t2,t3,wt1,wt2,wt3);   wt2=wt1;wt1=0; ans.push([t1,t2,t3,wt1,wt2,wt3]); console.log(t1,t2,t3,wt1,wt2,wt3); t2=[wt2,...t2];wt2=0;    ans.push([t1,t2,t3,wt1,wt2,wt3]); console.log(t1,t2,t3,wt1,wt2,wt3)}
      if (from===1 && to===3){wt1=t1[0];t1=t1.slice(1,t1.length);   ans.push([t1,t2,t3,wt1,wt2,wt3]);console.log(t1,t2,t3,wt1,wt2,wt3);   wt3=wt1;wt1=0; ans.push([t1,t2,t3,wt1,wt2,wt3]); console.log(t1,t2,t3,wt1,wt2,wt3); t3=[wt3,...t3];wt3=0;    ans.push([t1,t2,t3,wt1,wt2,wt3]); console.log(t1,t2,t3,wt1,wt2,wt3)}
      if (from===2 && to===1){wt2=t2[0];t2=t2.slice(1,t2.length);   ans.push([t1,t2,t3,wt1,wt2,wt3]);console.log(t1,t2,t3,wt1,wt2,wt3);   wt1=wt2;wt2=0; ans.push([t1,t2,t3,wt1,wt2,wt3]); console.log(t1,t2,t3,wt1,wt2,wt3); t1=[wt1,...t1];wt1=0;    ans.push([t1,t2,t3,wt1,wt2,wt3]); console.log(t1,t2,t3,wt1,wt2,wt3)}
      if (from===2 && to===3){wt2=t2[0];t2=t2.slice(1,t2.length);   ans.push([t1,t2,t3,wt1,wt2,wt3]);console.log(t1,t2,t3,wt1,wt2,wt3);   wt3=wt2;wt2=0; ans.push([t1,t2,t3,wt1,wt2,wt3]); console.log(t1,t2,t3,wt1,wt2,wt3); t3=[wt3,...t3];wt3=0;    ans.push([t1,t2,t3,wt1,wt2,wt3]); console.log(t1,t2,t3,wt1,wt2,wt3)}
      if (from===3 && to===1){wt3=t3[0];t3=t3.slice(1,t3.length);   ans.push([t1,t2,t3,wt1,wt2,wt3]);console.log(t1,t2,t3,wt1,wt2,wt3);   wt1=wt3;wt3=0; ans.push([t1,t2,t3,wt1,wt2,wt3]); console.log(t1,t2,t3,wt1,wt2,wt3); t1=[wt1,...t1];wt1=0;    ans.push([t1,t2,t3,wt1,wt2,wt3]); console.log(t1,t2,t3,wt1,wt2,wt3)}
      if (from===3 && to===2){wt3=t3[0];t3=t3.slice(1,t3.length);   ans.push([t1,t2,t3,wt1,wt2,wt3]);console.log(t1,t2,t3,wt1,wt2,wt3);   wt2=wt3;wt3=0; ans.push([t1,t2,t3,wt1,wt2,wt3]); console.log(t1,t2,t3,wt1,wt2,wt3); t2=[wt2,...t2];wt2=0;    ans.push([t1,t2,t3,wt1,wt2,wt3]); console.log(t1,t2,t3,wt1,wt2,wt3)}
      
      toh(a-1,middle,to,from)
      return
    }
    toh(n,1,3,2)
    display(ans)
    // console.log(ans)
    return
  }


  return <div >
    <div>
      <button onClick={fn}>Solve TOH</button>
      <form onSubmit={(e)=>{setn(nsetter);e.preventDefault()}}>
        <input type="integer" value={nsetter} onChange={(e)=>{if(running===1){return};if(e.target.value<7){setnsetter(e.target.value)}}}></input>
        <input type="Submit" value="submit"></input>
      </form>
    </div>

    <div style={{display:"flex",  justifyContent:"center",marginBottom:"30px"}} className="waitingArea">
    <div style={{width:"202px",height:"20px",alignContent:"center"}}>
        <div style={{width:`${dwt1*30}px`,height:"20px",backgroundColor:"green",margin:"0 auto",textAlign:"center",border:(dwt1===0)?"":"1px solid"}}>{(dwt1!==0)?dwt1:""}</div>
    </div>
    <div style={{width:"202px",height:"20px",alignContent:"center"}}>
        <div style={{width:`${dwt2*30}px`,height:"20px",backgroundColor:"green",margin:"0 auto",textAlign:"center",border:(dwt2===0)?"":"1px solid"}}>{(dwt2!==0)?dwt2:""}</div>
    </div>
    <div style={{width:"202px",height:"20px",alignContent:"center"}}>
        <div style={{width:`${dwt3*30}px`,height:"20px",backgroundColor:"green",margin:"0 auto",textAlign:"center",border:(dwt3===0)?"":"1px solid"}}>{(dwt3!==0)?dwt3:""}</div>
    </div>
      
    </div>


    <div style={{display:"flex",  justifyContent:"center"}} className="tohArea">
    <div style={{width:"200px",height:"330px",border:"1px solid",alignContent:"center"}}>
        <div className="polearea"style={{width:"200px",height:"300px",display:"flex",justifyContent:"center"}}>
          <div>
          <div className="pole"style={{width:"20px",height:`${300-20*dt1.length}px`,backgroundColor:"blue",margin:"auto"}}></div>
          <div style={{justifyContent:"center"}}>
              {dt1.map((v,k)=>{
                return <div style={{width:`${30*v}px`,height:"20px",backgroundColor:"green",margin:"0 auto",textAlign:"center",border:"1px solid"}}>{v}</div>
              })}
            </div>
          </div>
        </div>
        <div className="base" style={{width:"150px",height:"30px",backgroundColor:"brown",marginLeft:"25px"}}></div>
      </div>
      
      <div style={{width:"200px",height:"330px",border:"1px solid",alignContent:"center"}}>
        <div className="polearea"style={{width:"200px",height:"300px",display:"flex",justifyContent:"center"}}>
          <div>
          <div className="pole"style={{width:"20px",height:`${300-20*dt2.length}px`,backgroundColor:"blue",margin:"auto"}}></div>
          <div style={{justifyContent:"center"}}>
              {dt2.map((v,k)=>{
                return <div style={{width:`${30*v}px`,height:"20px",backgroundColor:"green",margin:"0 auto",textAlign:"center",border:"1px solid"}}>{v}</div>
              })}
            </div>
          </div>
        </div>
        <div className="base" style={{width:"150px",height:"30px",backgroundColor:"brown",marginLeft:"25px"}}></div>
      </div>
      <div style={{width:"200px",height:"330px",border:"1px solid",alignContent:"center"}}>
        <div className="polearea"style={{width:"200px",height:"300px",display:"flex",justifyContent:"center"}}>
          <div>
          <div className="pole"style={{width:"20px",height:`${300-20*dt3.length}px`,backgroundColor:"blue",margin:"auto"}}></div>
          <div style={{justifyContent:"center"}}>
              {dt3.map((v,k)=>{
                return <div style={{width:`${30*v}px`,height:"20px",backgroundColor:"green",margin:"0 auto",textAlign:"center",border:"1px solid"}}>{v}</div>
              })}
            </div>
          </div>
        </div>
        <div className="base" style={{width:"150px",height:"30px",backgroundColor:"brown",marginLeft:"25px"}}></div>
      </div>
      
    </div>
  </div>
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export default TowersOfHanoi;
