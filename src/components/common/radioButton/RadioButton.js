// @flow

import React from 'react';
import { withStyles } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const styles = {
	label: {
		color: '#39316C',
	},
	root: {
		color: '#39316C',
	},
};

type PropsT = {
	label: string,
	classes: {
		root: any,
		label: any,
	},
	checked: boolean,
	input: Object,
	onChange: Function,
	disabled?: boolean,
};

const RadioButton = (props: PropsT) => {
	const { classes, label, checked, input, onChange, disabled } = props;
	return (
		<div>
			<FormControlLabel
				control={<Radio color={'secondary'} classes={{ root: classes.root }} />}
				label={label}
				classes={{
					root: classes.root,
					label: classes.label,
				}}
				checked={checked}
				{...input}
				{...props}
				// onChange={(event, index, value) => input.onChange(value)}
				onChange={onChange}
				disabled={disabled}
			/>
		</div>
	);
};

export default withStyles(styles)(RadioButton);
