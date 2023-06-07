import { Link } from 'react-router-dom';
const Home = () => {
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  return (
    
    <div className='App'>
        <div className='heading'>Home</div>
        <Link to="/sort">Sorting Algos</Link>
        <br></br>
        <button onClick={() => openInNewTab('/graph')}>graph Algos</button>
        <img src="https://miro.medium.com/v2/resize:fit:566/1*15KkonMRnHdbzGhFw0PXCA.gif" alt="graphs"></img>
        {/* <Link to="/graph">Graph Algos</Link> */}
        <br></br>
        <Link to="/pathfind">Path finding</Link>
        <br></br>
        <Link to="/pathfind">CPU Scheduling Algorithms</Link>
        <br></br>
        <div>
            <div>BackTracking Algorithms</div>
            <Link to="/nq">N-Queen</Link>
            <br></br>
            <Link to="/nq">Sudoku-6x6</Link>
            <br></br>
        </div>
        <div>
            <div>Recursion</div>
            <Link to="/nq">Fabinacii-series</Link>
            <br></br>
            <Link to="/nq">Combinations</Link>
            <br></br>
            <Link to="/nq">towers of hanoi</Link>
            <br></br>
        </div><div>
            <div>Search(linear,binary,exponential)</div>
        </div>
        <div>
            <div>DP</div>
            <Link to="/nq">LCS</Link>
            <br></br>
            <Link to="/nq">Knapsack</Link>
            <br></br>
        </div>
        <div>Other Famous Algorithms</div>
        <div>
            <Link to="/graph">Binary Serch Algorithm</Link>
            <br></br>
            <Link to="/primefinder">Prime Number Finder</Link>
            <br></br>
            <Link to="/tar-sum">target-sum</Link>
            <br></br>
        </div>
    </div>
  )
}

export default Home