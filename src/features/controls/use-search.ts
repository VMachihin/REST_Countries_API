import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';

import { selectSearch } from './control-selectors';
import { setSearch } from './controls-slice';
import { ChangeEventHandler } from 'react';

type onSearch = ChangeEventHandler<HTMLInputElement>;

export const useSearch = (): [string, onSearch] => {
  const dispatch = useAppDispatch();
  const search = useSelector(selectSearch);

  const handleSearch: onSearch = (event) => {
    dispatch(setSearch(event.target.value));
  };

  return [search, handleSearch];
};
