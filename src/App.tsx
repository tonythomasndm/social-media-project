import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login";
import { Main } from "./pages/main/main";
import { CreatePost } from "./pages/create-post/create-post";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
function App() {
	return (
		<div className='App'>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/login' element={<Login />} />
					<Route path='/create-post' element={<CreatePost />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
