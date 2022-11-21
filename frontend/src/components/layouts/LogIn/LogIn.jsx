import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, Alert
} from '@mui/material';
import { useAuth } from '../../../firebase/AuthContext';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailErrorCheck, setEmailErrorCheck] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordErrorCheck, setPasswordErrorCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      setEmailErrorCheck(true)
      return setEmailError("Email is required")
    }

    if (!password) {
      setPasswordErrorCheck(true)
      return setPasswordError("Password is required")
    }

    try {
      setError("")
      setLoading(true)
      await login(email, password);
      navigate("/", {}, {replace: true})
    }
    catch (error) {
      const invalidEmail = "Firebase: Error (auth/invalid-email)."
      const invalidPassword = "Firebase: Error (auth/wrong-password)."
      const userNotFound = "Firebase: Error (auth/user-not-found)."

      switch (error.message) {
        case invalidEmail:
          setEmailErrorCheck(true)
          setError('Wrong email provided')
          break;
        case invalidPassword:
          setPasswordErrorCheck(true)
          setError('Wrong password provided')
          break;
        case userNotFound:
          setError('User not found')
          break;
        default:
          setError("Failed to sign in");
          break;
      }
    }
    setLoading(false);
  };
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#11506e' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {error !== "" ? <Alert sx={{ width: '100%', mb: 0.5 }} severity="error">{error}</Alert> : ""}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            variant='outlined'
            onChange={(e) => { setEmail(e.target.value); setEmailErrorCheck(false); setEmailError('') }}
            error={emailErrorCheck}
            helperText={emailError} 
            sx={{
              "& .MuiInputLabel-root.Mui-focused": { color: 'rgb(17 80 110)' },
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                  borderColor: "rgb(17 80 110)"
                }
              }
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={passwordErrorCheck}
            helperText={passwordError}
            onChange={(e) => { setPassword(e.target.value); setPasswordErrorCheck(false); setPasswordError('') }}
            autoComplete="current-password"
            sx={{
              "& .MuiInputLabel-root.Mui-focused": { color: 'rgb(17 80 110)' },
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                  borderColor: "rgb(17 80 110)"
                }
              }
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3, mb: 2, bgcolor: '#11506e', '&:hover': {
                background: "rgb(17 80 110 / 92%)",
              },
            }}
          >
            Log In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/signup">
                <Typography variant="body2" color="primary">Don't have an account? Sign Up</Typography>
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default LogIn;
