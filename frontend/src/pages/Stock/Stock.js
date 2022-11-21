import React, { useState, useEffect } from "react";
import "./Stock.css";
import { useLocation } from "react-router-dom";
import Graph from "../../components/layouts/graph/Graph";
import NewsComp from "../../components/layouts/news_comp/News_comp";
import Favourites from "../../components/layouts/favourites/Favourites";
import { useDocumentTitle } from "../../components/layouts/Title/Title";
import axios from "axios";
import { Typography, Box } from "@mui/material";

const Stock = () => {
	useDocumentTitle("- Stock");
	const location = useLocation();
	const symbol = location.state.symbol;
	const [homeNews, setHomeNews] = useState([]);
	const [stockData, setStockData] = useState();
	const [stockNews, setStockNews] = useState([]);
	const [stockCandle, setStockCandle] = useState();
	const [stockInfoData, setStockInfoData] = useState([]);

	
	useEffect(() => {
		axios
			.get(process.env.REACT_APP_LOCAL + `stock?id=${symbol}&field=stock`)
			.then(res => {
				setStockInfoData(res.data);
			})
			.catch(err => console.log(err))
		axios
			.get(process.env.REACT_APP_LOCAL + `stock?id=${symbol}&field=data`)
			.then((res) => {
				setStockData(res.data.data.result.metric)
			})
			.catch((err) => console.log(err));
		axios.get(process.env.REACT_APP_LOCAL + `stock?id=${symbol}&field=news`)
			.then((res) => {
				setStockNews(res.data.news.result);
			})
			.catch((err) => console.log(err));
		axios
			.get(process.env.REACT_APP_LOCAL + `stock?id=${symbol}&field=candle`)
			.then((res) => setStockCandle(res.data.candle.result))
			.catch((err) => console.log(err));
	}, [symbol]);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_LOCAL + "homenews")
			.then((res) => setHomeNews(res.data))
			.catch((err) => console.log(err));
	}, []);

	const topNews = homeNews.map((values, key) => {
		return (
			values.summary !== "" && (
				<div key={key}>
					<NewsComp
						image={values.image}
						title={values.title}
						description={values.description}
						link={values.link}
						uploaded_datetime={values.uploaded_datetime / 1000}
					/>
				</div>
			)
		);
	});

	const news = (stockNews && stockNews.map((values) => {
		return (
			<div key={values.title}>
				<NewsComp image={values.image} title={values.headline} description={values.summary} link={values.url} uploaded_datetime={values.datetime} />
			</div>
		);
	}));

	return (
		<div className='main_test'>
			<div className='mainweb'>
				<div className='home_graph'>
					<Graph symbol={symbol} stockData={stockData} stockCandle={stockCandle} stockInfoData={stockInfoData}/>
				</div>
				<div className='favourite'>
						<Favourites />
				</div>
				<div className='news'>
					{stockNews.length === 0 ? (
						<Box>
							<Typography component='h1' variant='h5' sx={{ mt: 6, mb: 2 }}>
								No news found for this stock, but here is top news:
							</Typography>
							{topNews}
						</Box>
					) : (
						news
					)}
				</div>
			</div>
		</div>
	);
};

export default Stock;
