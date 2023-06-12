import React, { useState } from 'react'

const Nqueen = () => {
    const [n,setn]=useState(6)
    const [d,setd]=useState(6)
    const [r,setr]=useState(0)
    let answer=[]
    const solveNQUtil=(board, col,N,ld,rd,cl)=>{
        console.log(col)
        if (col >= N)
            {console.log("final",col);return 1}
        for (let i = 0; i < N; i++)
        {
            if ((ld[i - col ] !== 1 &&
                 rd[i + col] !== 1) && cl[i] !== 1)
            {
                console.log(i,col)
                board[i][col] = 1;
                ld[i - col ] =1;
                rd[i + col] = 1;
                cl[i] = 1;
                answer.push([i,col,1])
                // await sleep(500)
                // document.getElementById(col*100+i).style.backgroundColor=((i+col)%2===0)?"white":"grey"
                if (solveNQUtil(board, col + 1,N,ld,rd,cl)) return 1;
                // document.getElementById(col*100+i).innerHTML=""
                answer.push([i,col,0])
                ld[i - col ] =0;
                rd[i + col] = 0;
                cl[i] = 0;
            }
            else{
                answer.push([i,col,0])
            }
        }
        return 0;
    }
     
    const nq=async()=>{
        if(r===1){return}
        setr(1)
        let board=[]
        let columns={}
        let dia1={}
        let dia2={}
        for(let i=0;i<n;i++){
            let arr=[]
            for(let j=0;j<n;j++){
                document.getElementById(j*100+i).innerHTML=""
                arr.push(0)
                dia1[i+j]=0
                dia2[i-j]=0
            }
            columns[i]=0
            board.push(arr)
        }
        solveNQUtil(board,0,n,dia1,dia2,columns)
        for(let i=0;i<answer.length;i++){
            if(answer[i][2]===1){
                
                document.getElementById(answer[i][1]*100+answer[i][0]).innerHTML="<img src='queen.jpg' alt='n' height=30px width=50px/>";
                for(let j=0;j<n;j++){
                    document.getElementById(j*100+answer[i][0]).style.backgroundColor="lightblue"
                    document.getElementById(answer[i][1]*100+j).style.backgroundColor="lightblue"
                    try{
                    document.getElementById((answer[i][1]-answer[i][0]+j)*100+j).style.backgroundColor="pink"}
                    catch(err){}
                    try{
                        document.getElementById((answer[i][0]+answer[i][1]-j)*100+j).style.backgroundColor="pink"}
                        catch(err){}
                    }
                    document.getElementById(answer[i][1]*100+answer[i][0]).style.backgroundColor="green"
                await sleep(500)
                for(let j=0;j<n;j++){
                    document.getElementById(j*100+answer[i][0]).style.backgroundColor=((j+answer[i][0])%2===0)?"white":"grey"
                    document.getElementById(answer[i][1]*100+j).style.backgroundColor=((answer[i][1]+j)%2===0)?"white":"grey"
                    try{
                        document.getElementById((answer[i][1]-answer[i][0]+j)*100+j).style.backgroundColor=(((answer[i][1]-answer[i][0]+j)+j)%2===0)?"white":"grey"}
                        catch(err){}
                        try{
                            document.getElementById((answer[i][0]+answer[i][1]-j)*100+j).style.backgroundColor=(((answer[i][0]-answer[i][1]+j)+j)%2===0)?"white":"grey"}
                            catch(err){}
                        
                    }
                await sleep(500)
                document.getElementById(answer[i][1]*100+answer[i][0]).style.backgroundColor=((answer[i][1]+answer[i][0])%2===0)?"white":"grey"
            }else{ 
                for(let j=0;j<n;j++){
                    document.getElementById(j*100+answer[i][0]).style.backgroundColor="lightblue"
                    document.getElementById(answer[i][1]*100+j).style.backgroundColor="lightblue"
                    try{
                        document.getElementById((answer[i][1]-answer[i][0]+j)*100+j).style.backgroundColor="pink"}
                        catch(err){}
                        try{
                            document.getElementById((answer[i][0]+answer[i][1]-j)*100+j).style.backgroundColor="pink"}
                            catch(err){}
                    }
                
                document.getElementById(answer[i][1]*100+answer[i][0]).style.backgroundColor="red"
                await sleep(500)
                for(let j=0;j<n;j++){
                    document.getElementById(j*100+answer[i][0]).style.backgroundColor=((j+answer[i][0])%2===0)?"white":"grey"
                    document.getElementById(answer[i][1]*100+j).style.backgroundColor=((answer[i][1]+j)%2===0)?"white":"grey"
                    try{
                        document.getElementById((answer[i][1]-answer[i][0]+j)*100+j).style.backgroundColor=(((answer[i][1]-answer[i][0]+j)+j)%2===0)?"white":"grey"}
                        catch(err){}
                        try{
                            document.getElementById((answer[i][0]+answer[i][1]-j)*100+j).style.backgroundColor=(((answer[i][0]-answer[i][1]+j)+j)%2===0)?"white":"grey"}
                            catch(err){}
                    }
                document.getElementById(answer[i][1]*100+answer[i][0]).style.backgroundColor=((answer[i][1]+answer[i][0])%2===0)?"white":"grey"
                document.getElementById(answer[i][1]*100+answer[i][0]).innerHTML=""
            }
        }
        console.log(answer)
        console.log("done")
        setr(0)
    }
  return (
    <div>
        <div>N queen</div>
        <div>
            <form onSubmit={(e)=>{
                if(Number(d)>=9){
                    alert(`it takes a long time to compute nqueen in a ${Number(d)} X  ${Number(d)} grid, so enter a smaller number`)
                    e.preventDefault()
                    return
                }
                if(Number(d)<1){
                    alert(`No N-queen configuration possible for a ${Number(d)} X  ${Number(d)} grid, so enter a larger number`)
                    e.preventDefault()
                    return
                }
                setn(Number(d));
                e.preventDefault()
            }}>
                <label>Enter board size:</label>
                <input type="text"  value={d} onChange={(e)=>{setd(e.target.value)}}/>
                <input type="Submit"  value="Submit" />
            </form>
            <button onClick={nq}>Backtrack solution</button>
        </div>
        {Array.apply(0, Array(n)).map(function (x, i) {
            return <div style={{display:"flex"}}>
            {Array.apply(0, Array(n)).map(function (x, j) {
            return <div style={{border:"solid 0.5px",width:"50px",height:"50px",textAlign:"center",backgroundColor:((i+j)%2===1)?"grey":"white"}} id={i*100+j}>{}</div>
        })}
            </div>
        })}
    </div>
  )
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms/5));
}


export default Nqueen