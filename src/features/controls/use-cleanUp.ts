import { useAppDispatch } from 'store';
import { clearControls } from './controls-slice';

export const useCleanUp = () => {
  const dispatch = useAppDispatch();

  const cleanUp = () => dispatch(clearControls());

  return cleanUp;
};
