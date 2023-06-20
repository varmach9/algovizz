import React, { useState,useEffect } from 'react'
import YoutubeEmbed from './utils/Youtube'

const Nqueen = () => {
    const [n,setn]=useState(6)
    const [d,setd]=useState(6)
    const [r,setr]=useState(0)
    const [speed,setspeed]=useState(1000)
    useEffect(()=>{window.scroll({
        top: 0, 
        behavior:"instant"
      });},[])
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
                // await sleep(speed)
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
                let hei=70*8/n
                document.getElementById(answer[i][1]*100+answer[i][0]).innerHTML=`<img src='queen.png' alt='n' height=${hei}px width=${hei}px />`; 
                for(let j=0;j<n;j++){
                    document.getElementById(j*100+answer[i][0]).style.backgroundColor="#b3ffcc"
                    document.getElementById(answer[i][1]*100+j).style.backgroundColor="#b3ffcc"
                    try{
                    document.getElementById((answer[i][1]-answer[i][0]+j)*100+j).style.backgroundColor="#b3ffcc"}
                    catch(err){}
                    try{
                        document.getElementById((answer[i][0]+answer[i][1]-j)*100+j).style.backgroundColor="#b3ffcc"}
                        catch(err){}
                    }
                    document.getElementById(answer[i][1]*100+answer[i][0]).style.backgroundColor="green"
                await sleep(speed)
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
                await sleep(speed)
                document.getElementById(answer[i][1]*100+answer[i][0]).style.backgroundColor=((answer[i][1]+answer[i][0])%2===0)?"white":"grey"
            }else{ 
                for(let j=0;j<n;j++){
                    document.getElementById(j*100+answer[i][0]).style.backgroundColor="#b3ffcc"
                    document.getElementById(answer[i][1]*100+j).style.backgroundColor="#b3ffcc"
                    try{
                        document.getElementById((answer[i][1]-answer[i][0]+j)*100+j).style.backgroundColor="#ccccff"}
                        catch(err){}
                        try{
                            document.getElementById((answer[i][0]+answer[i][1]-j)*100+j).style.backgroundColor="#ccccff"}
                            catch(err){}
                    }
                
                document.getElementById(answer[i][1]*100+answer[i][0]).style.backgroundColor="red"
                await sleep(speed)
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
    <div style={{marginLeft:"50px"}}>
        <div style={{display:"flex",justifyContent:"center",width:"1300px",margin:"10px"}}><h1 style={{fontWeight:"bolder",color:"darkgreen", textShadow: "0 0 1px blue",paddingLeft:"235px",paddingRight:"5px"}}>N-QUEEN</h1></div>
        <div style={{display:"flex"}}>
        <div style={{marginLeft:"50px",width:"500px"}}>
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
                for(let kk=0;kk<n;kk++){
                    for(let kk2=0;kk2<n;kk2++){
                        document.getElementById(kk*100+kk2).innerHTML=""
                    }
                }
                setn(Number(d));
                e.preventDefault()
            }}>
                <label>Enter board size:</label>
                <input type="text" style={{width:"50px",margin:"10px"}} value={d} onChange={(e)=>{setd(e.target.value)}}/>
                <input type="Submit" class="btn btn-primary btn-sm"  value="Submit" />
            </form>
            <button class="btn btn-warning" style={{margin:"10px"}} onClick={nq}>Backtrack solution</button>
            <div style={{marginTop:"5px",marginBottom:"10px",marginLeft:"10px"}}>Adjust Speed:</div>
            <div style={{marginLeft:"10px"}}>
                <button type="button" className={classNames("btn", (speed!==1000)?"btn-light":"btn-info", "btn-sm", "border",(speed===1000)?"border-link":"",(speed===1000)?"border-5":"")} style={{marginLeft:"10px"}} onClick={()=>{setspeed(1000)}}>Slow</button>
                <button type="button" className={classNames("btn", (speed!==500)?"btn-light": "btn-info", "btn-sm", "border",(speed===500)?"border-link": "",(speed===500)?"border-5":"")} style={{marginLeft:"10px" }} onClick={()=>{setspeed(500)}}>Medium</button>
                <button type="button" className={classNames("btn", (speed!==100)?"btn-light": "btn-info", "btn-sm", "border",(speed===100)?"border-link": "",(speed===100)?"border-5":"")} style={{marginLeft:"10px" }} onClick={()=>{setspeed(100)}}>Fast</button>
            </div>
            <div style={{marginTop:"20px",width:"500px"}}>
  <h3>N-Queen Problem: Backtracking Method</h3>
  <ul>
    <li>Start with an empty <code>n x n</code> chessboard, representing <code>n</code> rows and columns.</li>
    <li>Begin with the leftmost column and recursively try to place a queen in each row of that column.</li>
    <li>Check if it is safe to place a queen at the current position by considering conflicts with previously placed queens in the same row, column, and diagonals.</li>
    <li>If a safe position is found, mark it as a queen and move to the next column.</li>
    <li>If all queens are successfully placed without conflicts, a valid solution is found. Otherwise, backtrack to the previous column and explore other possibilities until a solution is found or all possibilities are exhausted.</li>
  </ul>
</div>

        </div>
        <div style={{width:"680px",height:"580px",paddingLeft:"50px"}}>
        {Array.apply(0, Array(n)).map(function (x, i) {
            return <div style={{display:"flex"}}>
            {Array.apply(0, Array(n)).map(function (x, j) {
            return <div style={{border:"solid 0.5px",width:`${70*8/n}px`,height:`${70*8/n}px`,textAlign:"center",backgroundColor:((i+j)%2===1)?"grey":"white"}} id={i*100+j}>{}</div>
        })}
            </div>
        })}
        </div>
        <div><img src="nqueen.png" alt="" width="200px"></img></div>

        </div>
        <div style={{display:"flex",marginTop:"30px",marginLeft:"50px",color:"orangered"}}><h2>Learn More in Backtracking </h2></div>
    <hr style={{width:"95%",margin:"auto"}}></hr>
    <div className='' style={{display: "flex",marginTop:"30px",color:"green",textAlign:"center"}}>
        
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="xFv_Hl4B83A" title="N-Queen" />  </div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="4BBB0mvvbGA" title="Rat in a Maze"/></div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="FWAIf_EVUKE" title="Sudoku Solver"/></div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="Nabbpl7y4Lo" title="Permutations"/>    </div>
   </div>

    <div>
    <div style={{display:"flex",marginTop:"30px",marginLeft:"50px",color:"orangered"}}><h2>Practice Backtracking</h2></div>
    <hr style={{width:"95%",margin:"auto"}}></hr>
<div style={{textAlign:"left",width:"1450px",marginLeft:"30px",marginTop:"10px",marginBottom:"30px"}}>
    <ul><li style={{marginTop:"10px"}}><strong>Easy:</strong><p></p><ol><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/backtracking-to-find-all-subsets/">Backtracking to find all subsets</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/check-given-string-sum-string/">Check if a given string is sum-string</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/count-possible-paths-two-vertices/">Count all possible paths between two vertices</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-distinct-subsets-given-set/">Find all distinct subsets of a given set</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-if-there-is-a-path-of-more-than-k-length-from-a-source/">Find if there is a path of more than k length from a source</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-paths-given-source-destination/">Print all paths from a given source to a destination</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/print-possible-strings-can-made-placing-spaces/">Print all possible strings that can be made by placing spaces</a></li></ol></li><li style={{marginTop:"10px"}}><strong>Medium:</strong><p></p><ol><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/tug-of-war/">Tug of War</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/8-queen-problem/">8 queen problem</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/combinational-sum/">Combinational Sum</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/warnsdorffs-algorithm-knights-tour-problem/">Warnsdorff’s algorithm for Knight’s tour problem</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-paths-from-corner-cell-to-middle-cell-in-maze/">Find paths from corner cell to middle cell in maze</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-maximum-number-possible-by-doing-at-most-k-swaps/">Find Maximum number possible by doing at-most K swaps</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/rat-in-a-maze-with-multiple-steps-jump-allowed/">Rat in a Maze with multiple steps or jump allowed</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/n-queen-in-on-space/">N Queen in O(n) space</a></li></ol></li><li style={{marginTop:"10px"}}><strong>Hard:</strong><p></p><ol><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/powet-set-lexicographic-order/">Power Set in Lexicographic order</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/word-break-problem-using-backtracking/">Word Break Problem using Backtracking</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/partition-set-k-subsets-equal-sum/">Partition of a set into K subsets with equal sum</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/longest-possible-route-in-a-matrix-with-hurdles/">Longest Possible Route in a Matrix with Hurdles</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-shortest-safe-route-in-a-path-with-landmines/">Find shortest safe route in a path with landmines</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/print-palindromic-partitions-string/">Print all palindromic partitions of a string</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/printing-solutions-n-queen-problem/">Printing all solutions in N-Queen Problem</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/print-longest-common-sub-sequences-lexicographical-order/">Print all longest common sub-sequences in lexicographical order</a></li></ol></li></ul>

</div>
    </div>
    </div>
  )
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms/5));
}
function classNames(...args) {
    return args.filter(Boolean).join(' ')
  }

export default Nqueen