import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input, TextField } from '@mui/material';
// import { useForm } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup';
//import * as Yup from 'yup'
import CommonButton from './CommonButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const modalStyles = {
    wrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    },
    inputFields: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px',
        marginBottom: '15px',
        '.MuiInput-root': {
            marginBottom: '20px',
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'end',
    }
};

export default function LoginModal({ user_id, setUser }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [values, setValues] = React.useState(defaultInputValues);

    const defaultInputValues = {
        user_name: '',
        password: ''
    }

    const handleSubmit = () => {
      fetch('/auth',
      {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            user_name: values.user_name,
            password: values.password
        })
      })
      .then(data => data.json())
      .then(res => {
          console.log('res-->', res);
          setUser(res);
          setOpen(false);
      })
      .catch(err => console.log(err))
    }

    const handleChange = (value) => {
      setValues(value)
      console.log(value)
      console.log('values-->', values)
    }
    React.useEffect(() => {
        if(open) setValues(defaultInputValues)
    }, [open])
  
    return (
      <div>
        <Button onClick={handleOpen} variant="contained" sx={{"padding-right": "10px"}}>Login</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyles.wrapper}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Login Below
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Fill out inputs and click 'Login' button.
            </Typography>
            <Box sx={modalStyles.inputFields}>
                {/* <Input placeholder='enter your user ID' />
                <Input placeholder='enter your password' /> */}
                <TextField 
                    placeholder='User Id'
                    name='userId'
                    label='User ID'
                    // value={values.user_name}
                    onChange ={(event) => handleChange({...values, user_name: event.target.value})}
                    />
                <TextField 
                    placeholder='Password'
                    name='password'
                    label='Password'
                    // value={values.password}
                    onChange ={(event) => handleChange({...values, password: event.target.value})}
                    />
            </Box>
            <Box sx={modalStyles.buttons}>
                <CommonButton
                    variant='contained'
                    onClick={()=> handleSubmit()}>
                    Login
                </CommonButton>
            </Box>
          </Box>
        </Modal>
      </div>
    );
  }