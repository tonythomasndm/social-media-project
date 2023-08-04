import { Link } from "react-router-dom";

export const Footer = () => {
	return (
		<div>
			<div className='navbar'>
				{/* <span>Tony-social Project</span> */}
				<p
					style={{
						display: "inline",
						color: "white",
						justifyContent: "flex-start",
					}}>
					Copyright @2023
				</p>
				<div className='links'>
					<Link to='https://github.com/tonythomasndm'> Github </Link>
					<Link to='/https://www.linkedin.com/in/tony-thomas-7b6b5423a/'>
						LinkedIn
					</Link>
					<Link to='/'> Instagram </Link>
				</div>
			</div>
		</div>
	);
};
