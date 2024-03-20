/** @format */

const initialState = {
	digimons: [],
	searchTerm: "",
	sortOrder: "asc",
	currentPage: 1,
	totalPages: 0,
};

const digimonReducer = (state = initialState, action) => {
	switch (action.type) {
		case "FETCH_Digimons_SUCCESS":
			return {
				...state,
				digimons: action.payload.digimons,
				totalPages: action.payload.totalPages,
			};
		case "UPDATE_SEARCH_TERM":
			return { ...state, searchTerm: action.payload, currentPage: 1 };
		case "UPDATE_SORT_ORDER":
			return { ...state, sortOrder: action.payload, currentPage: 1 };
		case "UPDATE_CURRENT_PAGE":
			return { ...state, currentPage: action.payload };
		default:
			return state;
	}
};

export default digimonReducer;