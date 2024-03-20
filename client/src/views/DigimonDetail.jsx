import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import HeadBar from "../components/HeadBar";
import BottSection from "../components/BottomSection";

const DigimonDetail = () => {
	const { id } = useParams();
	const [digimon, retrieveDigimon] = useState(null);

	useEffect(() => {
		const retrieveDigimonDetail = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3157/digimons/${ id }"
				);
				retrieveDigimon(response.data);
			} catch (error) {
				console.error("Unable to retrieve Pokemon details.", error);
			}
		};

		retrieveDigimonDetail();
	}, [id]);

	return (
		<>
			<HeadBar />
			<div className='container mx-auto mt-8'>
				{digimon ? (
					<div className='bg-white p-4 rounded-lg shadow-md'>
						<img
							src={digimon.image}
							alt={digimon.name}
							className='w-full h-48 object-cover mb-4 rounded-md'
						/>
						<h2 className='text-2xl font-semibold mb-2'>{digimon.name}</h2>
						<p className='text-gray-500 mb-2'>
							Type: {digimon.type}, Attribute: {digimon.attribute}
						</p>
						<p className='text-lg mb-4'>{digimon.description}</p>
						<div>
							<h3 className='text-xl font-semibold mb-2'>Fundamental attributes</h3>
							<ul>
								<li className='mb-1'>Attack: {digimon.attack}</li>
								<li className='mb-1'>Health Point: {digimon.healthPoint}</li>
								<li className='mb-1'>Initiate: {digimon.initiate}</li>
								<li className='mb-1'>Level: {digimon.level}</li>
								<li className='mb-1'>Attribute: {digimon.attribute}</li>
							</ul>
						</div>
					</div>
				) : (
					<p>Waiting...</p>
				)}
			</div>
			<BottSection />
		</>
	);
};

export default DigimonDetail;