import React from 'react'
import { useState } from 'react'

const Primenumber = () => {
    const[n,setn]=useState(50)
    const findp=async()=>{
        for(let i=1;i<=n;i++){document.getElementById(i).style.backgroundColor="red"}
        let k=Math.floor(Math.sqrt(n))
        document.getElementById(1).style.backgroundColor="white"
        for(let i=2;i<=k;i++){
            if(document.getElementById(i).style.backgroundColor==="white"){continue}
            // console.log(document.getElementById(i).style.backgroundColor)
            for(let j=i*2;j<=n;j+=i){
            document.getElementById(j).style.backgroundColor="blue"
            await sleep(100)
            }
            for(let j=i*2;j<=n;j+=i){
                if(document.getElementById(j).style.backgroundColor!=='white')
                document.getElementById(j).style.backgroundColor="white"
            }
        }
        let primes=0
        for(let i=1;i<=n;i++){if(document.getElementById(i).style.backgroundColor==="red"){primes+=1}}
        document.getElementById("restext").innerHTML=`Number of primes till ${n} is ${primes}`
    }
  return (
    <div>
        <div>
            The sieve of Eratosthenes algorithm
        </div>
        <div style={{display:"flex"}}>
            <div style={{marginRight:"10px"}}>set maximum number: </div>
            <div><input type="integer"  value={n} onChange={(e)=>{setn(Number(e.target.value));
            document.getElementById("restext").innerHTML=``
            }}/></div>
            <div><button onClick={findp}>Find Primes</button></div>
            <div id='restext' style={{marginLeft:"30px"}}></div>
        </div>
        <div>
            <div className="Grid" style={{borderColor:"black", margin:"30px",padding:"0px", width:"1450px"}}>
                {Array.apply(0, Array(Math.floor(n/15))).map(function (x, i) {
                return  <div className={`row-${i}`} style={{display:"flex",justifyContent:"center"}}>
                    {Array.apply(0, Array(15)).map(function (y, j) {
                        return  <div id={`${(j+1)+(i)*15}`} style={{border:"solid", display:"flex",justifyContent:"center",width:"60px",height:"40px",marginLeft:"15px",marginRight:"15px",marginBottom:"25px"}}>{(j+1)+(i)*15}</div>
                    })}
                    
                </div>
            })}
            <div style={{display:"flex",marginLeft:"15px"}}>
                    {Array.apply(0, Array(n%15)).map(function (y, j) {
                        return  <div id={`${(j+1)+(Math.floor(n/15))*15}`}style={{border:"solid", display:"flex",justifyContent:"center",width:"60px",height:"40px",marginLeft:"15px",marginRight:"15px"}}>{(j+1)+(Math.floor(n/15))*15}</div>
                    })}
             </div>
            </div>
        </div>
    </div>
  )
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default Primenumber