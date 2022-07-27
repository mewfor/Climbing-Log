import React, { Component } from 'react';
import Main from './Containers/Main';
import Navbar from './Containers/Navbar';
import { useState } from 'react';



function App() {
  const [user_id, setUser] = useState(null);
  console.log('user_id-->', user_id)
  return (
    <div className='app'>
      <Navbar user_id={user_id} setUser={setUser}/>
      <Main user_id={user_id}/>
    </div>
  )
}

export default App;
