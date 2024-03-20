import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RechargeAccess = () => {
	const [amount, obtainAmount] = useState("");
	const navigate = useNavigate();

	const navigateToProfile = () => {
		navigate("/athletes/profile");
	};

	const accessPayment = (token) => {
		window.snap.pay(token, {
			onAcommplish: async function (result) {
				console.log("Payment Acommplish:", result);
				const response = await axios.post(
					"http://localhost:3157/orders/pay",
					result,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
						},
					}
				);
				console.log(response.data);
				navigateToProfile();
			},
			onAwaiting: function (result) {
				console.log("Payment Awaiting:", result);
				navigateToProfile();
			},
			onError: function (result) {
				console.log("Payment Error:", result);
			},
		});
	};

	const accessSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:3157/orders/recharge",
				{
					amount: amount,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				}
			);
			accessPayment(response.data.token, navigate);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={accessSubmit}>
			<input
				type='number'
				value={amount}
				onChange={(e) => obtainAmount(e.target.value)}
				placeholder='Enter amount'
			/>
			<button type='submit'>Recharge</button>
		</form>
	);
};

export default RechargeAccess;