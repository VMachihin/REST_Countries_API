import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	status: 'idle',
	list: [],
	error: null,
};

export const loadCountries = createAsyncThunk(
	'@@countries/load-countries ',
	(_, { extra: { client, api } }) => {
		return client.get(api.ALL_COUNTRIES);
	}
);

export const countriesSlice = createSlice({
	name: '@@countries',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadCountries.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(loadCountries.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload || action.meta.error;
			})
			.addCase(loadCountries.fulfilled, (state, action) => {
				state.status = 'received';
				state.list = action.payload.data;
			});
	},
});

export const countriesReducer = countriesSlice.reducer;

// Selectors
export const selectCountriesInfo = (state) => ({
	status: state.countries.status,
	qty: state.countries.list.length,
	err: state.countries.error,
});

export const selectAllCountries = (state) => state.countries.list;

export const selectVisibleCountries = (state, { search = '', region = '' }) => {
	return state.countries.list.filter((country) => {
		return (
			country.name.toLowerCase().includes(search.toLowerCase()) &&
			country.region.includes(region)
		);
	});
};
