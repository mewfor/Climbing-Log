import React from 'react';
import RouteCard from '../components/RouteCard';
export default function CardsDisplay(props) {
  return (
    <div className='cardsdisplay'>
      {props.cards}
    </div>
  )
}