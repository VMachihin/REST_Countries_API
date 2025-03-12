import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';

import { selectNeighbors } from './details-selectors';
import { loadNeighborsByBorder } from './details-slice';

export const useNeighbors = (borders: string[] = []) => {
  const dispatch = useAppDispatch();

  const neighbors = useSelector(selectNeighbors);

  useEffect(() => {
    if (borders.length) {
      dispatch(loadNeighborsByBorder(borders));
    }
  }, [borders, dispatch]);

  return neighbors;
};
