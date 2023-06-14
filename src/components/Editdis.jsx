import React from 'react'
import { useState } from 'react'

const Editdis = () => {
    const [a,seta]=useState("class")
    const [b,setb]=useState("crash")
    const [c,setc]=useState("class")
    const [d,setd]=useState("crash")
    const [run,setrun]=useState(0)

    const ed=async()=>{
        if(run===1){return}
        setrun(1)
        let mat=[]
        document.getElementById("ed").innerHTML=""
        for(let i=0;i<b.length+1;i++){
            let arr=[]
            for(let j=0;j<a.length+1;j++){
                arr.push(0)
                document.getElementById(100*i+j).style.backgroundColor="white"
            }  
            mat.push(arr)
        }    
        await sleep(1000)
        for (let i=0;i<a.length+1;i++){
            document.getElementById(i).innerHTML=i
            mat[i][0]=i
            document.getElementById(i).style.backgroundColor="grey"}
        for (let i=0;i<b.length+1;i++){
            mat[0][i]=i
            document.getElementById(i*100).innerHTML=i
            document.getElementById(i*100).style.backgroundColor="grey"}
        await sleep(1000)
        for(let i=1;i<b.length+1;i++){
            for(let j=1;j<a.length+1;j++){
                document.getElementById(1000*i+50).style.backgroundColor="yellow"
                document.getElementById(10000*j+50).style.backgroundColor="yellow"
                document.getElementById(100*i+j).style.backgroundColor="red"
                if(b[i-1]===a[j-1]){
                    document.getElementById("compare").innerHTML=`${b[i-1]}=${a[j-1]}`
                    mat[i][j]=mat[i-1][j-1]
                    await sleep(1000)
                    document.getElementById(100*i+j-101).style.backgroundColor="blue"
                }else{
                    mat[i][j]=Math.min(mat[i][j-1],mat[i-1][j],mat[i-1][j-1])+1
                    document.getElementById("compare").innerHTML=`${b[i-1]}!=${a[j-1]}`
                    await sleep(1000)
                    document.getElementById(100*i+j-101).style.backgroundColor="blue"
                    document.getElementById(100*i+j-100).style.backgroundColor="blue"
                    document.getElementById(100*i+j-1).style.backgroundColor="blue"
                }
                document.getElementById(100*i+j).innerHTML=mat[i][j]
                await sleep(500)
                
                document.getElementById(100*i+j).style.backgroundColor="grey"
                document.getElementById(100*i+j-101).style.backgroundColor="grey"
                document.getElementById(100*i+j-100).style.backgroundColor="grey"
                document.getElementById(100*i+j-1).style.backgroundColor="grey"
                
                document.getElementById(1000*i+50).style.backgroundColor="white"
                document.getElementById(10000*j+50).style.backgroundColor="white"
                document.getElementById("compare").innerHTML=""
                await sleep(500)
            }
        }
        document.getElementById("ed").innerHTML=mat[a.length][b.length]
        setrun(0)
    }

  return (
    <div>
    <div>Edit distance</div>
    <div>
    <form onSubmit={(e)=>{
            if(run===1){e.preventDefault()}
            else{seta(c)
            setb(d)
            e.preventDefault()}
        }}>
    <input type="text"  value={c} onChange={(e)=>{setc(e.target.value)}}/>
        <input type="text"  value={d} onChange={(e)=>{setd(e.target.value)}}/>
        <input type="Submit"  value="Submit" />
        </form>
        <button onClick={ed}>Visualize Edit distance</button>  
    </div>
    <div style={{display:"flex",marginLeft:"20px"}}>
        <div style={{border:"solid",width:"30px",height:"30px",textAlign:"center"}}></div>
        {Array.apply(0, Array(a.length+1)).map(function (x, i) {
            return <div style={{border:"solid",width:"30px",height:"30px",textAlign:"center"}} id={10000*i+50}>{(i===0)?"-":a[i-1]}</div>
        })}
    </div>
    {Array.apply(0, Array(b.length+1)).map(function (x, i) {
            return <div style={{display:"flex"}}>
            <div style={{border:"solid",width:"30px",height:"30px",marginLeft:"20px",textAlign:"center"}} id={1000*i+50}>{(i===0)?"-":b[i-1]}</div>
            {Array.apply(0, Array(a.length+1)).map(function (x, j) {
            return <div style={{border:"solid",width:"30px",height:"30px",textAlign:"center"}} id={i*100+j}>{0}</div>
        })}
            </div>
        })}
    <div style={{display:"flex"}}>
    <div > comparision : </div>
    <div id="compare"></div>
    </div>
    <div style={{display:"flex"}}>
    <div > Edit distance is : </div>
    <div id="ed"></div>
    </div>
    </div>    
  )
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default Editdis