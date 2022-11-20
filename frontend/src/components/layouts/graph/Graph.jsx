import React, { useState, useEffect } from 'react'; //useEffect
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import StockInfo from '../stockInfo/StockInfo';
import { Typography, Rating } from "@mui/material";
import('./Graph.css');
window.Chart = Chart

const Graph = ({ symbol, stockData, stockCandle }) => {
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [stockInfoData, setStockInfoData] = useState([]);
  const [timestamp, setTimestamp] = useState([]);
  //console.log(symbol)

  useEffect(() => {
    axios.get(process.env.REACT_APP_LOCAL + `stock?id=${symbol}&field=candle`)
      .then(res => {
        setData(res.data.candle.result.c);
        setTimestamp(res.data.candle.result.t);
      })
      .catch(err =>
        console.log(err))
  }, [symbol]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_LOCAL + `stock?id=${symbol}&field=stock`)
      .then(res => {
        setStockInfoData(res.data);
      })
      .catch(err =>
        console.log(err))
  }, [symbol]);

  //console.log(new Date(1668539584 * 1000).toLocaleString());



  /* console.log(Object.keys(data).map(keys => {
    return(
       data[keys].symbol_name)
    })) */

  /* This is for graph modifying */

  /* const labels = Object.keys(data).map(keys => {
    return (
      symbol[keys].values.map(val => {  // Need to change symbol to data
        return (
          val.datetime.split(" ")[1].split(":", 2).join(":")
        )
      })
    ) console.log(new Date(1668539584 * 1000).toLocaleString());
  }); */

  const labels = timestamp.map(values => {
    return new Date(values * 1000).toLocaleDateString();
  })
  /* 
   */
  //console.log(labels)
  const open_Data = data.map(values => {
    return (
      values
    )
  })
  //console.log(open_Data)
  /* const open_Data = Object.keys(data).map(key => {
    return (

      symbol[key].values.map(val => {    // Need to change symbol to data
        return (
          val.open
        )
      })
    )
  }); */

  const options = {
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 20,
        bottom: 20
      }
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const graph_data = {
    labels: labels[0],
    datasets: [{
      label: 'My First Dataset',
      data: open_Data[0],
      fill: true,
      borderColor: "black", // 'rgb(75, 192, 192)',
      tension: 0.5,
      pointRadius: 0.8,
      borderWidth: 2,
    }],
  };

  return (
    <>
      <div className="graph_parent">
      <Typography variant='h5'>
        { stockInfoData.description } ({  symbol })
        <Rating
          name="simple-controlled"
          max={1}
          defaultValue={0}
          value={value}
          size='large'
          sx={{ml: 2}}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
			</Typography>
      
        
        {/* {Object.keys(symbol).map(key => {
          return (
            <div key={key}>
              {symbol[key].meta.symbol}
            </div>
          )
        })} */}

        <div className='testing_this'>
          <div className="graph">
            <Line data={graph_data} options={options} />
          </div>

          <div className='graph_details_container'>
            {/* <h4>HEllo THIS IS WHO I AM TESTING</h4> */}
            {stockData && <StockInfo stockData={stockData}/>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Graph;



  // , { useState }
  // const [ xvalue, setXvalue ] = useState([]);
  // const [ yvalue, setYvalue ] = useState([]);

/* axios.get(process.env.REACT_APP_LOCAL + 'graph')
    .then (res =>{
      setData(res.data);
      //console.log(res.data);
    })
    .catch(err => 
        console.log(err))
}, []); */






/* 

import React from 'react';
import Plot from 'react-plotly.js';

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: []
    }
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    const pointerToThis = this;
    console.log(pointerToThis);
    const API_KEY = 'HGJWFG4N8AQ66ICD';
    let StockSymbol = 'FB';
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_Call)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {
          console.log(data);

          for (var key in data['Time Series (Daily)']) {
            stockChartXValuesFunction.push(key);
            stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
          }

          // console.log(stockChartXValuesFunction);
          pointerToThis.setState({
            stockChartXValues: stockChartXValuesFunction,
            stockChartYValues: stockChartYValuesFunction
          });
        }
      )
  }

  render() {
    return (
      <div>
        <h1>Stock Market</h1>
        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            }
          ]}
          layout={{width: 720, height: 440, title: 'A Fancy Plot'}}
        />
      </div>
    )
  }
}

export default Stock;

*/



/* const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]; */