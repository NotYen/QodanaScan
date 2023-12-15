import { defineStyleConfig } from '@chakra-ui/react';

const Button = {
	baseStyle: {
		fontWeight: 'bold',
		textTransform: 'uppercase',
		borderRadius: '15px'
	},
	sizes: {
		md: {
			py: '7',
			width: '45%',
			height: '65px',
			fontSize: '26px',
			maxWidth: '200px'
		}
	},
	variants: {
		solid: {
			bg: 'main',
			color: 'white',
			'&:hover, &:hover[disabled]': {
				bg: 'main'
			}
		}
	},
	defaultProps: {
		size: 'md',
		variant: 'solid'
	}
};

export default defineStyleConfig(Button);
