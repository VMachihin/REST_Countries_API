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
