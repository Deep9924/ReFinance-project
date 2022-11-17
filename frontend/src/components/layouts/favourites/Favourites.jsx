import React, { useState, useEffect } from 'react';
import './Favourites.css';
import { Box, List, ListItem, ListItemButton, ListItemText, Divider, Typography } from '@mui/material'
import axios from 'axios';
import { useAuth } from '../../../firebase/AuthContext';
// import Stack from '@mui/material/Stack';
/* 
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
 */

const Favourites = () => {
  const [userData, setUserData] = useState([]);
  //const [stockData, setStockData] = useState();
  const { currentUser } = useAuth()

  useEffect(() => {
    axios
      .post(process.env.REACT_APP_LOCAL + "user", {
        user_email: currentUser.email.toLowerCase()
      })
      .then((res) => { setUserData(res.data.favourites); console.log(res.data.favourites) }) // console.log(res.data)
      .catch((err) => console.log(err));
  }, [currentUser.email]);



  //  <div className='favourites-container'>
  return (

    <Box sx={{ width: '100%', minHeight: 250, minWidth: 210, maxWidth: 360, ml: 4, mt: 2, borderRadius: 1, boxShadow: 2, border: 1, borderColor: 'grey.300' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <Typography variant='h5' sx={{ ml: 2, fontWeight: "bold" }}>Favourites</Typography>
          {
            userData && userData.map((stockName) => {
              return (
                <>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={stockName} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              )
            })
          }


        </List>
      </nav>
    </Box>

  );
}

export default Favourites;


/* 
<ListItem disablePadding>
  <ListItemButton>
    <ListItemText primary="Drafts" />
  </ListItemButton>
</ListItem>
<Divider />
<ListItem disablePadding>
  <ListItemButton>
    <ListItemText primary="Trash" />
  </ListItemButton>
</ListItem>
<Divider />
<ListItem disablePadding>
  <ListItemButton component="a" href="#simple-list">
    <ListItemText primary="Spam" />
  </ListItemButton>
</ListItem>
*/


/* 
 <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
       */



/* 

    <div className='favourites-container'>
      <h2>Favourites</h2>
      <div className='flexing'>
        <div className='index_scrolling'>
          <div className="first-part-fav">
            <div className="symbol-fav">Dow Jones 30</div>
            <div className="stock-price-fav">32726.82</div>
          </div>
          <div className="second-part-fav">
            <div className="percent-change-fav negative">-0.26%</div>
            <div className="price-change-fav negative">-85.68</div>
          </div>
        </div>
        <div className='index_scrolling'>
          <div className="first-part-fav">
            <div className="symbol-fav">Dow Jones 30</div>
            <div className="stock-price-fav">32726.82</div>
          </div>
          <div className="second-part-fav">
            <div className="percent-change-fav negative">-0.26%</div>
            <div className="price-change-fav negative">-85.68</div>
          </div>
        </div>
        <div className='index_scrolling'>
          <div className="first-part-fav">
            <div className="symbol-fav">Dow Jones 30</div>
            <div className="stock-price-fav">32726.82</div>
          </div>
          <div className="second-part-fav">
            <div className="percent-change-fav negative">-0.26%</div>
            <div className="price-change-fav negative">-85.68</div>
          </div>
        </div>
        <div className='index_scrolling'>
          <div className="first-part-fav">
            <div className="symbol-fav">Dow Jones 30</div>
            <div className="stock-price-fav">32726.82</div>
          </div>
          <div className="second-part-fav">
            <div className="percent-change-fav negative">-0.26%</div>
            <div className="price-change-fav negative">-85.68</div>
          </div>
        </div>
        <div className='index_scrolling'>
          <div className="first-part-fav">
            <div className="symbol-fav">Dow Jones 30</div>
            <div className="stock-price-fav">32726.82</div>
          </div>
          <div className="second-part-fav">
            <div className="percent-change-fav negative">-0.26%</div>
            <div className="price-change-fav negative">-85.68</div>
          </div>
        </div> <div className='index_scrolling'>
          <div className="first-part-fav">
            <div className="symbol-fav">Dow Jones 30</div>
            <div className="stock-price-fav">32726.82</div>
          </div>
          <div className="second-part-fav">
            <div className="percent-change-fav negative">-0.26%</div>
            <div className="price-change-fav negative">-85.68</div>
          </div>
        </div> <div className='index_scrolling'>
          <div className="first-part-fav">
            <div className="symbol-fav">Dow Jones 30</div>
            <div className="stock-price-fav">32726.82</div>
          </div>
          <div className="second-part-fav">
            <div className="percent-change-fav negative">-0.26%</div>
            <div className="price-change-fav negative">-85.68</div>
          </div>
        </div>
      </div>

    </div>
     */