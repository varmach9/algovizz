import React from 'react'
import { useState } from 'react'
import YoutubeEmbed from './utils/Youtube'

const Knp = () => {
    const [a,seta]=useState([1,2,3,4])
    const [b,setb]=useState([2,3,5,7])
    const [mw,setmw]=useState(5)
    const [c,setc]=useState("1 2 3 4")
    const [d,setd]=useState("2 3 5 7")
    const [f,setf]=useState(5)
    const [run,setrun]=useState(0)
    const [speed,setspeed]=useState(1000)

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
        await sleep(speed)
        for (let i=0;i<a.length+1;i++){
            document.getElementById(i*100).innerHTML=0
            document.getElementById(i*100).style.backgroundColor="grey"}
        for (let i=0;i<mw+1;i++){
            if(i!==0){mat[0][i]=-1000000}
                document.getElementById(i).style.backgroundColor="grey"}
        await sleep(speed)
        for(let i=1;i<a.length+1;i++){
            for(let j=1;j<mw+1;j++){
                document.getElementById(100*i+j).style.backgroundColor="red"
                document.getElementById(100*i+j-100).style.backgroundColor="green"
                console.log(i,j,a[i-1],b[i-1])
                if(j>=a[i-1]){
                    mat[i][j]=Math.max(mat[i-1][j],mat[i-1][j-a[i-1]]+b[i-1])
                    document.getElementById(100*i+j-a[i-1]-100).style.backgroundColor="green"
                }
                else{
                    mat[i][j]=Math.max(mat[i-1][j])
                }
                    document.getElementById(100*i+j).innerHTML=Math.max(0,mat[i][j])
                await sleep(speed/2)
                
                document.getElementById(100*i+j).style.backgroundColor="grey"
                document.getElementById(100*i+j-100).style.backgroundColor="grey"
                if(j>=a[i-1]){
                    document.getElementById(100*i+j-a[i-1]-100).style.backgroundColor="grey"
                }
                await sleep(speed/2)
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
        await sleep(speed)
        for (let i=0;i<a.length+1;i++){
            document.getElementById(i*100).innerHTML=0
            document.getElementById(i*100).style.backgroundColor="grey"}
        for (let i=0;i<mw+1;i++){
            if(i!==0){mat[0][i]=-1000000}
                document.getElementById(i).style.backgroundColor="grey"}
        await sleep(speed)
        for(let i=1;i<a.length+1;i++){
            for(let j=1;j<mw+1;j++){
                document.getElementById(100*i+j).style.backgroundColor="red"
                document.getElementById(100*i+j-100).style.backgroundColor="green"
                console.log(i,j,a[i-1],b[i-1])
                if(j>=a[i-1]){
                    mat[i][j]=Math.max(mat[i-1][j],mat[i][j-a[i-1]]+b[i-1])
                    document.getElementById(100*i+j-a[i-1]).style.backgroundColor="green"
                }
                else{
                    mat[i][j]=Math.max(mat[i-1][j])
                }
                    document.getElementById(100*i+j).innerHTML=Math.max(0,mat[i][j])
                await sleep(speed/2)
                
                document.getElementById(100*i+j).style.backgroundColor="grey"
                document.getElementById(100*i+j-100).style.backgroundColor="grey"
                if(j>=a[i-1]){
                    document.getElementById(100*i+j-a[i-1]).style.backgroundColor="grey"
                }
                await sleep(speed/2)
            }
        }
        document.getElementById("answer").innerHTML=mat[a.length][mw]
        setrun(0)
    }

  return (
    <div style={{marginLeft:"50px"}}>
    <div style={{display:"flex",justifyContent:"center",width:"1300px",margin:"10px"}}><h1 style={{fontWeight:"bolder",color:"Red", textShadow: "0 0 1px blue",paddingLeft:"235px",paddingRight:"5px"}}>Knapsack Problem</h1></div>
    
    <div  style={{marginLeft:"100px",display:"flex",height:"600px"}}>
    <div style={{width:"700px"}}>
        <form onSubmit={(e)=>{
            if(run===1){return}
            let wtarr=[]
            let valarr=[]
            let t1=c.split(" ")
            for(let i=0;i<t1.length;i++){wtarr.push(Number(t1[i]))}
            console.log(wtarr,t1)
            let t2=d.split(" ")
            for(let i=0;i<t2.length;i++){valarr.push(Number(t1[i]))}
            if(t1.length!==t2.length){alert("Values and Weights array should be of equal lengths")}
            else{
                for(let i=0;i<a.length+1;i++){
                    for(let j=0;j<mw+1;j++){
                        document.getElementById(100*i+j).innerHTML=0
                        document.getElementById(100*i+j).style.backgroundColor=""
                    }
                }
            seta(wtarr)
            setb(valarr)
            }
            e.preventDefault()
        }}>
        <div style={{display:"flex"}}>
        <h6 style={{marginRight:"10px",marginTop:"5px"}}>Weights Array:</h6>
        <input style={{width:'150px'}}type="text"  value={c} onChange={(e)=>{setc(e.target.value)}}/>
        <h6 style={{marginLeft:"20px",marginRight:"10px",marginTop:"5px"}}>Values Array:</h6>
        <input style={{width:'150px'}} type="text"  value={d} onChange={(e)=>{setd(e.target.value)}}/>
        <input style={{marginLeft:"20px"}} type="Submit" class="btn btn-warning btn-sm" value="Submit" />
        </div>
        </form>
        <form onSubmit={(e)=>{
            if(run===1){return}
            for(let i=0;i<a.length+1;i++){
                for(let j=0;j<mw+1;j++){
                    document.getElementById(100*i+j).innerHTML=0
                    document.getElementById(100*i+j).style.backgroundColor=""
                }
            }
            setmw(Number(f))
            e.preventDefault()
        }}>
        <div style={{display:"flex",marginTop:"20px"}}>
        <h6 style={{marginLeft:"0px",marginRight:"10px",marginTop:"5px"}}>Maximum Weight:</h6>
        <input type="integer" value={f} onChange={(e)=>{setf(e.target.value)}}/>
        <input style={{marginLeft:"20px"}}type="Submit" class="btn btn-warning btn-sm"  value="Submit" />
        </div>
        </form>
        <div style={{display:"flex",justifyContent:"center",marginTop:"10px"}}>
        <h6 style={{marginTop:"10px"}}>Adjust Speed:</h6>
            <div style={{width:"400px"}}>
                <button type="button" className={classNames("btn", (speed!==1000)?"btn-light":"btn-info", "btn-sm", "border",(speed===1000)?"border-link":"",(speed===1000)?"border-5":"")} style={{marginLeft:"10px"}} onClick={()=>{setspeed(1000)}}>Slow</button>
                <button type="button" className={classNames("btn", (speed!==250)?"btn-light": "btn-info", "btn-sm", "border",(speed===250)?"border-link": "",(speed===250)?"border-5":"")} style={{marginLeft:"10px" }} onClick={()=>{setspeed(250)}}>Medium</button>
                <button type="button" className={classNames("btn", (speed!==100)?"btn-light": "btn-info", "btn-sm", "border",(speed===100)?"border-link": "",(speed===100)?"border-5":"")} style={{marginLeft:"10px" }} onClick={()=>{setspeed(100)}}>Fast</button>
            </div>
        </div>
        <div style={{marginTop:"10px",marginBottom:"10px"}}>
        <button class="btn btn-primary btn-sm" style={{marginTop:"10px"}} onClick={knap01}>Visualize 0/1 Knapsack</button>    
        <button class="btn btn-primary btn-sm" style={{marginTop:"10px",marginLeft:"10px"}} onClick={knapub}>Visualize Unbounded Knapsack</button>    
        </div>
        <div style={{display:"flex",marginBottom:"20px"}}>
    <div > Max value that can be obtained is: </div>
    <div id="answer" style={{backgroundColor:"yellow",marginLeft:"10px"}}></div>
    </div>
  <p>
    The Knapsack problem involves selecting a subset of items with maximum total value, given a knapsack with a limited weight capacity. 
    Here's how the DP approach solves the problem:
  </p>
  <ol>
    <li>
      Create a table to store the maximum value that can be obtained for different item and weight combinations.
    </li>
    <li>
      Initialize the first row of the table to 0, as there is no item available to choose from.
    </li>
    <li>
      Iterate through the remaining cells of the table in a top-down manner.
      <ul>
        <li>
          If the current item's weight is less than or equal to the remaining weight capacity, choose the maximum value between including the item
          {/* <!-- Differentiation for 0/1 Knapsack --> */}
          (for 0/1 Knapsack) or including the item multiple times 
          {/* <!-- Differentiation for Unbounded Knapsack --> */}
          (for Unbounded Knapsack) and excluding the item.
        </li>
        <li>
          If the current item's weight exceeds the remaining weight capacity, skip the item and take the value from the cell above (i-1, j).
        </li>
      </ul>
    </li>
    <li>
      The bottom-right cell of the table will contain the maximum value that can be obtained using the given weight capacity.
    </li>
  </ol>

</div>
    <div style={{marginLeft:"20px",marginTop:"20px"}}>
    <div style={{display:"flex",marginLeft:"20px"}}>
        <div style={{border:"solid",width:"50px",height:"50px",textAlign:"center"}}></div>
        {Array.apply(0, Array(mw+1)).map(function (x, i) {
            return <div style={{border:"solid",width:"50px",height:"50px",textAlign:"center"}}>{i}</div>
        })}
    </div>
    {Array.apply(0, Array(a.length+1)).map(function (x, i) {
            return <div style={{display:"flex"}}>
            <div style={{border:"solid",width:"50px",height:"50px",marginLeft:"20px",textAlign:"center"}}>{(i===0)?"-":a[i-1]}</div>
            {Array.apply(0, Array(mw+1)).map(function (x, j) {
            return <div style={{border:"solid",width:"50px",height:"50px",textAlign:"center"}} id={i*100+j}>{0}</div>
        })}
            </div>
        })}
    </div>
    </div>

    <div style={{display:"flex",marginTop:"30px",marginLeft:"50px",color:"orangered"}}><h2>Learn More from DP</h2></div>
    <hr style={{width:"95%",margin:"auto"}}></hr>
    <div className='' style={{display: "flex",marginTop:"30px",color:"green",textAlign:"center"}}>
        
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="aPQY__2H3tE" title="DP general approach" />  </div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="l02UxPYRmCQ" title="0/1 Knapsack"/></div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="aycn9KO8_Ls" title="Unbounded Lnapsack"/></div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="4Urd0a0BNng" title="LCS"/>    </div>
   </div>
   <div className='' style={{display: "flex",marginTop:"30px",color:"green",textAlign:"center"}}>
        
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="prx1psByp7U" title="Matrix Chain Multiplication" />  </div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="5eFh5CC-8KY" title="Painting Fence"/></div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="IGIe46xw3YY" title="Stock Selling"/></div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="0zvG6bIZ5KY" title="StairCase Problem"/>    </div>
   </div>

    <div>
    <div style={{display:"flex",marginTop:"30px",marginLeft:"50px",color:"orangered"}}><h2>Practice Dynamic Programming</h2></div>
    <hr style={{width:"95%",margin:"auto"}}></hr>
<div style={{textAlign:"left",width:"1350px",marginLeft:"30px",marginTop:"10px",marginBottom:"30px"}}>

<ul><li style={{marginTop:'20px'}}><strong>Easy:</strong><p></p><ol><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/program-for-nth-fibonacci-number/">Fibonacci numbers</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/program-nth-catalan-number/">nth Catalan Number</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/bell-numbers-number-of-ways-to-partition-a-set/">Bell Numbers (Number of ways to Partition a Set)</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/dynamic-programming-set-9-binomial-coefficient/">Binomial Coefficient</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/dynamic-programming-set-7-coin-change/">Coin change problem</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/dynamic-programming-subset-sum-problem/">Subset Sum Problem</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/compute-ncr-p-set-1-introduction-and-dynamic-programming-solution/">Compute nCr % p</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/dynamic-programming-set-13-cutting-a-rod/">Cutting a Rod</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/painting-fence-algorithm/">Painting Fence Algorithm</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/longest-common-subsequence/">Longest Common Subsequence</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/longest-increasing-subsequence/">Longest Increasing Subsequence</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/longest-subsequence-such-that-difference-between-adjacents-is-one/">Longest subsequence such that difference between adjacents is one</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/maximum-size-sub-matrix-with-all-1s-in-a-binary-matrix/">Maximum size square sub-matrix with all 1s</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/dynamic-programming-set-6-min-cost-path/">Min Cost Path</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/minimum-number-of-jumps-to-reach-end-of-a-given-array/">Minimum number of jumps to reach end</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/longest-common-substring-space-optimized-dp-solution/">Longest Common Substring (Space optimized DP solution)</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/count-ways-reach-nth-stair-using-step-1-2-3/">Count ways to reach the nth stair using step 1, 2 or 3</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/count-possible-paths-top-left-bottom-right-nxm-matrix/">Count all possible paths from top left to bottom right of a mXn matrix</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/unique-paths-in-a-grid-with-obstacles/">Unique paths in a Grid with Obstacles</a></li></ol></li><li style={{marginTop:'20px'}}><strong>Medium:</strong><p></p><ol><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/dynamic-programming-set-16-floyd-warshall-algorithm/">Floyd Warshall Algorithm</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/dynamic-programming-set-23-bellman-ford-algorithm/">Bellman–Ford Algorithm</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/knapsack-problem/">0-1 Knapsack Problem</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/printing-items-01-knapsack/">Printing Items in 0/1 Knapsack</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/unbounded-knapsack-repetition-items-allowed/">Unbounded Knapsack (Repetition of items allowed)</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/dynamic-programming-set-11-egg-dropping-puzzle/">Egg Dropping Puzzle</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/dynamic-programming-set-32-word-break-problem/">Word Break Problem</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/vertex-cover-problem-set-2-dynamic-programming-solution-tree/">Vertex Cover Problem</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/tile-stacking-problem/">Tile Stacking Problem</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/dynamic-programming-set-21-box-stacking-problem/">Box-Stacking Problem</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/dynamic-programming-set-18-partition-problem/">Partition Problem</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/travelling-salesman-problem-set-1/">Travelling Salesman Problem | Set 1 (Naive and Dynamic Programming)</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/dynamic-programming-set-12-longest-palindromic-subsequence/">Longest Palindromic Subsequence</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/longest-common-increasing-subsequence-lcs-lis/">Longest Common Increasing Subsequence (LCS + LIS)</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-distinct-subset-subsequence-sums-array/">Find all distinct subset (or subsequence) sums of an array</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/weighted-job-scheduling/">Weighted job scheduling</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/count-derangements-permutation-such-that-no-element-appears-in-its-original-position/">Count Derangements (Permutation such that no element appears in its original position)</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/dynamic-programming-set-28-minimum-insertions-to-form-a-palindrome/">Minimum insertions to form a palindrome</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/wildcard-pattern-matching/">Wildcard Pattern Matching</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/ways-to-arrange-balls-such-that-adjacent-balls-are-of-different-types/">Ways to arrange Balls such that adjacent balls are of different types</a></li></ol></li><li style={{marginTop:'20px'}}><strong>Hard:</strong><p></p><ol><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/dynamic-programming-set-17-palindrome-partitioning/">Palindrome Partitioning</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/dynamic-programming-set-18-word-wrap/">Word Wrap Problem</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/painters-partition-problem/">The painter’s partition problem</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/program-bridge-torch-problem/">Program for Bridge and Torch problem</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/dynamic-programming-set-8-matrix-chain-multiplication/">Matrix Chain Multiplication</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/printing-brackets-matrix-chain-multiplication-problem/">Printing brackets in Matrix Chain Multiplication Problem</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/dynamic-programming-set-27-max-sum-rectangle-in-a-2d-matrix/">Maximum sum rectangle in a 2D matrix</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/maximum-profit-by-buying-and-selling-a-share-at-most-k-times/">Maximum profit by buying and selling a share at most k times</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/minimum-cost-sort-strings-using-reversal-operations-different-costs/">Minimum cost to sort strings using reversal operations of different costs</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/count-arithmetic-progression-subsequences-array/">Count of AP (Arithmetic Progression) Subsequences in an array</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/introduction-to-dynamic-programming-on-trees/">Introduction to Dynamic Programming on Trees</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/maximum-height-of-tree-when-any-node-can-be-considered-as-root/">Maximum height of Tree when any Node can be considered as Root</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/longest-repeating-and-non-overlapping-substring/">Longest repeating and non-overlapping substring</a></li></ol></li></ul>

</div>
</div>

    </div>    
  )
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function classNames(...args) {
    return args.filter(Boolean).join(' ')
  }

export default Knp