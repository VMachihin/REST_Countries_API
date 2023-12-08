import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectNeighbors, loadNeighborsByBorder } from './details-slice';

export const useNeighbors = (borders = []) => {
	const dispatch = useDispatch();

	const neighbors = useSelector(selectNeighbors);

	useEffect(() => {
		if (borders.length) {
			dispatch(loadNeighborsByBorder(borders));
		}
	}, [borders, dispatch]);

	return neighbors;
};
