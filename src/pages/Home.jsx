import { Link } from 'react-router-dom';
const Home = () => {
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  return (
    
    <div className='App' style={{width:"1500px"}}>
        <div className='heading'>
<marquee behavior="scroll" direction="right"><img src="http://www.htmlcodes.ws/images/marquees/bee.gif" width="72" height="79" alt="Flying bee in a marquee" /></marquee>

          <h1>ALGOVIZ</h1>
        </div>
        <Link to="/sort">Sorting Algos</Link>
        <br></br>
        <button onClick={() => openInNewTab('/graph')}>graph Algos</button>
        <img src="https://miro.medium.com/v2/resize:fit:566/1*15KkonMRnHdbzGhFw0PXCA.gif" alt="graphs"></img>
        {/* <Link to="/graph">Graph Algos</Link> */}
        <br></br>
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