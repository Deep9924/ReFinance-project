import { useDocumentTitle } from "../../components/layouts/Title/Title";
import React, { useState } from 'react';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Button, CssBaseline, TextField, Box, Typography, Container, Alert
} from '@mui/material';

const Contact = () => {
	useDocumentTitle("- Contact");
	const [FullName, setFullName] = useState('');
	const [Email, setEmail] = useState('');
	const [Message, setMessage] = useState('');
  
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [FullNameError, setFullNameError] = useState('');
	const [FullNameErrorCheck, setFullNameErrorCheck] = useState(false);
	const [MessageError, setMessageError] = useState('');
	const [MessageErrorCheck, setMessageErrorCheck] = useState(false);
	const [EmailError, setEmailError] = useState("");
	const [EmailErrorCheck, setEmailErrorCheck] = useState(false);
  
	const [loading, setLoading] = useState(false);
  
	async function handleSubmit(e) {
	  e.preventDefault();
  
	  if (!FullName) {
		setFullNameErrorCheck(true);
		return setFullNameError("FullName is required")
	  }
  
	  if (!Message) {
		setMessageErrorCheck(true);
		return setMessageError("Message is required")
	  }
  
	  if (!Email) {
		setEmailErrorCheck(true)
		return setEmailError("Email is required")
	  }
  
	  function clearInput() {
		setFullName("")
		setMessage("")
		setEmail("")
	  }
	  clearInput();
	  setSuccess("We will get back to you as soon as possible.");

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
		  <Typography component="h1" variant="h5">
			Contact Us
		  </Typography>
		  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
			{error !== "" ? <Alert sx={{ width: '100%', mb: 1.5 }} severity="error">{error}</Alert> : ""}
			{success !== "" ? <Alert sx={{ width: '100%', mb: 1.5 }} severity="success">{success}</Alert> : ""}
			<TextField
			  name="FullName"
			  required
			  fullWidth
			  value={FullName}
			  id="FullName"
			  label="Full Name"
			  onChange={(e) => { setFullName(e.target.value); setFullNameErrorCheck(false); setFullNameError('') }}
			  error={FullNameErrorCheck}
			  helperText={FullNameError}
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
			  value={Email}
			  id="Email"
			  label="Email"
			  name="Email"
			  onChange={(e) => { setEmail(e.target.value); setEmailErrorCheck(false); setEmailError('') }}
			  error={EmailErrorCheck}
			  helperText={EmailError}
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
			  required
			  fullWidth
			  multiline
			  value={Message}
			  minRows={3}
			  maxRows={4}
			  id="Message"
			  label="Message"
			  name="Message"
			  onChange={(e) => { setMessage(e.target.value); setMessageErrorCheck(false); setMessageError('') }}
			  error={MessageErrorCheck}
			  helperText={MessageError}
			  sx={{
				mt: 1.5, "& .MuiInputLabel-root.Mui-focused": { color: 'rgb(17 80 110)' },
				"& .MuiOutlinedInput-root.Mui-focused": {
				  "& > fieldset": {
					borderColor: "rgb(17 80 110)"
				  }
				}
			  }}
			/>
			
			<Button
			  type="submit"
			  variant="contained"
			  disabled={loading}
			  sx={{
				width: '100%',
				mt: 4, mb: 2, bgcolor: '#327742', '&:hover': {
				  background: "#3c8e4f",
				},
			  }}
			>
			  Contact Us
			</Button>
		  </Box>
		</Box>
	  </Container>
	)
  }

export default Contact;