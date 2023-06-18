import React from 'react'

const Card = (props) => {
  return (
        <div class="card" style={{width: "320px",height:"420px",border:"solid 2px",padding:"10px"}}>
  <img class="card-img-top" src={props.img} alt="Card image cap" style={{height:"200px"}}/>
  <div class="card-body">
  {(props.title==="Longest Common Subsequence")?
    <h6 style={{fontSize:"18px"}} class="card-title">{props.title}</h6>:
    <h5 class="card-title">{props.title}</h5>}
    <p class="card-text" style={{fontSize:"12px"}}>{props.desc}</p>
    <a href={props.link} class="btn btn-primary">Visualize {(props.shortcut)?props.shortcut:props.title}</a>
  </div>
</div>
  )
}

export default Card