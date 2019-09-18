// @flow

import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MaterialSwitch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './Switch.styles';

type PropsT = {
	classes: any,
	onChange: Function,
	checked: boolean,
};

const Switch = (props: PropsT) => {
	const { classes, onChange, checked } = props;
	return (
		<FormControlLabel
			control={
				<MaterialSwitch
					classes={{
						switchBase: classes.iOSSwitchBase,
						bar: classes.iOSBar,
						icon: classes.iOSIcon,
						iconChecked: classes.iOSIconChecked,
						checked: classes.iOSChecked,
					}}
					disableRipple
					checked={checked}
					onChange={onChange}
				/>
			}
		/>
	);
};

export default withStyles(styles)(Switch);
