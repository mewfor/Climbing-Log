import React, { useState, useEffect } from 'react';
import CardsDisplay from './CardsDisplay';
import RouteCard from '../components/RouteCard';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//import Table from '../component'

export default function Main() {

  const [currentLocation, setLocation] = useState('Select A Location');
  const [currentRoute, setRoute] = useState('');
  const [routeOptions, setRouteOptions] = useState('');
  const [locations, setLocations] = useState();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    console.log('handleClickOpen', e);

    //Grab id from e object
    // invoke fetch request GET to obtain experiances 
    //for each record, show on table ?

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location_id: e.target.value })
    };
    fetch('/routes', requestOptions)
    .then(res => res.json())
    .then(data => {
      setRouteOptions(data.map(route => <RouteCard onClick={() => handleClickOpen(route)} key={`${route.id}`} id={route.id}  name={route.route_name} difficulty={route.difficulty} photo_url={route.photo_url} location_id={route.location_id} />));
    })       
  .catch(error => console.error('There was an error!', error)); 

  
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch('/getLocations')
      .then(res => res.json())
      .then(data => {
        data.unshift({id: 0, location_name: "Select a location", zip:''});
        setLocations(data.map(location => <option key={`${location.id}_${location.location_name}`} value={location.id} >{location.location_name}</option>));
      })

    }, []);
    //const options = locations.map(location => <option key={`${location._id}`} value={location._id}>{location.location_name}</option>);
  
 
  /*
    makes GET request to server to retrieve routes based on the location selected, and updates Routes selection menu
  */

    
  const getRoutes = (e) => {
    console.log(e.target.value);
    console.log('get routes ran!!!!!')
    setLocation(e.target.value);
   
  /*
    Add fetch request here
  */

  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location_id: e.target.value })
    };


    fetch('/routes', requestOptions)
        .then(res => res.json())
        .then(data => {
          setRouteOptions(data.map(route => <RouteCard onClick={() => handleClickOpen(route)} key={`${route.id}`} id={route.id}  name={route.route_name} difficulty={route.difficulty} photo_url={route.photo_url} location_id={route.location_id} />));
        })       
      .catch(error => console.error('There was an error!', error)); 

      /*

        {
          "id": 1,
          "route_name": "Walk in the jungle",
          "difficulty": "5.7",
          "photo_url": "https://cdn2.apstatic.com/photos/climb/117845088_smallMed_1570418765.jpg",
          "location_id": 1
      }
      */


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
    <div className='main'>
      <div className='menu' >
        <select name='locations' id='locations' onChange={getRoutes} value={currentLocation} label={"Select a location"}>
          {locations}
        </select>
      </div>
      <CardsDisplay cards={routeOptions}/>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
     
    </div>
  )
}

