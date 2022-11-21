import { useDocumentTitle } from "../../components/layouts/Title/Title";
import React, { useState, useEffect } from 'react'; //,  { useState, useEffect }
import { List, ListItem, ListItemText, Divider, Typography} from '@mui/material'; //Button
import axios from 'axios';
import {useAuth} from '../../firebase/AuthContext'
import GraphFav from "../../components/layouts/graph/Graph_Fav";

const Favourites = () => {
	//symbol, stockData, stockCandle, stockInfoData
	useDocumentTitle("- Favourites");
	const { currentUser} = useAuth();
  	const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
		.post(process.env.REACT_APP_LOCAL + "user", {
			user_email: currentUser.email.toLowerCase()
		})
		.then((res) => {  setUserData(res.data.favourites); })
		.catch((err) => console.log(err));
  }, [currentUser.email])

	return (
		
		<List>
		<Typography variant='h6' sx={{ ml: 2, mb: -1, fontWeight: "bold" }}>Favourites</Typography>
		{userData && userData.length === 0 ? (
		  <List>
			<ListItem sx={{ mt: '3rem' }}>
			  <Typography variant='body2' sx={{ ml: 1.4, fontWeight: "bold" }}>Add a stock to favourites to display here
			  </Typography>
			</ListItem>
		  </List>
		) : (userData && userData.map((stockName) => {
		  return (
			<div key={stockName}>
			  <ListItem disablePadding>
				<ListItemText primary={stockName} />
					<GraphFav symbol={stockName} />
			  </ListItem>
			  <Divider />
			</div>
		  )
		})
		)}
	  </List>
	)
};

export default Favourites;
	