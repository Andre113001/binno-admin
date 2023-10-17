import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import '../App.css'
import {useNavigate} from 'react-router-dom'



function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        BiNNO
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Login() {
    const navigate = useNavigate()
  
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const accessKey = data.get('access-key');
        const password = data.get('password');
        const requestData = {
            accessKey: accessKey,
            password: password
        }

        const fetchData = async() => {
            try {
                const res = await fetch('/api/login', {
                    method: 'POST',
                    body: JSON.stringify({...requestData}),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                const data = await res.json()
                
                if (data.token) {
                    navigate('/dashboard')
                } else {
                    alert('Unauthorized')
                }

                // console.log(data)

                

                // store the shhit to a cookie
                // console.log("navigating");
                
            } catch(err) {
                console.err
            }
        }
        fetchData();
    };

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <img src="../../../public/img/binno-logo.png" alt="" />
            <Typography className='sm:text-sm' component="h1" variant="h5">
            System Administrator Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="access-key"
                label="Access Key"
                name="access-key"
                autoComplete="off"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                sx={{ mt: 1, mb: 2}}
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
                className='bg-red-500'
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2, p: 1.5}}
                style={{
                    backgroundColor: "#ff7a00",
                }}
            >
                Sign In
            </Button>
            </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );    
}

