import * as colors from '../../../../styles/modules/colors.scss';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
		marginTop: 0,
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
	tableCellNotAllowed: {
		opacity: '0.5',
		cursor: 'not-allowed',
		textAlign: 'right',
	},
});

export default styles;
