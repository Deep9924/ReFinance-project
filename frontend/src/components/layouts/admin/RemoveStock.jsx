import React, { useState } from 'react';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Button, CssBaseline, TextField, Box, Typography, Container, Alert
} from '@mui/material';
import { useAuth } from '../../../firebase/AuthContext';
import axios from "axios";

const RemoveStock = () => {
  const { currentUser } = useAuth();

  const [symbol, setSymbol] = useState('');
  const [currency, setCurrency] = useState("");
  const [type, setType] = useState('');

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [symbolError, setSymbolError] = useState('');
  const [symbolErrorCheck, setSymbolErrorCheck] = useState(false);
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
      setCurrency("")
      setType("")
    }

    try {
      setError("")
      setSuccess("")
      setLoading(true)
      await axios.post(process.env.REACT_APP_LOCAL + "stock/removestock", {
        user_email: currentUser.email,
        symbol,
        currency,
        type
      })
      clearInput();
      setSuccess("Stock is Removed from the Database");
    }
    catch (error) {
      setError("Failed to Remove stock from Database");
    }
    setLoading(false);

    console.log({
      symbol,
      currency,
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
          Remove Stock From Database
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
            Remove Stock From DB
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default RemoveStock