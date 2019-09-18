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
		display: 'flex',
		alignItems: 'center',
	},
	tableCellLast: {
		color: '#ACB6BF',
		fontSize: 14,
		paddingLeft: '0',
		paddingRight: '30px',
		height: '65px',
		textAlign: 'right',
	},
	cellExpanded: {
		verticalAlign: 'middle',
		display: 'inline-block',
		width: '70%',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		cursor: 'pointer',
	},
	cellPrimeColor: {
		color: '#39316C',
		whiteSpace: 'pre',
	},
	tableCellLight: {
		color: colors.lightBlue,
	},
	tableCellPointer: {
		cursor: 'pointer',
		textAlign: 'right',
	},
});

export default styles;
