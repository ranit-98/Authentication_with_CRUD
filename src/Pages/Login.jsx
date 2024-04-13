import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from '../CommonComponents/Layout';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { Password } from '@mui/icons-material';
import { useAuth } from '../Context/Auth';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import Loading from '../CommonComponents/Loading'
const defaultTheme = createTheme();

const Login=()=> {
    const initialData={
        email:"",
        password:""
    }
    const navigate=useNavigate()
    const [auth,setAuth]=useAuth()
    const [loginData,setLoginData]=useState(initialData)
    const [loading,setLoading]=useState(false)
    const handleChange=(event)=>{
        const {name,value}=event.target
        setLoginData({
            ...loginData,
            [name]:value
        })
    }
  const handleSubmit = async(event) => {
    event.preventDefault();
    setLoading(true)
   console.log(loginData);
   try{
        const res=await axios.post(`https://webskitters-student.onrender.com/login`,loginData)
        console.log(res);
        toast.success(res?.data?.message)
        setAuth({
            ...auth,
            user: res?.data?.user,
            token:res?.data?.token
        })
        localStorage.setItem("auth",JSON.stringify(res?.data))
       navigate("/product")
        setLoginData(initialData)
        setLoading(false)
   }catch(error){
    console.log(error);
    toast.error(error?.response?.data?.message)
     error?.response?.status==400 && toast.error("enter the email and password properly")
    setLoginData(initialData)
    setLoading(false)
   }
  };

  return (
    <Layout>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
      <Paper elevation={5} style={{padding:"1rem 2rem 2rem 2rem",marginTop:"2rem"}} >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              autoComplete="email"
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
              value={loginData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
           { !loading ?( <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>):( <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <Loading/>
            </Button>)}
            <Grid container>
              <Grid item xs>
                <Link href="/forgetPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        </Paper>
      </Container>
    </ThemeProvider>
    </Layout>
  );
}


export default Login