import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const RegisterSection = ({ onRegister }) => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		address: "",
	});

	const accessChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const accessSubmit = (e) => {
		e.preventDefault();
		onRegister(formData);
	};

	return (
		<div className='max-w-md mx-auto p-4 bg-white rounded shadow-md'>
			<h2 className='text-2xl font-bold mb-4 text-red-500'>Register</h2>
			<form onSubmit={accessSubmit}>
				<div className='mb-4'>
					<label htmlFor='username' className='block text-yellow-600'>
						Username
					</label>
					<input
						type='text'
						id='username'
						name='username'
						value={formData.username}
						onChange={accessChange}
						className='w-full p-2 border rounded'
						required
					/>
				</div>
				<div className='mb-4'>
					<label htmlFor='email' className='block text-yellow-600'>
						Email
					</label>
					<input
						type='email'
						id='email'
						name='email'
						value={formData.email}
						onChange={accessChange}
						className='w-full p-2 border rounded'
						required
					/>
				</div>
				<div className='mb-4'>
					<label htmlFor='password' className='block text-yellow-600'>
						Password
					</label>
					<input
						type='password'
						id='password'
						name='password'
						value={formData.password}
						onChange={accessChange}
						className='w-full p-2 border rounded'
						required
					/>
				</div>
				<div className='mb-4'>
					<label htmlFor='address' className='block text-yellow-600'>
						Password
					</label>
					<input
						type='address'
						id='address'
						name='address'
						value={formData.address}
						onChange={accessChange}
						className='w-full p-2 border rounded'
						required
					/>
				</div>
				<button
					type='submit'
					className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline'>
					Register
				</button>
			</form>
			<p className='mt-4 text-gray-700'>
				Already have an account?{" "}
				<Link to='/players/login' className='text-red-500 hover:underline'>
					Login here.
				</Link>
			</p>
		</div>
	);
};

RegisterSection.propTypes = {
	onRegister: PropTypes.func.isRequired,
};

export default RegisterSection;