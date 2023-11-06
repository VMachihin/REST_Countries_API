import {
	SET_COUNTRY,
	SET_NEIGHBORS,
	SET_LOADING,
	SET_ERROR,
	CLEAR_DETAILS,
} from './details-actions';

const initialState = {
	status: 'idle',
	currentCountry: null,
	neighbors: [],
	error: null,
};

export const detailsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_COUNTRY: {
			return {
				...state,
				status: 'fulfilled',
				currentCountry: payload,
			};
		}
		case SET_NEIGHBORS: {
			return {
				...state,
				neighbors: payload,
			};
		}
		case SET_LOADING: {
			return {
				...state,
				status: 'loading',
				error: null,
			};
		}
		case SET_ERROR: {
			return {
				...state,
				error: payload,
			};
		}
		case CLEAR_DETAILS: {
			return initialState;
		}
		default: {
			return state;
		}
	}
};
