import { useState, useEffect } from "react";
import axios from "axios";
import HeaderBar from "../components/HeadBar";

const AthleteProfile = () => {
	const [athlete, obtainPlayer] = useState(null);
	const [waiting, obtainWaiting] = useState(true);

	useEffect(() => {
		const AthleteProfile = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3157/athletes/profile",
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						},
					}
				);

				obtainPlayer(response.data);
				obtainWaiting(false);
			} catch (error) {
				console.error("Failed to accessed athlete profile", error);
				obtainWaiting(false);
			}
		};

		AthleteProfile();
	}, []);

	return (
		<>
			<HeaderBar />
			<div className='container mx-auto mt-8'>
				<h2 className='text-3xl font-bold mb-4 text-red-500'>Player Profile</h2>
				{waiting && <p>waiting...</p>}
				{!waiting && athlete && (
					<table className='table-auto'>
						<tbody>
							<tr>
								<td className='font-bold pr-4 text-yellow-600'>ID:</td>
								<td>{athlete.id}</td>
							</tr>
							<tr>
								<td className='font-bold pr-4 text-yellow-600'>Username:</td>
								<td>{athlete.username}</td>
							</tr>
							<tr>
								<td className='font-bold pr-4 text-yellow-600'>Email:</td>
								<td>{athlete.email}</td>
							</tr>
							<tr>
								<td className='font-bold pr-4 text-yellow-600'>Amount:</td>
								<td>{athlete.amount} coins</td>
							</tr>
							<tr>
								<td className='font-bold pr-4 text-yellow-600'>Address:</td>
								<td>{athlete.address}</td>
							</tr>
						</tbody>
					</table>
				)}
			</div>
		</>
	);
};

export default AthleteProfile;