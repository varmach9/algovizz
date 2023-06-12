import React from 'react'
import { useState } from 'react'

const Knp = () => {
    const [a,seta]=useState([1,2,3,4])
    const [b,setb]=useState([2,3,5,7])
    const [mw,setmw]=useState(5)
    const [c,setc]=useState("1 2 3 4")
    const [d,setd]=useState("2 3 5 7")
    const [f,setf]=useState(5)
    const [run,setrun]=useState(0)

    const knap01=async()=>{
        if(run===1){return}
        document.getElementById("answer").innerHTML=""
        setrun(1)
        let mat=[]
        for(let i=0;i<a.length+1;i++){
            let arr=[]
            for(let j=0;j<mw+1;j++){
                arr.push(0)
                document.getElementById(100*i+j).style.backgroundColor="white"
                document.getElementById(100*i+j).innerHTML=0
            }  
            mat.push(arr)
        }    
        console.log(document.getElementById(0).innerHTML)
        await sleep(1000)
        for (let i=0;i<a.length+1;i++){
            document.getElementById(i*100).innerHTML=1
            document.getElementById(i*100).style.backgroundColor="grey"}
        for (let i=0;i<mw+1;i++){
            if(i!==0){mat[0][i]=-1000}
                document.getElementById(i).style.backgroundColor="grey"}
        await sleep(1000)
        for(let i=1;i<a.length+1;i++){
            for(let j=1;j<mw+1;j++){
                document.getElementById(100*i+j).style.backgroundColor="red"
                document.getElementById(100*i+j-100).style.backgroundColor="green"
                console.log(i,j,a[i-1],b[i-1])
                if(j>=a[i-1]){
                    mat[i][j]=Math.max(mat[i-1][j],mat[i-1][j-a[i-1]]+b[i-1],mat[i][j])
                    document.getElementById(100*i+j-a[i-1]-100).style.backgroundColor="green"
                }
                else{
                    mat[i][j]=Math.max(mat[i-1][j],mat[i][j])
                }
                    document.getElementById(100*i+j).innerHTML=mat[i][j]
                await sleep(500)
                
                document.getElementById(100*i+j).style.backgroundColor="grey"
                document.getElementById(100*i+j-100).style.backgroundColor="grey"
                if(j>=a[i-1]){
                    document.getElementById(100*i+j-a[i-1]-100).style.backgroundColor="grey"
                }
                await sleep(500)
            }
        }
        document.getElementById("answer").innerHTML=mat[a.length][mw]
        setrun(0)
    }
    const knapub=async()=>{
        if(run===1){return}
        document.getElementById("answer").innerHTML=""
        setrun(1)
        let mat=[]
        for(let i=0;i<a.length+1;i++){
            let arr=[]
            for(let j=0;j<mw+1;j++){
                arr.push(0)
                document.getElementById(100*i+j).style.backgroundColor="white"
                document.getElementById(100*i+j).innerHTML=0
            }  
            mat.push(arr)
        }    
        console.log(document.getElementById(0).innerHTML)
        await sleep(1000)
        for (let i=0;i<a.length+1;i++){
            document.getElementById(i*100).innerHTML=1
            document.getElementById(i*100).style.backgroundColor="grey"}
        for (let i=0;i<mw+1;i++){
            if(i!==0){mat[0][i]=-1000}
                document.getElementById(i).style.backgroundColor="grey"}
        await sleep(1000)
        for(let i=1;i<a.length+1;i++){
            for(let j=1;j<mw+1;j++){
                document.getElementById(100*i+j).style.backgroundColor="red"
                document.getElementById(100*i+j-100).style.backgroundColor="green"
                console.log(i,j,a[i-1],b[i-1])
                if(j>=a[i-1]){
                    mat[i][j]=Math.max(mat[i-1][j],mat[i][j-a[i-1]]+b[i-1],mat[i][j])
                    document.getElementById(100*i+j-a[i-1]).style.backgroundColor="green"
                }
                else{
                    mat[i][j]=Math.max(mat[i-1][j],mat[i][j])
                }
                    document.getElementById(100*i+j).innerHTML=mat[i][j]
                await sleep(500)
                
                document.getElementById(100*i+j).style.backgroundColor="grey"
                document.getElementById(100*i+j-100).style.backgroundColor="grey"
                if(j>=a[i-1]){
                    document.getElementById(100*i+j-a[i-1]).style.backgroundColor="grey"
                }
                await sleep(500)
            }
        }
        document.getElementById("answer").innerHTML=mat[a.length][mw]
        setrun(0)
    }

  return (
    <div>
    <div>Lcs</div>
    <div>
        <form onSubmit={(e)=>{
            if(run===1){return}
            let wtarr=[]
            let valarr=[]
            let t1=c.split(" ")
            for(let i=0;i<t1.length;i++){wtarr.push(Number(t1[i]))}
            console.log(wtarr,t1)
            t1=d.split(" ")
            for(let i=0;i<t1.length;i++){valarr.push(Number(t1[i]))}
            seta(wtarr)
            setb(valarr)
            e.preventDefault()
        }}>
        <input type="text"  value={c} onChange={(e)=>{setc(e.target.value)}}/>
        <input type="text"  value={d} onChange={(e)=>{setd(e.target.value)}}/>
        <input type="Submit"  value="Submit" />
        </form>
        <form onSubmit={(e)=>{
            if(run===1){return}
            setmw(Number(f))
            e.preventDefault()
        }}>
        <input type="integer" value={f} onChange={(e)=>{setf(e.target.value)}}/>
        <input type="Submit"  value="Submit" />
        </form>
        <button onClick={knap01}>Visualize 0/1 Knapsack</button>    
        <button onClick={knapub}>Visualize Unbounded Knapsack</button>    
    </div>
    <div style={{display:"flex",marginLeft:"20px"}}>
        <div style={{border:"solid",width:"30px",height:"30px",textAlign:"center"}}></div>
        {Array.apply(0, Array(mw+1)).map(function (x, i) {
            return <div style={{border:"solid",width:"30px",height:"30px",textAlign:"center"}}>{i}</div>
        })}
    </div>
    {Array.apply(0, Array(a.length+1)).map(function (x, i) {
            return <div style={{display:"flex"}}>
            <div style={{border:"solid",width:"30px",height:"30px",marginLeft:"20px",textAlign:"center"}}>{(i===0)?"-":a[i-1]}</div>
            {Array.apply(0, Array(mw+1)).map(function (x, j) {
            return <div style={{border:"solid",width:"30px",height:"30px",textAlign:"center"}} id={i*100+j}>{0}</div>
        })}
            </div>
        })}
    <div style={{display:"flex"}}>
    <div > Max value that can be obtained is: </div>
    <div id="answer"></div>
    </div>
    </div>    
  )
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default Knp