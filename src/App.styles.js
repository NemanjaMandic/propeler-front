// @flow

import { createMuiTheme } from '@material-ui/core';
import * as colors from './styles/modules/colors.scss';
import * as fonts from './styles/modules/fonts.scss';

export const theme = createMuiTheme({
	typography: {
		useNextVariants: true,
	},
	palette: {
		primary: { main: colors.lightBlue },
		secondary: { main: colors.darkPurple },
	},
	overrides: {
		MuiInputLabel: {
			root: {
				fontSize: fonts.textFontSize,
			},
			filled: {
				transform: 'translate(12px, 20px) scale(1)',
				color: colors.lightPurple,
				'&$focused': {
					color: colors.darkPurple,
				},
			},
			shrink: {
				transform: 'translate(12px, 7px) scale(0.75) !important',
			},
		},
		MuiInputBase: {
			input: {
				'&$disabled': { color: `${colors.lightPurple} !important` },
			},
		},
		MuiFilledInput: {
			input: {
				padding: '22px 12px 5px',
				color: colors.darkPurple,
			},
			root: {
				'&:hover': {
					backgroundColor: `${colors.gray2} !important`,
					borderRadius: 4,
				},
				'&$disabled': {
					backgroundColor: `${colors.gray2} !important`,
					borderRadius: 4,
				},
				'&$focused': {
					backgroundColor: `${colors.gray2} !important`,
					borderRadius: 4,
				},
			},
		},
		MuiInputAdornment: {
			positionEnd: {
				marginLeft: '8px',
				position: 'absolute',
				top: '25px',
				right: '8px',
			},
		},
		MuiPrivateSwitchBase: {
			root: {
				padding: '0 5px 0 12px',
			},
		},
		MuiSelect: {
			select: {
				'&:focus': {
					background: 'transparent',
				},
			},
			icon: {
				color: colors.darkPurple,
			},
		},
		MuiButton: {
			contained: {
				color: 'white !important',
			},
		},
		MuiIconButton: {
			root: {
				padding: 5,
				color: 'inherit',
			},
		},
		MuiStepper: {
			root: {
				margin: '0 40px',
				'@media print': {
					display: 'none',
				},
			},
		},
		MuiStepIcon: {
			root: {
				color: colors.lightPurple,
			},
			active: {
				color: `${colors.darkPurple} !important`,
			},
			text: {
				fill: 'white',
			},
			completed: {
				color: `${colors.darkPurple} !important`,
			},
		},
		MuiStepLabel: {
			alternativeLabel: {
				color: 'transparent',
			},
			completed: {
				color: 'transparent !important',
			},
			active: {
				color: `${colors.darkPurple} !important`,
			},
		},
		MuiSnackbar: {
			root: {
				flexDirection: 'column',
				marginTop: '25px',
			},
		},
		MuiPaper: {
			elevation6: {
				boxShadow: 'none !important',
			},
		},
		MuiBadge: {
			badge: {
				fontSize: '10px',
				backgroundColor: colors.lightRed,
				color: 'white',
			},
		},
	},
});
