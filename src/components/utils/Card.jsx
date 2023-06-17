import React from 'react'

const Card = (props) => {
  return (
        <div class="card" style={{width: "18rem",height:"420px",border:"solid 2px",padding:"10px"}}>
  <img class="card-img-top" src={props.img} alt="Card image cap" style={{height:"200px"}}/>
  <div class="card-body">
    <h5 class="card-title">{props.title}</h5>
    <p class="card-text" style={{fontSize:"12px"}}>{props.desc}</p>
    <a href={props.link} class="btn btn-primary">Visualize {props.title}</a>
  </div>
</div>
  )
}

export default Card