import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
export const Navbar = () => {
	const [user] = useAuthState(auth);
	const signUserOut = async () => {
		await signOut(auth);
	};
	return (
		<div className='navbar'>
			<div className='links'>
				<Link to='/'> Home </Link>
				<Link to='/login'> Login </Link>
			</div>
			<div className='user'>
				{user ? (
					<>
						<p>{user?.displayName}</p>
						<img src={user?.photoURL || ""} alt='' width='50' height='50' />
						<button onClick={signUserOut}>Log Out</button>
					</>
				) : (
					<>
						<p>Not Logged In </p>
						<img
							src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
							alt=''
							width='50'
							height='50'
						/>
					</>
				)}
			</div>
		</div>
	);
};
