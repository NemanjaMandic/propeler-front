// @flow

import * as colors from '../../../styles/modules/colors.scss';
import * as fonts from '../../../styles/modules/fonts.scss';

export const styles = () => ({
	textFieldInput: {
		width: '400px',
		height: 'auto',
		textAlign: 'left',
		'&:focus': {
			color: colors.darkPurple,
			borderColor: colors.darkPurple,
		},
		fontSize: fonts.inputFontSize,
		lineHeight: fonts.inputLineHeight,
	},
	icon: {
		color: colors.lightPurple,
		fontSize: fonts.inputFontSize,
	},
	underline: {
		backgroundColor: 'transparent',
		'&:after': {
			borderBottomColor: colors.darkPurple,
		},
		'&:before': {
			borderBottomStyle: 'solid !important',
			borderColor: `${colors.lightPurple} !important`,
		},
	},
});
