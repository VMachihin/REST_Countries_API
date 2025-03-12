import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import { Country } from 'types';

import { loadCountries } from './countries-slice';

import {
  selectCountriesInfo,
  selectVisibleCountries,
} from './countries-selectors';

export const useCountries = (): [
  Country[],
  ReturnType<typeof selectCountriesInfo>
] => {
  const dispatch = useAppDispatch();

  const countries = useSelector((state: RootState) =>
    selectVisibleCountries(state)
  );

  const { status, qty, err } = useSelector(selectCountriesInfo);

  useEffect(() => {
    if (!qty) {
      dispatch(loadCountries());
    }
  }, [qty, dispatch]);

  return useMemo(
    () => [countries, { status, qty, err }],
    [countries, status, qty, err]
  );
};
