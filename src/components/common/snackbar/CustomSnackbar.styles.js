// @flow

import * as colors from '../../../styles/modules/colors.scss';

export const styles = () => ({
	root: {
		textAlign: 'center',
		maxWidth: 'none !important',
		marginTop: '5px',
		width: '830px',
	},
	success: {
		backgroundColor: colors.lightGreen,
	},
	error: {
		backgroundColor: colors.red,
	},
	info: {
		backgroundColor: colors.lightBlue,
	},
	warning: {
		backgroundColor: colors.orange,
	},
	icon: {
		fontSize: 20,
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: '5px',
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
});
