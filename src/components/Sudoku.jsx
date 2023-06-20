import React,{useState,useEffect} from 'react'
import YoutubeEmbed from './utils/Youtube'
const Sudoku = () => {
    const [ru,setru]=useState(0)
    const [completed,setcompleted]=useState(0)
    const [speed,setspeed]=useState(200)
    useEffect(()=>{window.scroll({
        top: 0, 
        behavior:"instant"
      });},[])
    const row=[]
    const col=[]
    const box=[]
    const ans=[]
    for(let i=0;i<9;i++){
       row.push([])
       col.push([])
       box.push([])
    }
    const randomize=()=>{
        if(ru===1){return}
        setru(1)
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                    document.getElementById(100*i+j).style.backgroundColor="white"
                    document.getElementById(100*i+j).innerHTML=""
            }}

        for(let i=0;i<9;i++){
           row.pop(0)
           col.pop(0)
           box.pop(0)
        }
        for(let i=0;i<9;i++){
            row.push([])
            col.push([])
            box.push([])
         }
        console.log(row,col,box)
        
        let mat=[[3, 0, 6, 5, 0, 8, 4, 0, 0],
        [5, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 8, 7, 0, 0, 0, 0, 3, 1],
        [0, 0, 3, 0, 1, 0, 0, 8, 0],
        [9, 0, 0, 8, 6, 3, 0, 0, 5],
        [0, 5, 0, 0, 9, 0, 6, 0, 0],
        [1, 3, 0, 0, 0, 0, 2, 5, 0],
        [0, 0, 0, 0, 0, 0, 0, 7, 4],
        [0, 0, 5, 2, 0, 6, 3, 0, 0]]

        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                let b=3*(Math.floor(i/3))+Math.floor(j/3)
                if(mat[i][j]!==0){
                    row[i].push(mat[i][j])
                    col[j].push(mat[i][j])
                    box[b].push(mat[i][j])
                    document.getElementById(100*i+j).innerHTML=mat[i][j]
                    document.getElementById(100*i+j).style.backgroundColor="grey"
                }
            }
        }
        
        setru(0)
    }
    const displayans=async(arr)=>{
        console.log(arr.length)
        for(let i=0;i<arr.length;i++){
            if (arr[i][3]===1){
                document.getElementById(100*arr[i][0]+arr[i][1]).innerHTML=arr[i][2]
                document.getElementById(100*arr[i][0]+arr[i][1]).style.backgroundColor="green"
                await sleep(speed)
                document.getElementById(100*arr[i][0]+arr[i][1]).style.backgroundColor="white" 
                await sleep(speed)
            }else{
                document.getElementById(100*arr[i][0]+arr[i][1]).style.backgroundColor="red" 
                await sleep(speed)
                document.getElementById(100*arr[i][0]+arr[i][1]).innerHTML=""
                document.getElementById(100*arr[i][0]+arr[i][1]).style.backgroundColor="white" 
                await sleep(speed)
            }
        }
        setcompleted(1)
    }
    const solver=()=>{
        if(ru===1){alert(1);return}
        setcompleted(0)
        setru(1)
        // console.log(row)
        const solve=(i,j)=>{
            if(i===9){return 1}
            if(j===9){return solve(i+1,0)}
            if(document.getElementById(100*i+j).style.backgroundColor==="grey"){return solve(i,j+1)}
            let b=3*(Math.floor(i/3))+Math.floor(j/3)
            for(let k=1;k<=9;k++){
                if (!row[i].includes(k) && !col[j].includes(k) && !box[b].includes(k)){
                    row[i].push(k)
                    col[j].push(k)
                    box[b].push(k)
                    ans.push([i,j,k,1])
                    if(solve(i,j+1)===1){return 1}
                    ans.push([i,j,k,0])
                    row[i].splice(row[i].indexOf(k), 1)
                    col[j].splice(col[j].indexOf(k), 1)
                    box[b].splice(box[b].indexOf(k), 1)
                }
            }
            return 0;
        }
        if(solve(0,0)===0){alert("this grid cant be solved")}
        else{ displayans(ans)}
        console.log("done")
        setru(0)
    }

    
  return (
    <div style={{marginLeft:"50px"}}>
        <div style={{display:"flex",justifyContent:"center",width:"1300px",margin:"10px"}}><h1 style={{fontWeight:"bolder",color:"blue", textShadow: "0 0 1px blue",paddingLeft:"235px",paddingRight:"5px"}}>Sudoku</h1></div>
        <div style={{display:"flex", marginLeft:"20px"}}>
        <div style={{width:"501px"}}>
            <button class="btn btn-primary " style={{marginLeft:"30px"}} onClick={solver}>Backtrack solution</button>
            <button class="btn btn-primary " style={{marginLeft:"30px"}} onClick={randomize}>Fill starting grid</button>

<div style={{marginTop:"20px",width:"500px"}}>
  <h3>Sudoku Problem: Backtracking Method</h3>
  <ul>
    <li>Start with an empty Sudoku grid consisting of a <code>9 x 9</code> board divided into <code>3 x 3</code> subgrids.</li>
    <li>Fill in the given clues into the grid, ensuring that each clue follows the Sudoku rules.</li>
    <li>Begin with the first empty cell and recursively try to place a valid number (from 1 to 9) into that cell.</li>
    <li>Check if the number placement is valid by considering conflicts with numbers in the same row, column, and subgrid.</li>
    <li>If a valid number is found, place it in the cell and move to the next empty cell.</li>
    <li>If all cells are filled without conflicts, a valid solution is found. Otherwise, backtrack to the previous cell and try a different number until a solution is found or all possibilities are exhausted.</li>
  </ul>
</div>

        </div>
        <div style={{justifyContent:"center",display:"flex",marginLeft:"100px"}}>
        <div>
        {Array.apply(0, Array(3)).map(function (x, i) {
            return <div style={{display:"flex",border:"solid 1px",width:"455px"}}>
            {Array.apply(0, Array(3)).map(function (x, j) {
            return <div style={{border:"solid 1px",width:"470px"}}>
                {Array.apply(0, Array(3)).map(function (x, k) {
            return <div style={{display:"flex"}}>
            {Array.apply(0, Array(3)).map(function (x, l) {
            return <div style={{border:"solid 0.5px",width:"50px",height:"50px",textAlign:"center",paddingTop:"10px"}} id={(3*i+k)*100+3*j+l}></div>
        })}
            </div>
        })}
            </div>
        })}
            </div>
        })}
    </div>
    </div>
    <div style={{width:"400px"}}>
        { (completed===1)?
        <div>
        <img src="celeb.gif" width="350px" alt=""></img>
        </div>:<div></div>
        }
    </div>
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

export default Sudoku