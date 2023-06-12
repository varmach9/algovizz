import React from 'react'
import { useState } from 'react'

const Lcs = () => {
    const [a,seta]=useState("AGGTAB")
    const [b,setb]=useState("GXTXAYB")
    const [c,setc]=useState("AGGTAB")
    const [d,setd]=useState("GXTXAYB")
    const [run,setrun]=useState(0)

    const lcs=async()=>{
        if(run===1){return}
        setrun(1)
        let mat=[]
        document.getElementById("lcs").innerHTML=""
        let lcs=[]
        for(let i=0;i<b.length+1;i++){
            let arr=[]
            let strarr=[]
            for(let j=0;j<a.length+1;j++){
                arr.push(0)
                strarr.push("")
                document.getElementById(100*i+j).style.backgroundColor="white"
            }  
            mat.push(arr)
            lcs.push(strarr)
        }    
        console.log(document.getElementById(0).innerHTML)
        await sleep(1000)
        for (let i=0;i<a.length+1;i++){
            document.getElementById(i).style.backgroundColor="grey"}
        for (let i=0;i<b.length+1;i++){
                document.getElementById(i*100).style.backgroundColor="grey"}
        await sleep(1000)
        for(let i=1;i<b.length+1;i++){
            for(let j=1;j<a.length+1;j++){
                document.getElementById(100*i+j).style.backgroundColor="red"
                document.getElementById(100*i+j-100).style.backgroundColor="blue"
                document.getElementById(100*i+j-1).style.backgroundColor="blue"
                if(b[i-1]===a[j-1]){
                    mat[i][j]=mat[i-1][j-1]+1
                    lcs[i][j]=lcs[i-1][j-1]+b[i-1]
                    document.getElementById("compare").innerHTML=`${b[i-1]}=${a[j-1]}`
                    document.getElementById("lcs").innerHTML=(mat[i][j]>document.getElementById("lcs").innerHTML.length)?lcs[i][j]:document.getElementById("lcs").innerHTML
                }else{
                    mat[i][j]=Math.max(mat[i][j-1],mat[i-1][j])
                    lcs[i][j]=(mat[i][j-1]>mat[i-1][j])?lcs[i][j-1]:lcs[i-1][j]
                    document.getElementById("compare").innerHTML=`${b[i-1]}!=${a[j-1]}`
                    document.getElementById("lcs").innerHTML=(mat[i][j]>document.getElementById("lcs").innerHTML.length)?lcs[i][j]:document.getElementById("lcs").innerHTML
                }
                document.getElementById(100*i+j).innerHTML=mat[i][j]
                await sleep(500)
                
                document.getElementById(100*i+j).style.backgroundColor="grey"
                document.getElementById(100*i+j-100).style.backgroundColor="grey"
                document.getElementById(100*i+j-1).style.backgroundColor="grey"
                document.getElementById("compare").innerHTML=""
                await sleep(500)
            }
        }
        setrun(0)
    }

  return (
    <div>
    <div>Lcs</div>
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
        <button onClick={lcs}>Visualize LCS</button>  
    </div>
    <div style={{display:"flex",marginLeft:"20px"}}>
        <div style={{border:"solid",width:"30px",height:"30px",textAlign:"center"}}></div>
        {Array.apply(0, Array(a.length+1)).map(function (x, i) {
            return <div style={{border:"solid",width:"30px",height:"30px",textAlign:"center"}}>{(i===0)?"-":a[i-1]}</div>
        })}
    </div>
    {Array.apply(0, Array(b.length+1)).map(function (x, i) {
            return <div style={{display:"flex"}}>
            <div style={{border:"solid",width:"30px",height:"30px",marginLeft:"20px",textAlign:"center"}}>{(i===0)?"-":b[i-1]}</div>
            {Array.apply(0, Array(a.length+1)).map(function (x, j) {
            return <div style={{border:"solid",width:"30px",height:"30px",textAlign:"center"}} id={i*100+j}>{0}</div>
        })}
            </div>
        })}
    <div style={{display:"flex"}}>
    <div > comparision: </div>
    <div id="compare"></div>
    </div>
    <div style={{display:"flex"}}>
    <div > LCS is: </div>
    <div id="lcs"></div>
    </div>
    </div>    
  )
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default Lcs