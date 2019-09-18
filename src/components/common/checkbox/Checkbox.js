// @flow

import React from 'react';
import { withStyles } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MCheckbox from '@material-ui/core/Checkbox';

const styles = {
	label: {
		color: '#39316C',
		position: 'relative',
		marginTop: '2px',
		textAlign: 'left',
	},
	root: {
		color: '#3DC6FA',
		alignItems: 'flex-start',
	},
};

type PropsT = {
	label: string,
	classes: {
		root: any,
		label: any,
	},
	checked: boolean,
	input: {
		name: string,
	},
};

const Checkbox = (props: PropsT) => {
	const { classes, label, checked, input } = props;
	return (
		<FormControlLabel
			control={<MCheckbox color={'primary'} classes={{ root: classes.root }} />}
			label={label}
			checked={checked}
			{...input}
			{...props}
			value={input.name}
		/>
	);
};

export default withStyles(styles)(Checkbox);
