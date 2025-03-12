import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

const selectCountries = (state: RootState) => state.countries;
const selectControls = (state: RootState) => state.controls;

export const selectAllCountries = (state: RootState) => state.countries.list;

export const selectVisibleCountries = createSelector(
  [selectCountries, selectControls],
  (countries, controls) => {
    return countries.list.filter((country) => {
      return (
        country.name.toLowerCase().includes(controls.search.toLowerCase()) &&
        country.region.includes(controls.region)
      );
    });
  }
);

export const selectCountriesInfo = createSelector(
  [selectCountries],
  (countries) => ({
    status: countries.status,
    qty: countries.list.length,
    err: countries.error,
  })
);
