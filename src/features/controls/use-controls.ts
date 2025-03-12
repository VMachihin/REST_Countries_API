import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { SingleValue } from 'react-select';
import { Region } from 'types';

import { selectRegion } from './control-selectors';
import { setRegion } from './controls-slice';
import { CountryOption } from './CustomSelect';

type onSelect = (region: SingleValue<CountryOption>) => void;

export const useControls = (): [Region | '', onSelect] => {
  const dispatch = useAppDispatch();
  const region = useSelector(selectRegion);

  const handleSelectRegion: onSelect = (region) => {
    if (region) {
      dispatch(setRegion(region.value));
    } else {
      dispatch(setRegion(''));
    }
  };

  return [region, handleSelectRegion];
};
