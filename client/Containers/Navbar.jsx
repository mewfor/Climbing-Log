import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoginModal from '../components/LoginModal'

export default function Navbar({user_id, setUser }) {
  return (
    <div className='navbar'>
      <img src="https://cdn.dribbble.com/users/3419576/screenshots/6321348/_________.jpg" alt="" />
      <LoginModal user_id={user_id} setUser={setUser} variant='contained' />
    </div>
  )
}
