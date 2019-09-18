const styles = () => ({
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
	expanded: { margin: 0 },
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
});

const stylesDetails = () => ({
	root: {
		borderBottom: '1px solid rgba(0, 0, 0, 0)',
		borderLeft: '0px solid rgba(0, 0, 0, 0)',
		borderRight: '0px solid rgba(0, 0, 0, 0)',
		margin: 0,
		backgroundColor: '#F8F8F8',
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
		backgroundColor: '#F4F4F4',
		justifyContent: 'flex-start',
	},
});

export { styles, stylesSummary, stylesDetails, stylesActions };
