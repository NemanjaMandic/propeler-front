// @flow

import React, { PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
import { styles } from '../input/Input.styles';

type PropsT = {
	label: string,
	input: Object,
	firstLetter?: boolean,
	size?: string,
	meta: {
		touched: boolean,
		invalid: boolean,
		error: string,
	},
	options: Array<{
		value: string,
		label: string,
	}>,
	classes: {
		textFieldInput: Object,
		underline: Object,
	},
};

class SelectDropdown extends PureComponent<PropsT, *> {
	render() {
		const {
			label,
			firstLetter,
			input,
			meta: { touched, invalid, error },
			classes,
			options,
			size,
			t,
			...props
		} = this.props;

		const defaultValue = input.value === 0 ? '' : input.value;
		const first = label.substring(0, 1);

		const rest = label.substring(1, label.length);
		return (
			<FormControl variant="filled" className={`rm-input rm-input__${size || 'default'}`}>
				<InputLabel error={touched && error} htmlFor="age-simple">
					{firstLetter ? (
						<span>
							<span className={'first_letter'}>{first}</span>
							{rest}
						</span>
					) : (
						label
					)}
				</InputLabel>
				<Select
					input={
						<FilledInput
							classes={{
								root: classes.textFieldInput,
								underline: classes.underline,
							}}
						/>
					}
					className={`rm-input rm-input__${size || 'default'}`}
					error={touched && invalid}
					onChange={(event, index, value) => input.onChange(value)}
					{...input}
					{...props}
					value={defaultValue}
				>
					{/* <MenuItem value=""> */}
					{/* <em>None</em> */}
					{/* </MenuItem> */}
					{options.map(o => (
						<MenuItem selected key={o.value} value={o.value}>
							{t(o.label)}
						</MenuItem>
					))}
				</Select>
				<FormHelperText error={touched && error}>{error && touched ? `${error}` : ``}</FormHelperText>
			</FormControl>
		);
	}
}

export default withTranslation('translations')(withStyles(styles)(SelectDropdown));
