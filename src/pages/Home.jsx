import { Link } from 'react-router-dom';
import Card from '../components/utils/Card';
const Home = () => {
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const gradientStyle = {
    background: 'linear-gradient(to bottom right, #25CC0F 0%, #9E3212 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize:"100px"
  };

  
  return (
    
    <div className='App' style={{width:"1515px",backgroundColor:""}}>
<div className='heading' style={{position:"absolute",zIndex:1,width:"100%",paddingTop:"100px"}}>
        </div>
<header style={{ paddingLeft: 0 }}>
      <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: "url('home1.gif')", height: 240}}
      >
        <div className='mask' style={{ }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
              <h1 className='mb-3' style={gradientStyle }>ALGOVIZ</h1>
          </div>
          <h3 className='mb-3'> Learn through visualization</h3>

        </div>
      </div>
    </header>
<div style={{margin:'50px'}}></div>


<div style={{marginLeft:"150px",display:"flex"}}>

  <div style={{marginRight:'50px'}}>
  <Link to="/cpu" style={{textDecoration:"none"}}>
<Card  style={{width:"300px"}} title="CPU Scheduling" desc="
CPU scheduling algorithms determine the order and allocation of processor time among competing processes in a computer system, aiming to optimize resource utilization, minimize waiting times" link="/cpu" img="cpusched.gif">
</Card>
</Link>
</div>
<div style={{marginRight:"50px"}}>
  <Link to="/graph" target=" " style={{textDecoration:"none"}}>
<Card title="Graph Algorithms" desc="
Graph algorithms analyze and traverse interconnected data structures, known as graphs, to uncover patterns, optimize routes, solve complex problems." link="/graph" img="graph-ani.gif">
</Card>
</Link>
{/* <button onClick={() => openInNewTab('/graph')}>graph Algos</button> */}
</div>
<div style={{marginRight:'50px'}}>
  <Link to="/sort" style={{textDecoration:"none"}}>
<Card  style={{width:"300px"}} title="Sorting" desc="
Sorting is the process of arranging elements in a specific order, such as ascending or descending, to facilitate searching, organizing, and analyzing data efficiently" link="/sort" img="merge.gif">
</Card>
</Link>
</div>
        
     </div>   



     <div style={{marginLeft:"150px",display:"flex"}}>

  <div style={{marginRight:'50px'}}>
  <Link to="/search" style={{textDecoration:"none"}}>
<Card  style={{width:"300px"}} title="Searching" desc="

Array searching involves techniques such as linear search for sequentially checking elements or binary search and Exponential search for efficiently locating elements in a sorted array." link="/search" img="binsrch.gif">
</Card>
</Link>
</div>
<div style={{marginRight:"50px"}}>
  <Link to="/grid" style={{textDecoration:"none"}}>
<Card title=" Grid Traversal " desc="

Grid traversal involves techniques such as DFS and BFS to systematically navigate through a grid with obstacles,enabling tasks like pathfinding, graph connectivity analysis, and maze solving." link="/grid" img="grid.gif">
</Card>
</Link>
</div>
</div>  

<h2 style={{marginTop:"100px",marginBottom:"30px"}}>Dynamic Programming</h2>

     <div style={{marginLeft:"150px",display:"flex"}}>

  <div style={{marginRight:'50px'}}>
  <Link to="/lcs" style={{textDecoration:"none"}}>
<Card  style={{width:"300px"}} title="Longest Common Subsequence"  shortcut="LCS" desc="
LCS is the longest subsequence that is common to both Strings, provided that the elements of the subsequence are not required to occupy consecutive positions within the original strings." link="/lcs" img="lcs.gif">
</Card>
</Link>
</div>
<div style={{marginRight:"50px"}}>
  <Link to="/knapsack"  style={{textDecoration:"none"}}>
<Card title="Knapsack Problem" shortcut="Knapsack" desc="

Knapsack algorithm solves the optimization problem of selecting items from a set with specific weights and values to maximize the total value while respecting a given weight constraint." link="/knapsack" img="knp.gif">
</Card>
</Link>
{/* <button onClick={() => openInNewTab('/graph')}>graph Algos</button> */}
</div>
<div style={{marginRight:'50px'}}>
  <Link to="/ed" style={{textDecoration:"none"}}>
<Card  style={{width:"300px"}} title="Edit Distance"  desc="
The Edit Distance algorithm calculates the minimum number of operations required to transform one string into another by considering insertion, deletion, and substitution of individual characters." link="/ed" img="editdis.webp">
</Card>
</Link>
</div>
        
</div>


     <h3 style={{marginTop:"100px",marginBottom:"30px"}}>Backtracking</h3>

     <div style={{marginLeft:"150px",display:"flex"}}>

  <div style={{marginRight:'50px'}}>
  <Link to="/nqueen" style={{textDecoration:"none"}}>
<Card   title="N-Queen" desc="
N-Queen Backtracking algorithm solves the classic problem of placing N queens on an N×N chessboard, ensuring that no two queens threaten each other" link="/nqueen" img="nqueen.gif">
</Card>
</Link>
</div>
<div style={{marginRight:"50px"}}>
  <Link to="/sudoku" style={{textDecoration:"none"}}>
<Card title="Sudoku Solver" desc="
Sudoku Backtracking Algorithm fills empty cells in a 9 x 9 grid by exploring possible placements and backtracking when conflicts arise, ultimately finding the correct solution." link="/sudoku" img="sudoku.gif">
</Card>
</Link>
{/* <button onClick={() => openInNewTab('/graph')}>graph Algos</button> */}
</div>

</div>    
        
<h3 style={{marginTop:"100px",marginBottom:"30px"}}>Other Famous Algorithms</h3>

     <div style={{marginLeft:"150px",display:"flex"}}>

  <div style={{marginRight:'50px'}}>
  <Link to="/primefinder" style={{textDecoration:"none"}}>
<Card  style={{width:"300px"}} title="Sieve of Eratosthenes"  desc="

Sieve of Eratosthenes is an efficient algorithm for finding all prime numbers up to a given limit by iteratively sieving out multiples of each prime." link="/primefinder" img="prime.gif">
</Card>
</Link>
</div>
<div style={{marginRight:"50px"}}>
  <Link to="/tar-sum"  style={{textDecoration:"none"}}>
<Card title="Target Sum ( 2 Pointer )" shortcut="Target Sum" desc="
Target Sum involves finding a pair or subset of elements in a given array that adds up to a specific target value, utilizing Two Pointers Technique to optimize the search process." link="/tar-sum" img="tarsum.gif">
</Card>
</Link>
{/* <button onClick={() => openInNewTab('/graph')}>graph Algos</button> */}
</div>
<div style={{marginRight:'50px'}}>
  <Link to="/toh" style={{textDecoration:"none"}}>
<Card  style={{width:"300px"}} title="Towers of Hanoi"  desc="
Tower of Hanoi is a classic puzzle that involves moving a stack of disks from one peg to another using a spare peg, adhering to the constraint that a larger disk should never be placed on top of a smaller disk." link="/toh" img="toh.gif">
</Card>
</Link>
</div>
        
</div>
        
<div style={{margin:"50px"}}></div>
           
        
    </div>
  )
}

export default Home