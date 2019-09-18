// @flow

import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core';
import { styles } from './Input.styles';
import Tooltip from '../tooltip/Tooltip';

type PropsT = {
	label: string,
	autoFocus: boolean,
	input: any,
	type: string,
	min?: number,
	max?: number,
	step?: number,
	size?: string,
	readOnly?: boolean,
	errorMessage?: string,
	start_icon?: string,
	end_icon?: string,
	helperText?: string,
	firstLetter?: boolean,
	maxLength?: number,
	onChange: Function,
	iconAction?: Function,
	tooltip?: string,
	classes: {
		textFieldInput: Object,
		underline: Object,
		icon: Object,
	},
	meta: {
		touched: boolean,
		invalid: boolean,
		error: string | boolean,
	},
};

const renderInputProps = (props, passwordVisibility, setPasswordVisibility) => {
	const { type, min, max, step, iconAction, start_icon, end_icon, classes, tooltip, autoFocus, readOnly } = props;
	const inputProps = { autoFocus, readOnly };

	switch (type) {
		case 'number':
			return { inputProps: { min, max, step, autoFocus, readOnly } };
		case 'password':
			return {
				inputProps: { autoFocus, readOnly },
				endAdornment: (
					<InputAdornment position="end">
						<IconButton
							aria-label="Toggle password visibility"
							onClick={() => setPasswordVisibility(!passwordVisibility)}
						>
							{!passwordVisibility ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				),
			};
		default:
			if (start_icon) {
				return {
					...inputProps,
					startAdornment: (
						<InputAdornment position="start">
							<Icon className={classes.icon} onClick={iconAction}>
								{start_icon}
							</Icon>
						</InputAdornment>
					),
				};
			} else if (end_icon) {
				return {
					...inputProps,
					endAdornment: (
						<InputAdornment position="end">
							{tooltip ? (
								<Tooltip title={tooltip} placement={'right'}>
									<Icon className={classes.icon} onClick={iconAction}>
										{end_icon}
									</Icon>
								</Tooltip>
							) : (
								<Icon className={classes.icon} onClick={iconAction}>
									{end_icon}
								</Icon>
							)}
						</InputAdornment>
					),
				};
			}
			return { inputProps };
	}
};

const Input = (props: PropsT) => {
	const {
		label,
		input,
		size,
		type,
		meta: { touched, invalid, error },
		errorMessage,
		classes,
		onChange,
		helperText,
		firstLetter,
		maxLength,
		iconAction,
		...properties
	} = props;
	const [passwordVisibility, setPasswordVisibility] = useState(false);
	const first = firstLetter && label.substring(0, 1);
	const rest = firstLetter && label.substring(1, label.length);

	return (
		<TextField
			variant={'filled'}
			label={
				firstLetter ? (
					<span>
						<span className={'first_letter'}>{first}</span>
						{rest}
					</span>
				) : (
					label
				)
			}
			type={type === 'password' && passwordVisibility ? 'text' : type}
			error={touched && (invalid || Boolean(errorMessage))}
			helperText={touched && (error || errorMessage) ? error || errorMessage : helperText || ' '}
			onChange={onChange}
			InputProps={{
				...renderInputProps(props, passwordVisibility, setPasswordVisibility),
				classes: {
					input: classes.textFieldInput,
					underline: classes.underline,
				},
				inputProps: {
					maxLength,
				},
			}}
			{...input}
			{...properties}
			className={`rm-input rm-input__${size || 'default'}`}
		/>
	);
};

export default withStyles(styles)(Input);
