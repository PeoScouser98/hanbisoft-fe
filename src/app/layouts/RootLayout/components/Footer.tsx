import Typography from '@/core/components/Typography';
import styled from 'styled-components';

const Footer = () => {
	return (
		<StyledFooter>
			<Typography variant='small'>© {new Date().getFullYear()} Hanbisoft, Inc. All rights reserved.</Typography>
		</StyledFooter>
	);
};

const StyledFooter = styled.footer.attrs({ className: 'dx-theme-border-color' })`
	display: flex;
	justify-content: start;
	align-items: center;
	height: fit-content;
	padding: 16px 24px;
	border-top-width: 1px;
	border-top-style: solid;
	height: 3rem;
`;

export default Footer;
