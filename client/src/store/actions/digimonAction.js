/** @format */

export const fetchDigimonsSuccess = (digimon, totalPages) => ({
	type: "FETCH_Digimons_SUCCESS",
	payload: { digimon, totalPages },
});

export const updateSearchTerm = (term) => ({
	type: "UPDATE_SEARCH_TERM",
	payload: term,
});

export const updateSortOrder = (order) => ({
	type: "UPDATE_SORT_ORDER",
	payload: order,
});

export const updateCurrentPage = (page) => ({
	type: "UPDATE_CURRENT_PAGE",
	payload: page,
});