// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialTooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import colors from '../../../styles/modules/colors.scss';

const styles = {
	tooltip: {
		fontSize: '12px',
		backgroundColor: `${colors.darkPurple} !important`,
		color: colors.white,
		textAlign: 'left',
		maxWidth: '500px',
		padding: '10px 20px',
		width: '300px',
	},
};

const Tooltip = (props: Object) => {
	return (
		<MaterialTooltip interactive TransitionComponent={Zoom} classes={{ tooltip: props.classes.tooltip }} {...props} />
	);
};

export default withStyles(styles)(Tooltip);
