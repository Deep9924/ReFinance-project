import React, { useState } from 'react';
import {
  Button, CssBaseline, TextField, Box, Typography, Container, Alert
} from '@mui/material';
import { useAuth } from '../../../firebase/AuthContext';
import axios from "axios";

const AddStock = () => {
  const { currentUser } = useAuth();

  const [symbol, setSymbol] = useState('');
  const [description, setDescription] = useState('');
  const [mic, setMic] = useState('');
  const [currency, setCurrency] = useState("");
  const [type, setType] = useState('');

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [symbolError, setSymbolError] = useState('');
  const [symbolErrorCheck, setSymbolErrorCheck] = useState(false);
  const [descriptionError, setDescriptionError] = useState('');
  const [descriptionErrorCheck, setDescriptionErrorCheck] = useState(false);
  const [micError, setMicError] = useState("");
  const [micErrorCheck, setMicErrorCheck] = useState(false);
  const [currencyError, setCurrencyError] = useState("");
  const [currencyErrorCheck, setCurrencyErrorCheck] = useState(false);
  const [typeError, setTypeError] = useState("");
  const [typeErrorCheck, setTypeErrorCheck] = useState(false);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!symbol) {
      setSymbolErrorCheck(true);
      return setSymbolError("Symbol is required")
    }

    if (!description) {
      setDescriptionErrorCheck(true);
      return setDescriptionError("Description is required")
    }

    if (!mic) {
      setMicErrorCheck(true)
      return setMicError("mic field is required")
    }

    if (!currency) {
      setCurrencyErrorCheck(true)
      return setCurrencyError("Currency field is required")
    }

    if (!type) {
      setTypeErrorCheck(true)
      return setTypeError("Type field is required")
    }

    function clearInput() {
      setSymbol("")
      setDescription("")
      setMic("")
      setCurrency("")
      setType("")
    }

    try {
      setError("")
      setSuccess("")
      setLoading(true)
      await axios.post(process.env.REACT_APP_LOCAL + "stock/addstock", {
        user_email: currentUser.email,
        symbol,
        description,
        currency,
        mic,
        type
      })
      clearInput();
      setSuccess("Stock is added to the Database");
    }
    catch (error) {
      setError("Failed to Add New Stock to Database");
    }
    setLoading(false);

    console.log({
      symbol,
      description,
      currency,
      mic,
      type
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
          Add New Stock To Database
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {error !== "" ? <Alert sx={{ width: '100%', mb: 1.5 }} severity="error">{error}</Alert> : ""}
          {success !== "" ? <Alert sx={{ width: '100%', mb: 1.5 }} severity="success">{success}</Alert> : ""}
          <TextField
            name="symbol"
            required
            fullWidth
            id="symbol"
            value={symbol}
            label="Symbol"
            onChange={(e) => { setSymbol(e.target.value.toUpperCase()); setSymbolErrorCheck(false); setSymbolError('') }}
            error={symbolErrorCheck}
            helperText={symbolError}
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
            maxRows={3}
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
          <TextField
            margin="normal"
            required
            fullWidth
            value={mic}
            id="mic"
            label="mic"
            name="mic"
            onChange={(e) => { setMic(e.target.value.toUpperCase()); setMicErrorCheck(false); setMicError('') }}
            error={micErrorCheck}
            helperText={micError}
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
            value={currency}
            id="currency"
            label="Currency"
            name="currency"
            onChange={(e) => { setCurrency(e.target.value.toUpperCase()); setCurrencyErrorCheck(false); setCurrencyError('') }}
            error={currencyErrorCheck}
            helperText={currencyError}
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
            value={type}
            id="type"
            label="Type"
            name="type"
            onChange={(e) => { setType(e.target.value); setTypeErrorCheck(false); setTypeError('') }}
            error={typeErrorCheck}
            helperText={typeError}
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
            Add Stock To DB
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default AddStock
