import React, { useState } from 'react';
import {
  Button, CssBaseline, TextField, Box, Typography, Container, Alert
} from '@mui/material';
import { useAuth } from '../../../firebase/AuthContext';
import axios from "axios";

const RemoveNews = () => {
  const { currentUser } = useAuth();

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [titleError, setTitleError] = useState('');
  const [titleErrorCheck, setTitleErrorCheck] = useState(false);
  const [linkError, setLinkError] = useState("");
  const [linkErrorCheck, setLinkErrorCheck] = useState(false);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title) {
      setTitleErrorCheck(true);
      return setTitleError("Title is required")
    }

    if (!link) {
      setLinkErrorCheck(true)
      return setLinkError("link is required")
    }

    function clearInput() {
      setTitle("")
      setLink("")
    }

    try {
      setError("")
      setSuccess("")
      setLoading(true)
      await axios.post(process.env.REACT_APP_LOCAL + "homenews/removehomenews", {
        user_email: currentUser.email,
        news_title: title,
        news_link: link,
      })

      clearInput()
      setSuccess("News is removed from the Database");
    }
    catch (error) {
      setError("Failed to Remove News from homepage");
    }
    setLoading(false);

    console.log({
      news_title: title,
      news_link: link,
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
        <Typography component="h1" variant="h5">
          Remove News From Homepage
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {error !== "" ? <Alert sx={{ width: '100%', mb: 1.5 }} severity="error">{error}</Alert> : ""}
          {success !== "" ? <Alert sx={{ width: '100%', mb: 1.5 }} severity="success">{success}</Alert> : ""}
          <TextField
            name="title"
            required
            fullWidth
            value={title}
            id="title"
            label="Title"
            onChange={(e) => { setTitle(e.target.value); setTitleErrorCheck(false); setTitleError('') }}
            error={titleErrorCheck}
            helperText={titleError}
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
            value={link}
            id="link"
            label="News Link"
            name="link"
            onChange={(e) => { setLink(e.target.value); setLinkErrorCheck(false); setLinkError('') }}
            error={linkErrorCheck}
            helperText={linkError}
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
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              width: '100%',
              mt: 2, mb: 2, bgcolor: '#327742', '&:hover': {
                background: "#3c8e4f",
              },
            }}
          >
            Add News To DB
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default RemoveNews