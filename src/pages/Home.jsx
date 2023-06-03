import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='App'>
        <div className='heading'>Home</div>
        <Link to="/sort">Sorting Algos</Link>
        <br></br>
        <Link to="/graph">Graph Algos</Link>
        <br></br>
        <Link to="/graph">Binary Serch Algorithm</Link>
        <div>
            <div>BackTracking Algorithms</div>
            <Link to="/nq">N-Queen</Link>
            <br></br>
            <Link to="/nq">Sudoku</Link>
            <br></br>
        </div>
        <div>Other Famous Algorithms</div>
        <div>
            <Link to="/nq">Prime Number Finder</Link>
            <br></br>
            <Link to="/nq">some</Link>
            <br></br>
        </div>
    </div>
  )
}

export default Home