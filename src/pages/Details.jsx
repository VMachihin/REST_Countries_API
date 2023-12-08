import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

import { Button } from '../components/Button';
import { DetailsCountry } from '../features/details/DetailsCountry';

export const Details = () => {
	const navigate = useNavigate();
	const { name } = useParams();

	return (
		<div>
			<Button onClick={() => navigate(-1)}>
				<IoArrowBack /> Back
			</Button>

			<DetailsCountry name={name} navigate={navigate} />
		</div>
	);
};
