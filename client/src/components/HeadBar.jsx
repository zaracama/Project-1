import { Link, useNavigate } from "react-router-dom";

const HeadBar = () => {
	const isLoggedIn = Boolean(localStorage.getItem("accessToken"));
	const navigate = useNavigate();

	const Logout = () => {
		localStorage.removeItem("accessToken");
		navigate("/");
	};

	return (
		<nav className='bg-red-500 p-2 shadow-md rounded'>
			<div className='container mx-auto flex justify-between items-center'>
				<Link
					to='/'
					className='text-white font-bold text-xl hover:text-yellow-200'>
					DigiWorld
				</Link>
				<div className='flex items-center space-x-5'>
					<Link
						to='/mydigimons'
						className='text-white hover:text-yellow-300 rounded'>
						My Digimon
					</Link>
					<Link
						to='/orders/topup'
						className='text-white hover:text-yellow-300 rounded'>
						Top Up
					</Link>
					<Link
						to='/athletes/profile'
						className='text-white hover:text-yellow-300 rounded'>
						Profile
					</Link>
					{!isLoggedIn && (
						<Link
							to='/athletes/login'
							className='text-white hover:text-yellow-300 rounded'>
							Login
						</Link>
					)}
					{isLoggedIn && (
						<button
							onClick={Logout}
							className='text-white hover:text-yellow-300 rounded cursor-pointer'>
							Logout
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};

export default HeadBar;