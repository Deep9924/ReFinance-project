import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, Alert
} from '@mui/material';
import { useAuth } from '../../../firebase/AuthContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase/firebase-config';
import { v4 } from 'uuid';
import axios from "axios";

const regName = /^[a-zA-Z]+$/;
const regEmail = /[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]{2,3}/;
const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/;

const SignUp = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  let avatarLink = ""
  //const [avatarLink, setAvatarLink] = useState("");

  const [error, setError] = useState("");
  const [firstnameError, setFirstnameError] = useState('');
  const [firstnameErrorCheck, setFirstnameErrorCheck] = useState(false);
  const [lastnameError, setLastnameError] = useState('');
  const [lastnameErrorCheck, setLastnameErrorCheck] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailErrorCheck, setEmailErrorCheck] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordErrorCheck, setPasswordErrorCheck] = useState(false);


  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!firstname) {
      setFirstnameErrorCheck(true);
      return setFirstnameError("First name is required")
    }

    if (!regName.test(firstname)) {
      setFirstnameErrorCheck(true)
      return setFirstnameError("Incorrect first name")
    }

    if (!lastname) {
      setLastnameErrorCheck(true);
      return setLastnameError("Last name is required")
    }

    if (!regName.test(lastname)) {
      setLastnameErrorCheck(true)
      return setLastnameError("Incorrect first name")
    }

    if (!email) {
      setEmailErrorCheck(true)
      return setEmailError("Email is required")
    }

    if (!regEmail.test(email)) {
      setEmailErrorCheck(true)
      return setEmailError("Incorrect email, use abc@example.com format")
    }

    if (!password) {
      setPasswordErrorCheck(true)
      return setPasswordError("Password is required")
    }

    if (!regPassword.test(password)) {
      setPasswordErrorCheck(true)
      return setPasswordError("Needs to have a capital letter, a small letter, a number and a special character")
    }

    if (password !== cpassword) {
      return setError("Passwords do not match");
    }
    if (!avatar) {
      avatarLink = "https://firebasestorage.googleapis.com/v0/b/refinance-552f5.appspot.com/o/images%2Fdefault_image.jpg?alt=media&token=25c27aef-0ef4-4996-9565-c953f8820d64"
    }
    else {
      const fileName = `images/${avatar.name + v4()}`
      const imageRef = ref(storage, fileName);
      await uploadBytes(imageRef, avatar)
      avatarLink = await getDownloadURL(imageRef);
    }

    try {
      setError("")
      setLoading(true)
      await signup(email, password);
      await axios.post(process.env.REACT_APP_LOCAL + "user/signup", {
        user_email: email.toLowerCase(),
        user_firstname: firstname,
        user_lastname: lastname,
        user_avatar: avatarLink,
      })
        .catch((err) => console.log(err));
      navigate("/", { replace: true })
    }
    catch (error) {
      setError("Failed to create an account");
    }
    setLoading(false);

    console.log({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      cpassword: cpassword,
      avatar: avatarLink,
    });
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

        <Avatar sx={{ m: 1, bgcolor: '#3c8e4f' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {error !== "" ? <Alert sx={{ width: '100%', mb: 1.5 }} severity="error">{error}</Alert> : ""}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstname"
                required
                fullWidth
                id="firstname"
                label="First Name"
                onChange={(e) => { setFirstname(e.target.value); setFirstnameErrorCheck(false); setFirstnameError('') }}
                error={firstnameErrorCheck}
                helperText={firstnameError}
                sx={{
                  "& .MuiInputLabel-root.Mui-focused": { color: 'rgb(17 80 110)' },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {
                      borderColor: "rgb(17 80 110)"
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                onChange={(e) => { setLastname(e.target.value); setLastnameErrorCheck(false); setLastnameError('') }}
                error={lastnameErrorCheck}
                helperText={lastnameError}
                autoComplete="family-name"
                sx={{
                  "& .MuiInputLabel-root.Mui-focused": { color: 'rgb(17 80 110)' },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {
                      borderColor: "rgb(17 80 110)"
                    }
                  }
                }}
              />
            </Grid>
          </Grid>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={(e) => { setEmail(e.target.value); setEmailErrorCheck(false); setEmailError('') }}
            error={emailErrorCheck}
            helperText={emailError}
            variant='outlined'
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
            onChange={(e) => { setPassword(e.target.value); setPasswordErrorCheck(false); setPasswordError('') }}
            error={passwordErrorCheck}
            helperText={passwordError}
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="cpassword"
            label="Confirm Password"
            type="password"
            id="cpassword"
            onChange={(e) => { setCPassword(e.target.value) }}
            autoComplete="confirm-password"
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
            variant="contained"
            component="label"
            onChange={(e) => { setAvatar(e.target.files[0]) }}
            name="avatar"
            label="Avatar"
            type="file"
            id="avatar"
            sx={{
              width: '70%',
              mt: 1.5, mb: 1, bgcolor: '#145ea8', '&:hover': {
                background: "#166abd",
              },
            }}>
            Upload Avatar Image
            <input type="file" hidden accept="image/*" />
          </Button>
          <Typography variant="body2">{avatar && "Image: " + avatar.name}</Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 2, mb: 2, bgcolor: '#327742', '&:hover': {
                background: "#3c8e4f",
              },
            }}
          >
            SIGN UP
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/login">
                <Typography variant="body2" color="primary">Already have an account? Log in</Typography>
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
