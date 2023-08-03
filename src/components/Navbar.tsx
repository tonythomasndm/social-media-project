import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
export const Navbar = () => {
	return (
		<>
			<Link to='/'> Home </Link>
			<Link to='/login'> Login </Link>
			<div>
				<p>{auth.currentUser?.displayName}</p>
				<img
					src={auth.currentUser?.photoURL || ""}
					alt=''
					width='100'
					height='100'
				/>
			</div>
		</>
	);
};
