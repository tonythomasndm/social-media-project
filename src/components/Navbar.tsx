import { BrowserRouter as Router, Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<>
			<Router>
				<Link to='/'>Home</Link>
				<Link to='/login'>Login</Link>
			</Router>
		</>
	);
};
