import { useNavigate } from 'react-router-dom';

import { List } from '../../components/List';
import { Card } from '../../components/Card';
import { useCountries } from './use-countries';

export const CountriesList = () => {
	const navigate = useNavigate();

	const [countries, { status, err }] = useCountries();

	return (
		<>
			{err && <h2>Ошибка при загрузке данных</h2>}
			{status === 'loading' && <h2>Загрузка...</h2>}

			{status === 'received' && (
				<List>
					{countries.map((c) => {
						const countryInfo = {
							img: c.flags.png,
							name: c.name,
							info: [
								{
									title: 'Population',
									description: c.population.toLocaleString(),
								},
								{
									title: 'Region',
									description: c.region,
								},
								{
									title: 'Capital',
									description: c.capital,
								},
							],
						};

						return (
							<Card
								key={c.name}
								onClick={() => navigate(`/country/${c.name}`)}
								{...countryInfo}
							/>
						);
					})}
				</List>
			)}
		</>
	);
};
