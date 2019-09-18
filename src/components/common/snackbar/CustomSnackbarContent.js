// @flow

import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './CustomSnackbar.styles';

type PropsT = {
	classes: {
		root: any,
		success: any,
		error: any,
		info: any,
		warning: any,
		icon: any,
		iconVariant: any,
		message: any,
		close?: any,
	},
	className?: string,
	message: string,
	onClose?: Function,
	variant?: string,
};

const variantIcon = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon,
};

const CustomSnackbarContent = (props: PropsT) => {
	const { classes, className, message, onClose, variant: customVariant, ...properties } = props;
	const variant = customVariant || 'info';
	const Icon = variantIcon[variant];
	const [open, setOpen] = useState(true);

	const handleClose = () => {
		setOpen(false);
		onClose();
	};

	return (
		open && (
			<SnackbarContent
				className={className ? `${classes[variant]} ${classes.root}` : `${classes.root} ${classes[variant]}`}
				aria-describedby="client-snackbar"
				message={
					<span id="client-snackbar" className={classes.message}>
						<Icon className={`${classes.icon} ${classes.iconVariant}`} /> {message}
					</span>
				}
				action={[
					<IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={handleClose}>
						<CloseIcon className={classes.icon} />
					</IconButton>,
				]}
				{...properties}
			/>
		)
	);
};

export default withStyles(styles)(CustomSnackbarContent);
