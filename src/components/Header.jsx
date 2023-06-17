import React from 'react'


const Header = () => {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{paddingLeft:"20px",width:"1520px"}}>
      <a  style={{marginLeft:'20px'}}className="navbar-brand" href="/">
        <img src="logo.png" alt=""   height="35px"></img>
      </a>
      <div><h5>ALGOVIZ</h5></div>
      <div style={{width:"80%",textAlign:"center"}}></div>
      <div>
        <ul className="navbar-nav ml-auto" style={{}}>
          <li className="nav-item">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://www.linkedin.com/in/srinivasa-varma-chekuri-9130501b2/" target=" ">Contact</a>
          </li>
        </ul>
      </div>
    </nav>


    </div>
    
  )
}

export default Header