import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectControls } from '../controls/controls-slice';
import {
	selectCountriesInfo,
	selectVisibleCountries,
	loadCountries,
} from './countries-slice';

export const useCountries = () => {
	const dispatch = useDispatch();

	const controls = useSelector(selectControls);
	const countries = useSelector((state) =>
		selectVisibleCountries(state, controls)
	);

	const { status, qty, err } = useSelector(selectCountriesInfo);

	useEffect(() => {
		if (!qty) {
			dispatch(loadCountries());
		}
	}, [qty, dispatch]);

	return [countries, { status, qty, err }];
};
