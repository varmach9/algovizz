import React,{useState} from 'react'

const Sudoku = () => {
    const [ru,setru]=useState(0)
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
                    document.getElementById(100*i+j).style.backgroundColor="purple"
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
                await sleep(200)
                document.getElementById(100*arr[i][0]+arr[i][1]).style.backgroundColor="white" 
                await sleep(200)
            }else{
                document.getElementById(100*arr[i][0]+arr[i][1]).style.backgroundColor="red" 
                await sleep(200)
                document.getElementById(100*arr[i][0]+arr[i][1]).innerHTML=""
                document.getElementById(100*arr[i][0]+arr[i][1]).style.backgroundColor="white" 
                await sleep(200)
            }
        }
    }
    const solver=()=>{
        if(ru===1){alert(1);return}
        setru(1)
        // console.log(row)
        const solve=(i,j)=>{
            if(i===9){return 1}
            if(j===9){return solve(i+1,0)}
            if(document.getElementById(100*i+j).style.backgroundColor==="purple"){return solve(i,j+1)}
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
    <div>
        <div>N queen</div>
        <div>
            <button onClick={solver}>Backtrack solution</button>
            <button onClick={randomize}>Fill starting grid</button>
        </div>
        <div style={{justifyContent:"center",display:"flex"}}>
        <div>
        {Array.apply(0, Array(3)).map(function (x, i) {
            return <div style={{display:"flex",border:"solid 1px",width:"468px"}}>
            {Array.apply(0, Array(3)).map(function (x, j) {
            return <div style={{border:"solid 1px",width:"470px"}}>
                {Array.apply(0, Array(3)).map(function (x, k) {
            return <div style={{display:"flex"}}>
            {Array.apply(0, Array(3)).map(function (x, l) {
            return <div style={{border:"solid 0.5px",width:"50px",height:"40px",textAlign:"center",paddingTop:"10px"}} id={(3*i+k)*100+3*j+l}></div>
        })}
            </div>
        })}
            </div>
        })}
            </div>
        })}
    </div>
    </div>
    </div>
  )
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms/5));
}


export default Sudoku