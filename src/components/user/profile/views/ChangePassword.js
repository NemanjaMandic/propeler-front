// @flow

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Input from '../../../common/input/Input';
import { password, required, passwordsMatch } from '../../../../utilities/validators';
import { changePasswordProfile } from '../../../../state/user/profile/actions';

export type ChangePasswordT = {
	oldPassword: string,
	newPassword: string,
};

type PropsT = {
	invalid: boolean,
	pristine: boolean,
	reset: Function,
	handleSubmit: Function,
	changePasswordProfile: Function,
	userId: number,
};

const onSubmit = (reset, changePasswordProfile, userId, data: *) => {
	const submittedData = {
		newPassword: data.password,
		oldPassword: data.oldPassword,
	};

	changePasswordProfile({ userId, submittedData });
	reset();
};

const ChangePassword = (props: PropsT) => {
	const { handleSubmit, invalid, reset, pristine, changePasswordProfile, userId } = props;
	const [t] = useTranslation('translations');
	return (
		<div className={'change__password__form'}>
			<form onSubmit={handleSubmit((data: *) => onSubmit(reset, changePasswordProfile, userId, data))}>
				<div className={'form__field'}>
					<Field
						name="oldPassword"
						component={Input}
						label={t('CURRENT_PASSWORD')}
						type="password"
						validate={[required, password]}
						autoFocus
					/>
				</div>
				<div className={'form__field'}>
					<Field
						name="password"
						component={Input}
						label={t('TYPE_NEW_PASSWORD')}
						type="password"
						validate={[required, password]}
					/>
				</div>
				<div className={'form__field'}>
					<Field
						name="passwordConfirm"
						component={Input}
						label={t('CONFIRM_NEW_PASSWORD')}
						type="password"
						validate={[required, password]}
					/>
				</div>
				<div className={'form__field'}>
					<Button
						type={'submit'}
						variant="contained"
						color={'primary'}
						className={'button__primary'}
						disabled={invalid || pristine}
					>
						{t('SAVE_CHANGES')}
					</Button>
				</div>
			</form>
		</div>
	);
};

const mapStateToProps = ({
	auth: {
		authentication: { userId },
	},
}) => ({
	userId,
});

export default compose(
	reduxForm({
		form: 'ChangePassword',
		validate: passwordsMatch,
	}),
	connect(
		mapStateToProps,
		{ changePasswordProfile },
	),
)(ChangePassword);
