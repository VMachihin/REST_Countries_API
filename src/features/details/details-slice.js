import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadCountryByName = createAsyncThunk(
	'@@details/load-country-by-name',
	(name, { extra: { client, api } }) => {
		return client.get(api.searchByCountry(name));
	}
);

export const loadNeighborsByBorder = createAsyncThunk(
	'@@details/load-neighbors',
	(borders, { extra: { client, api } }) => {
		return client.get(api.filterByCode(borders));
	}
);

const initialState = {
	status: 'idle',
	currentCountry: null,
	neighbors: [],
	error: null,
};

export const detailSlice = createSlice({
	name: '@@details',
	initialState,
	reducers: {
		clearDetails: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadCountryByName.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(loadCountryByName.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload || action.meta.error;
			})
			.addCase(loadCountryByName.fulfilled, (state, action) => {
				state.status = 'received';
				state.currentCountry = action.payload.data[0];
			})
			.addCase(loadNeighborsByBorder.fulfilled, (state, action) => {
				state.neighbors = action.payload.data.map((country) => country.name);
			});
	},
});

export const { clearDetails } = detailSlice.actions;
export const detailsReducer = detailSlice.reducer;

// Selectors
export const selectCurrentCountry = (state) => state.details.currentCountry;
export const selectDetails = (state) => state.details;
export const selectNeighbors = (state) => state.details.neighbors;
