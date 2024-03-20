import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import HeadBar from "../components/HeadBar";
import AccSection from "../components/AccessSection";

const AccSection = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			setIsLoggedIn(true);
			const redirectPath = location.state?.from || "/";
			navigate(redirectPath);
		}
	}, [navigate, location]);

	const handleAccess = async (userData) => {
		try {
			const response = await axios.post(
				"http://localhost:3157/athletes/login",
				userData
			);
			setIsLoggedIn(true);
			localStorage.setItem("accessToken", response.data.accessToken);

			const redirectPath = location.state?.from || "/";
			Swal.fire({
				title: "Succeeded!",
				text: "You have accessed your account.",
				icon: "Succeeded",
				confirmButtonText: "Good",
			}).then((result) => {
				if (result.isConfirmed) {
					navigate(redirectPath);
				}
			});
		} catch (error) {
			console.log(error);
			Swal.fire({
				title: "Error!",
				text: "failed to accessed your account. Please try one more time.",
				icon: "error",
				confirmButtonText: "Good",
			});
		}
	};

	return (
		<div>
			<HeadBar />
			{!isLoggedIn && <AccSection onLogin={handleAccess} />}
		</div>
	);
};

export default AccSection;