import React from "react"; //, useState
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/Navbar/Navbar";
//import IndexScroll from "./components/layouts/Index_Scroll/IndexScroll";
import { Contact, Favourites, Home, Stock, Login } from "./pages";
import { Container } from "@mui/material";
import SignUp from "./components/layouts/SignUp/SignUp";
import { AuthProvider } from "./firebase/AuthContext";

function App() {
	return (
		<div className='App'>
			<AuthProvider>
				<Router>
					<Navbar />
					{/* <IndexScroll /> */}
					<div className='main-body'>
						<Container>
							{/* change to container */}
							<div className='navigation'>
								<Routes>
									<Route path='/' element={<Home />} />
									<Route path='/favourites' element={<Favourites />} />
									<Route path='/contact' element={<Contact />} />
									<Route path='/stock' element={<Stock />} />
									<Route path='/login' element={<Login />} />
									<Route path='/signup' element={<SignUp />} />

									{/* <Route path='/*' element={<NotFound />} /> */}
								</Routes>
							</div>
						</Container>
					</div>
					{/* <Footer /> */}
				</Router>
			</AuthProvider>
		</div>
	);
}

export default App;
