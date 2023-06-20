import React from 'react'
import { useState,useEffect } from 'react'
import YoutubeEmbed from './utils/Youtube'

const Primenumber = () => {
    const[n,setn]=useState(50)
    useEffect(()=>{window.scroll({
        top: 0, 
        behavior:"instant"
      });},[])
    const findp=async()=>{
        for(let i=1;i<=n;i++){document.getElementById(i).style.backgroundColor="red"}
        let k=Math.floor(Math.sqrt(n))
        document.getElementById(1).style.backgroundColor="white"
        for(let i=2;i<=k;i++){
            if(document.getElementById(i).style.backgroundColor==="white"){continue}
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
    <div >
        <div style={{display:"flex",justifyContent:"center",width:"1300px",margin:"10px"}}><h1 style={{fontWeight:"bolder",color:"purple", textShadow: "0 0 1px blue",paddingLeft:"235px",paddingRight:"5px"}}>Prime Numbers</h1></div>

        <h4 style={{marginLeft:"100px",marginBottom:"20px"}}>
            The sieve of Eratosthenes algorithm 
        </h4>
        <div style={{display:"flex",marginLeft:"100px"}}>
            <div style={{marginRight:"10px"}}>Set Maximum Number: </div>
            <div><input type="integer" style={{width:"50px"}} value={n} onChange={(e)=>{if(Number(e.target.value)<=5000){setn(Number(e.target.value))};
            document.getElementById("restext").innerHTML=``
            }}/></div>
            <div style={{marginLeft:"20px"}}><button class="btn btn-primary btn-sm" onClick={findp}>Find Primes</button></div>
            <div id='restext' style={{marginLeft:"30px"}}></div>
        </div>
        <div style={{minHeight:"300px"}}>
            <div className="Grid" style={{borderColor:"black", margin:"30px",padding:"0px", width:"1450px"}}>
                {Array.apply(0, Array(Math.floor(n/15))).map(function (x, i) {
                return  <div className={`row-${i}`} style={{display:"flex",justifyContent:"center"}}>
                    {Array.apply(0, Array(15)).map(function (y, j) {
                        return  <div id={`${(j+1)+(i)*15}`} style={{border:"solid", display:"flex",justifyContent:"center",width:"60px",height:"40px",marginLeft:"15px",marginRight:"15px",marginBottom:"25px"}}>{(j+1)+(i)*15}</div>
                    })}
                    
                </div>
            })}
            <div style={{display:"flex",paddingLeft:"50px"}}>
                    {Array.apply(0, Array(n%15)).map(function (y, j) {
                        return  <div id={`${(j+1)+(Math.floor(n/15))*15}`}style={{border:"solid", display:"flex",justifyContent:"center",width:"60px",height:"40px",marginLeft:"15px",marginRight:"15px"}}>{(j+1)+(Math.floor(n/15))*15}</div>
                    })}
             </div>
            </div>
        </div>
    <div style={{marginLeft:"50px",marginTop:"20px"}}>
    <div style={{display:"flex",marginTop:"30px",marginLeft:"50px",color:"orangered"}}><h2>Learn More </h2></div>
    <hr style={{width:"95%",margin:"auto"}}></hr>
    <div className='' style={{display: "flex",marginTop:"30px",marginBottom:"50px",color:"green",textAlign:"center"}}>
        
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="nDPo9hsDNvU" title="" />  </div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="NZ7-ntEgt6g" title=""/></div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}></div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}> </div>
   </div>
    </div>
    </div>
  )
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default Primenumber