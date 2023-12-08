import { Info } from './Info';
import { useDetails } from './use-details';

export const DetailsCountry = ({ name = '', navigate }) => {
	const { status, error, currentCountry } = useDetails(name);
	return (
		<>
			{status === 'loading' && <h2>Загрузка...</h2>}

			{error && <h2>{error}</h2>}
			{currentCountry && <Info push={navigate} {...currentCountry} />}
		</>
	);
};
