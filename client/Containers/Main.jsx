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
import Experiences from '../components/Experiences';
import Rows from '../components/Rows';


export default function Main({ user_id }) {

  //Main state
  const [currentLocation, setLocation] = useState('Select A Location');
  const [currentRoute, setRoute] = useState('');
  const [routeOptions, setRouteOptions] = useState('');
  const [locations, setLocations] = useState();
  const [open, setOpen] = React.useState(false);
  const [experiances, setExperiances] = React.useState();
  
  const handleClickOpen = (routeObj) => {

    console.log('routeObj-----in HandleClickOpen', routeObj);
    //Grab id from e object
    // invoke fetch request GET to obtain experiances 
    //for each record, show on table ?

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
     
    };
    console.log('user_id', user_id);
    console.log('route_id---->', routeObj.id)
    fetch('/experiences/'+`${user_id}`+'-'+ routeObj.id, requestOptions)
      .then(res => res.json())
      .then(data => {
      console.log('experiances------>',data);
        setExperiances(data.map(rows => <Rows 
          key={`${rows.id}_${rows.date_created}`} 
          id={rows.id} 
          attempted = {rows.attempted_top_rope + rows.attempted_lead}
          completed = {rows.completed_top_rope + rows.completed_lead + rows.completed_cleanly}
          attempted_top_rope={rows.attempted_top_rope}
          attempted_lead={rows.attempted_lead}
          completed_top_rope={rows.completed_top_rope}
          completed_lead={rows.completed_lead}
          completed_cleanly={rows.completed_cleanly}
          route_id={rows.route_id}
          user_id={rows.user_id}
          date_created= {rows.date_created.slice(0,10)}
          date_modified= {rows.date_modified.slice(0,10)}
          notes= {rows.notes} 
        />));
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
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
     
    };


    fetch('/routes/'+ e.target.value, requestOptions)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setRouteOptions(data.map(route => <RouteCard onClick={() => handleClickOpen(route)} key={`${route.id}_${route.route_name}`} id={route.id}  name={route.route_name} difficulty={route.difficulty} photo_url={route.photo_url} location_name={route.location_name} />));
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
        <DialogTitle>View Experiences</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Experiance History 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="UserName"
            type="email"
            fullWidth
            variant="standard"
          />
        <Button>Create</Button>
        <Experiences rows={experiances}/>
        </DialogContent>
       
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        
        </DialogActions>
      </Dialog>
    </div>
  )
}

