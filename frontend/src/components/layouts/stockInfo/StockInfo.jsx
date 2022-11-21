import * as React from 'react';
import { Box, Divider, ListItemText, ListItem, List, Typography } from '@mui/material';

const StockInfo = (stockDataInfo) => {
  const stockData = stockDataInfo['stockData'];

  const checkFieldNull = (field) => {
    return !field ? "-" : field.toFixed(2);
  }
  
  const stockInfoDataName = [
    { "name": "Year Range", "func": `${checkFieldNull(stockData['52WeekLow'])} - ${checkFieldNull(stockData['52WeekHigh'])}` }, // : (52WeekHigh) - (52WeekLow)
    { "name": "Market Cap", "func": `${checkFieldNull(stockData['marketCapitalization'])}M` }, // marketCapitalization
    { "name": "AVG Volume", "func": `${checkFieldNull(stockData['10DayAverageTradingVolume'])}M` }, // 10DayAverageTradingVolume
    { "name": "P/E Ratio", "func": checkFieldNull(stockData['peBasicExclExtraTTM'])}, // peBasicExclExtraTTM
    { "name": "Dividend", "func": `${checkFieldNull(stockData['dividendPerShareAnnual'])} (${checkFieldNull(stockData['dividendYieldIndicatedAnnual'])}%)` }, // dividendPerShareAnnual (dividendYieldIndicatedAnnual)
    { "name": "Relative to S&P 500 (YTD)", "func": checkFieldNull(stockData['priceRelativeToS&P500Ytd']) }, // priceRelativeToS&P500Ytd
  ];

  return (
    <Box sx={{ ml: 0.7, mr: 3, boxShadow: 3, borderRadius: 3, width: '100%', minHeight: 250, minWidth: 220, maxWidth: 360, }}>
      <List>
      <Typography variant='h6' sx={{ ml: 2, mb: -1, fontWeight: "bold" }}>Stock Info </Typography>
      {stockInfoDataName.map((info) => (
        <div key={info.name}>
          <ListItem sx={{my: 0, ml: 0.3}}>
          <ListItemText sx={{display:"flex", m: 0}} disableTypography 
          primary={
            <>
              <Typography variant="caption" sx={{flex: 1, fontWeight: 'bold', color:'grey.700'}}>{info.name} </Typography>
              <Typography variant="caption" sx={{ mr: 0.7, fontWeight: 'bold'}}>{info.func}</Typography>
            </>
          } />
          </ListItem>
          <Divider variant="middle" component="li" />
        </div>
          ))
          }
      </List>
    </Box>
  );
}

export default StockInfo
