import React, {useState} from 'react';
import CardsDisplay from './CardsDisplay';

export default function Main() {

const [currentLocation, setLocation] = useState('Select A Location');
const [currentRoute, setRoute] = useState(' ');
const [routeOptions, setRouteOptions] = useState(' ');
let routes = null; 


  const locations = 
    [ {_id: 1, location_name: 'Los Angeles' }, 
      {_id: 2, location_name: 'New York' }, 
      {_id: 3, location_name: 'San Diego' }, 
    ];

    const options = locations.map(location => <option key={`${location._id}`} value={location._id}>{location.location_name}</option>);
  
 
  /*
    makes GET request to server to retrieve routes based on the location selected, and updates Routes selection menu
  */

    
  const getRoutes = (e) => {
    console.log(e.target.value);
    setLocation(e.target.value);

 /*
Add fetch request here

 */

/*
Assign results from fetch request to routes state */

 routes =  [{_id: 1, route_name: 'route A', photo_url: 'https://a.cdn-hotels.com/gdcs/production51/d772/648801ad-122b-4e17-ad6a-78b719956c5e.jpg', location: 1, difficulty: 'medium'}, 
  {_id: 2,  route_name: 'route B', photo_url: 'https://a.cdn-hotels.com/gdcs/production51/d772/648801ad-122b-4e17-ad6a-78b719956c5e.jpg', location: 1, difficulty: 'hard'}, 
  {_id: 3,  route_name: 'route C', photo_url: 'https://a.cdn-hotels.com/gdcs/production51/d772/648801ad-122b-4e17-ad6a-78b719956c5e.jpg', location: 1, difficulty: 'easy'} ]; 

setRouteOptions(routes.map(route => <option key={`${route._id}`} value={route._id}>{route.route_name}</option>));

  }

  /*
  makes GET request to server to get ALL locations available
  for user. Updates the location selection element for user to select. Will run upon application initial render 
  */
  const getLocation = () => {
  
  }


  /*
  makes GET request to server to get experiances created by
  user for selected location and route. This will trigger rendering of Cards to be displayed. 
  */
  const getExperiances = (e) => {
   setRoute(e.target.value); 
  }


  return (
    <div>
      <div>
        <select name='locations' id='locations' onChange={getRoutes} value={currentLocation} label="Select a location">
          {options}
        </select>
        <select name='route' id='route' onChange={getExperiances} value={currentRoute} label="Select a Route">
        {routeOptions}
        </select>
      </div>
      <CardsDisplay />
    </div>
  )
}
