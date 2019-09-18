import * as colors from '../../../../styles/modules/colors.scss';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
		marginTop: 20,
	},
	tableCellHead: {
		fontSize: 14,
		color: colors.lightPurple,
		padding: '10px 20px 10px 0',
	},
	tableCell: {
		color: colors.darkPurple,
		fontSize: 14,
		paddingLeft: '0',
		paddingRight: '30px',
		height: '65px',
	},
	tableCellLight: {
		color: colors.lightBlue,
	},
	tableCellPointer: {
		cursor: 'pointer',
		textAlign: 'right',
	},
});

const stylesSummary = () => ({
	root: {
		borderBottom: '1px solid rgba(0, 0, 0, .125)',
		borderLeft: '0px solid rgba(0, 0, 0, 0)',
		borderRight: '0px solid rgba(0, 0, 0, 0)',
		margin: 0,
		height: 65,
		padding: 0,
	},
	content: {
		'&$expanded': {
			margin: 0,
		},
	},
	expanded: { margin: 0 },
	disabled: { opacity: '1 !important' },
});

const stylesDetails = () => ({
	root: {
		borderBottom: '1px solid rgba(0, 0, 0, 0)',
		borderLeft: '0px solid rgba(0, 0, 0, 0)',
		borderRight: '0px solid rgba(0, 0, 0, 0)',
		margin: 0,
		backgroundColor: '#F8F8F8',
		maxHeight: 365,
		overflowY: 'auto',
		minHeight: 56,
		'&$expanded': {
			minHeight: 56,
		},
		padding: 0,
	},
});

const stylesDocRequestDetails = () => ({
	root: {
		borderBottom: '1px solid rgba(0, 0, 0, 0)',
		borderLeft: '0px solid rgba(0, 0, 0, 0)',
		borderRight: '0px solid rgba(0, 0, 0, 0)',
		margin: 0,
		backgroundColor: '#F8F8F8',
		overflowY: 'none',
		minHeight: 56,
		'&$expanded': {
			minHeight: 56,
		},
		padding: 0,
	},
});

const stylesActions = () => ({
	root: {
		height: 33,
		padding: 0,
		marginLeft: 0,
		backgroundColor: '#F8F8F8',
		justifyContent: 'flex-start',
	},
});

const stylesPanel = () => ({
	root: {
		borderBottom: '0px solid rgba(0, 0, 0, 0)',
		borderLeft: '0px solid rgba(0, 0, 0, 0)',
		borderRight: '0px solid rgba(0, 0, 0, 0)',
		margin: 0,
		minHeight: 56,
		'&$expanded': {
			minHeight: 56,
		},
		padding: 0,
		boxShadow: '0px 1px 3px 0px rgba(0,0,0,0), 0px 1px 1px 0px rgba(0,0,0,0), 0px 0px 0px 0px rgba(0,0,0,0)',
	},
	expanded: { margin: '0px !important' },
	disabled: {
		backgroundColor: 'transparent !important',
		cursor: 'not-allowed',
	},
});

export { styles, stylesPanel, stylesSummary, stylesDetails, stylesActions, stylesDocRequestDetails };
