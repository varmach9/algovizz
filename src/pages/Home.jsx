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


  <div style={{width:"300px",marginRight:'50px'}}>
  <Link to="/sort" style={{textDecoration:"none"}}>
<Card  style={{width:"300px"}} title="Sorting" desc="
Sorting is the process of arranging elements in a specific order, such as ascending or descending, to facilitate searching, organizing, and analyzing data efficiently" link="/sort" img="merge.gif">
</Card>
</Link>
</div>
<div style={{width:"300px",marginRight:"50px"}}>
  <Link to="/graph" target=" " style={{textDecoration:"none"}}>
<Card title="Graphs" desc="
Graph algorithms analyze and traverse interconnected data structures, known as graphs, to uncover patterns, optimize routes, solve complex problems." link="/graph" img="https://miro.medium.com/v2/resize:fit:566/1*15KkonMRnHdbzGhFw0PXCA.gif">
</Card>
</Link>
{/* <button onClick={() => openInNewTab('/graph')}>graph Algos</button> */}
</div>
        
     </div>   
        
        <Link to="/grid">Grid Traversal</Link>
        <br></br>
        <Link to="/cpu">CPU Scheduling Algorithms</Link>
        <br></br>
        <div>
            <div>BackTracking Algorithms</div>
            <Link to="/nqueen">N-Queen</Link>
            <br></br>
            <Link to="/sudoku">Sudoku</Link>
            <br></br>
        </div>
        <div>Searching</div>
        <Link to="/search">Search Algorithms</Link>
            <br></br>
        <div>
            <div>DP</div>
            <Link to="/lcs">LCS</Link>
            <br></br>
            <Link to="/knapsack">Knapsack</Link>
            <br></br>
            <Link to="/ed">Edit Distance</Link>
            <br></br>
        </div>
        <div>Other Famous Algorithms</div>
        <div>
            <Link to="/primefinder">Prime Number Finder</Link>
            <br></br>
            <Link to="/tar-sum">2-Pointers: target-sum</Link>
            <br></br>
            <Link to="/toh">Recursion: towers of hanoi</Link>
            <br></br>
        </div>
        
    </div>
  )
}

export default Home