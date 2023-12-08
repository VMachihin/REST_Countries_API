import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Container } from './Container';
import { useCleanUp } from '../features/controls/use-cleanUp';
import { ThemeSwitcher } from '../features/theme/ThemeSwitcher';

const HeaderEl = styled.header`
	box-shadow: var(--shadow);
	background-color: var(--colors-ui-base);
	transition: 0.5s all;
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2rem 0;
`;

const Title = styled(Link).attrs({
	to: '/',
})`
	color: var(--colors-text);
	font-size: var(--fs-sm);
	text-decoration: none;
	font-weight: var(--fw-bold);
`;

export const Header = () => {
	const cleanUp = useCleanUp();

	return (
		<HeaderEl>
			<Container>
				<Wrapper>
					<Title onClick={cleanUp}>Where is the world?</Title>
					<ThemeSwitcher />
				</Wrapper>
			</Container>
		</HeaderEl>
	);
};
