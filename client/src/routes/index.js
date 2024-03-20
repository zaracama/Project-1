// import { createBrowserRouter, redirect } from "react-router-dom";

// import HomePage from "../views/HomePage";
// import Register from "../views/Register";
// import Access from "../views/Access";
// import Profile from "../views/Profile";
// import MyDigimon from "../views/MyDigimon";
// import PrizeMachine from "../views/PrizeMachine";
// import DigimonDetail from "../views/DigimonDetail";
// import Recharge from "../views/Recharge";

// const router = createBrowserRouter([
// 	{
// 		path: "/",
// 		element: (
// 			<>
// 				<HomePage />
// 			</>
// 		),
// 	},
// 	{
// 		path: "/digimons/:id",
// 		element: (
// 			<>
// 				<DigimonDetail />
// 			</>
// 		),
// 	},
// 	{
// 		path: "/athletes/register",
// 		element: (
// 			<>
// 				<Register />
// 			</>
// 		),
// 	},
// 	{
// 		path: "/athletes/login",
// 		element: (
// 			<>
// 				<Access />
// 			</>
// 		),
// 		loader: () => {
// 			if (localStorage.accessToken) {
// 				return redirect("/");
// 			}
// 			return null;
// 		},
// 	},
// 	{
// 		path: "/athletes/profile",
// 		element: (
// 			<>
// 				<Profile />
// 			</>
// 		),
// 		loader: () => {
// 			if (!localStorage.accessToken) {
// 				return redirect("/athletes/login");
// 			}
// 			return null;
// 		},
// 	},
// 	{
// 		path: "/mydigimons",
// 		element: (
// 			<>
// 				<MyDigimon />
// 			</>
// 		),
// 		loader: () => {
// 			if (!localStorage.accessToken) {
// 				return redirect("/athletes/login");
// 			}
// 			return null;
// 		},
// 	},
// 	{
// 		path: "/mydigimons/prizemachine",
// 		element: (
// 			<>
// 				<PrizeMachine />
// 			</>
// 		),
// 		loader: () => {
// 			if (!localStorage.accessToken) {
// 				return redirect("/athletes/login");
// 			}
// 			return null;
// 		},
// 	},
// 	{
// 		path: "/orders/recharge",
// 		element: <Recharge />,
// 		loader: () => {
// 			if (!localStorage.accessToken) {
// 				return redirect("/athletes/login");
// 			}
// 			return null;
// 		},
// 	},
// ]);

// export default router;