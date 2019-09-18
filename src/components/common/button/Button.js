// @flow

import React from 'react';
import { withStyles } from '@material-ui/core';
import MaterialButton from '@material-ui/core/Button';

const styles = {
	root: {
		paddingLeft: '20px',
		paddingRight: '20px',
		fontSize: '16px',
		minWidth: '160px',
		boxShadow: 'none',
		'&:focus': {
			outline: 'none',
		},
	},
	label: {
		textTransform: 'none',
	},
};

type PropsT = {
	classes: {
		root: any,
		label: any,
	},
	color: string,
	variant: string,
	name: string,
	type: string,
	disabled: boolean,
	onClick: Function,
	className: any,
};

const Button = (props: PropsT) => {
	const { classes, color, variant, type, disabled, onClick, className } = props;

	return (
		<MaterialButton
			classes={{
				root: classes.root,
				label: classes.label,
			}}
			color={`${color}`}
			variant={`${variant}`}
			type={type}
			disabled={disabled}
			className={className}
			onClick={onClick}
		>
			{props.name}
		</MaterialButton>
	);
};

export default withStyles(styles)(Button);
