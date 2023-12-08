import { useSelector, useDispatch } from 'react-redux';

import { setRegion } from './controls-slice';
import { selectRegion } from './controls-slice';

export const useControls = () => {
	const dispatch = useDispatch();
	const region = useSelector(selectRegion);

	const handleSelectRegion = (region) => {
		dispatch(setRegion(region?.value || ''));
	};

	return [region, handleSelectRegion];
};
