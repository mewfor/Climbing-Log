import React from 'react';

export default function RouteCard(props) {
  return (
    <div className='routecard' id={props.id} onClick={props.onClick}>
      <img src={props.photo_url} alt="" />
      <h2>Route Name: {props.name}</h2>
      <h4>Location: {props.location_name}</h4>
      <p>Difficulty: {props.difficulty}</p>
    </div>
  )
}
