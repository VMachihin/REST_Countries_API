import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	clearDetails,
	selectDetails,
	loadCountryByName,
} from './details-slice';

export const useDetails = (name) => {
	const dispatch = useDispatch();
	const details = useSelector(selectDetails);

	useEffect(() => {
		dispatch(loadCountryByName(name));

		return () => {
			dispatch(clearDetails());
		};
	}, [name, dispatch]);

	return details;
};
