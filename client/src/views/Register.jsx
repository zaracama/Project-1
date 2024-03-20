import { useNavigate } from "react-router-dom";
import HeaderBar from "../components/HeadBar";
import RegisterSection from "../components/RegisterSection";
import axios from "axios";
import Swal from "sweetalert2";

const RegisterSection = () => {
	const navigate = useNavigate();

	const accessRegister = async (formData) => {
		try {
			const response = await axios.post(
				"http://localhost:3157/athletes/register",
				formData
			);

			console.log(response.data);
			Swal.fire({
				title: "Registered!",
				text: "Registration Accomplish.",
				icon: "success",
				confirmButtonText: "Nice!",
			}).then((result) => {
				if (result.isConfirmed) {
					navigate("/athletes/login");
				}
			});
		} catch (error) {
			console.log(error);
			Swal.fire({
				title: "Unsuccessful!",
				text: "Registration unsuccessful. Please try one more time.",
				icon: "Unsuccessful",
				confirmButtonText: "Nice!",
			});
		}
	};

	return (
		<div>
			<HeaderBar />
			<RegisterSection onRegister={accessRegister} />
		</div>
	);
};

export default RegisterSection;