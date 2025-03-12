import { FC } from 'react';
import { NavigateFunction } from 'react-router-dom';

import { Info } from './Info';
import { useDetails } from './use-details';

interface DetailsCountryProps {
  name?: string;
  navigate: NavigateFunction;
}

export const DetailsCountry: FC<DetailsCountryProps> = ({
  name = '',
  navigate,
}) => {
  const { status, error, currentCountry } = useDetails(name);
  return (
    <>
      {status === 'loading' && <h2>Загрузка...</h2>}

      {error && <h2>{error}</h2>}
      {currentCountry && <Info push={navigate} {...currentCountry} />}
    </>
  );
};
