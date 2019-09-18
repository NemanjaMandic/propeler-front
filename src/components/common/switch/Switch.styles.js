import * as colors from '../../../styles/modules/colors.scss';

export const styles = theme => ({
	iOSSwitchBase: {
		'&$iOSChecked': {
			color: theme.palette.common.white,
			'& + $iOSBar': {
				backgroundColor: colors.darkPurple,
			},
		},
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.sharp,
		}),
	},
	iOSChecked: {
		transform: 'translateX(15px)',
		'& + $iOSBar': {
			opacity: 1,
			border: 'none',
		},
	},
	iOSBar: {
		borderRadius: 13,
		width: 48,
		height: 26,
		marginTop: -13,
		marginLeft: -21,
		border: 'solid 2px',
		borderColor: colors.lightPurple,
		backgroundColor: colors.lightPurple,
		opacity: 1,
		transition: theme.transitions.create(['background-color', 'border']),
	},
	iOSIcon: {
		width: 24,
		height: 24,
	},
	iOSIconChecked: {
		boxShadow: theme.shadows[1],
		marginLeft: '9px',
	},
});
