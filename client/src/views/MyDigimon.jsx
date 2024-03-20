/** @format */

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderBar from "../components/HeadBar";

const MyDigimonDex = () => {
	const [myDigimonDex, setMyDigimonDex] = useState([]);

	useEffect(() => {
		fetchMyDigimonDex();
	}, []);

	const fetchMyDigimonDex = async () => {
		try {
			const response = await axios.get(
				"http://localhost:3000/mydigimons",
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				}
			);

			setMyDigimonDex(response.data);
		} catch (error) {
			console.error("Failed to fetch my Digimon list", error);
		}
	};

	const delDigimon = async (id) => {
		try {
			await axios.del(
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				}
			);

			fetchMyDigimonDex();
			Swal.fire("Accomplish", "Digimon Withdraw Accomplished", "Accomplish");
		} catch (error) {
			console.error("Failed to Withdraw Digimon", error);
		}
	};

	return (
		<>
			<HeaderBar />
			<div className='container mx-auto mt-8'>
				<h2 className='text-3xl font-bold mb-4 text-red-500'>
					My Digimon List
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{myDigimonDex.map((digimon) => (
						<div
							key={digimon.DigimonId}
							className='bg-white rounded-lg overflow-hidden shadow-md p-4'>
							<img
								src={digimon.Digimon.image}
								alt={digimon.Digimon.name}
								className='w-full h-40 object-cover mb-4 rounded-md'
							/>
							<h3 className='text-xl font-bold mb-2'>{digimon.Digimon.name}</h3>
							<p>ID: {digimon.DigimonId}</p>
							<p>Type: {digimon.Digimon.type}</p>
							<p>Level: {digimon.Digimon.level}</p>
							<p>Attack: {digimon.Digimon.attack}</p>
							<p>Health Point: {digimon.Digimon.hp}</p>
							<p>Initiate: {digimon.Digimon.initiate}</p>
							<p>Attribute: {digimon.Digimon.attribute}</p>
							<button
								onClick={() => delDigimon(digimon.DigimonId)}
								className='bg-red-500 text-white mt-2 px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline'>
								Delete
							</button>
						</div>
					))}
				</div>
				<Link to='/mydigimons/prizemachine'>
					<button className='bg-blue-500 text-white mt-4 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline'>
						Prize Machine Digimon
					</button>
				</Link>
			</div>
		</>
	);
};

export default MyDigimonDex;