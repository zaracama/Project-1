/** @format */

import { configureStore } from "@reduxjs/toolkit";
import digimonReducer from "./reducers/digimonReducers";

const store = configureStore({
	reducer: {
		digimon: digimonReducer,
	},
});

export default store;