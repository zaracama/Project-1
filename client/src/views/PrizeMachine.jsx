import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PrizeMachine = () => {
	const navigate = useNavigate();
	const setPrizeMachine = async () => {
		try {
			const response = await axios.post(
				"http://localhost:3157/mydigimons/prizemachine",
				null,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				}
			);

			Swal.fire({
				title: "Succeeded pull",
				html: `You obtained a new Digimon companion: ${response.data.acquiredDigimon.name}`,
				icon: "Succeeded",
			});

			navigate("/mydigimons");
		} catch (error) {
			console.error("UnSucceeded draw ", error);
			Swal.fire({
				title: "Failed pull",
				text: "Failed to obtained a new Digimon companion. Please try again.",
				icon: "error",
			});
		}
	};

	return (
		<div className='max-w-md mx-auto p-4 bg-white rounded shadow-md text-center'>
			<h2 className='text-2xl font-bold mb-4 text-yellow-500'>Digimon PrizeMachine Machine</h2>
			<button
				onClick={setPrizeMachine}
				className='bg-yellow-500 text-white mt-4 px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:shadow-outline'>
				Digimon PrizeMachine Machine
			</button>
		</div>
	);
};

export default PrizeMachine;