import React, { useState } from 'react';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Button, CssBaseline, TextField, Box, Typography, Container, Alert
} from '@mui/material';
import { useAuth } from '../../../firebase/AuthContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase/firebase-config';
import { v4 } from 'uuid';
import axios from "axios";

const RegexLink = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/

const AddNews = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);
  let imageLink = ""

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [titleError, setTitleError] = useState('');
  const [titleErrorCheck, setTitleErrorCheck] = useState(false);
  const [descriptionError, setDescriptionError] = useState('');
  const [descriptionErrorCheck, setDescriptionErrorCheck] = useState(false);
  const [linkError, setLinkError] = useState("");
  const [linkErrorCheck, setLinkErrorCheck] = useState(false);

  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title) {
      setTitleErrorCheck(true);
      return setTitleError("Title is required")
    }

    if (!description) {
      setDescriptionErrorCheck(true);
      return setDescriptionError("Description is required")
    }

    if (!link) {
      setLinkErrorCheck(true)
      return setLinkError("link is required")
    }

    if (!RegexLink.test(link)) {
      setLinkErrorCheck(true)
      console.log('was here')
      return setLinkError("Check the link again and make sure to include (https://)")
    }

    function clearInput() {
      setTitle("")
      setDescription("")
      setLink("")
      setImage(null)
      imageLink = ""
    }

    if (!image) { //  === null
      imageLink = "https://firebasestorage.googleapis.com/v0/b/refinance-552f5.appspot.com/o/homenews%2Fdefault_news.png?alt=media&token=d83803c9-3f7f-429a-bac1-190cbaddddfc"
    }
    else {
      const fileName = `homenews/${image.name + v4()}`
      const imageRef = ref(storage, fileName);
      await uploadBytes(imageRef, image)
      imageLink = await getDownloadURL(imageRef);
    }

    try {
      setError("")
      setSuccess("")
      setLoading(true)
      await axios.post(process.env.REACT_APP_LOCAL + "homenews/addhomenews", {
        user_email: currentUser.email,
        news_title: title,
        news_description: description,
        news_image: imageLink,
        news_link: link,
      })

      clearInput()
      setSuccess("News is added to the Database");
    }
    catch (error) {
      setError("Failed to Add New News to homepage");
    }
    setLoading(false);

    console.log({
      news_title: title,
      news_description: description,
      news_image: imageLink,
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
          Add News To Homepage
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
          <TextField
            required
            fullWidth
            multiline
            value={description}
            minRows={2}
            maxRows={4}
            id="decription"
            label="Description"
            name="decription"
            onChange={(e) => { setDescription(e.target.value); setDescriptionErrorCheck(false); setDescriptionError('') }}
            error={descriptionErrorCheck}
            helperText={descriptionError}
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
            variant="contained"
            component="label"
            value={image}
            onChange={(e) => { setImage(e.target.files[0]) }}
            name="image"
            label="News Image"
            type="file"
            id="image"
            sx={{
              width: '100%',
              mt: 1.5, mb: 1, bgcolor: '#145ea8', '&:hover': {
                background: "#166abd",
              },
            }}>
            Upload News Image
            <input type="file" hidden accept="image/*" />
          </Button>
          <Typography variant="body2">{image && "Image: " + image.name}</Typography>
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
            Add News To DB
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default AddNews;