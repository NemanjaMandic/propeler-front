// @flow

import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { useTranslation } from 'react-i18next';
import { parse } from 'qs';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '../../common/input/Input';
import { required, password, passwordsMatch } from '../../../utilities/validators';
import { changePassword, redirectToLogin } from '../../../state/auth/actions';
import SuccessScreen from '../partials/SuccessScreen';

export type ChangePasswordT = {
	new_password: string,
	password_confirm: string,
};

type PropsT = {
	auth: {
		changePassword: {
			inProgress: boolean,
			success: boolean,
			errors: string,
		},
	},
	invalid: boolean,
	handleSubmit: Function,
	changePassword: Function,
	redirectToLogin: Function,
	location: {
		search: any,
	},
};

const ChangePassword = (props: PropsT) => {
	const {
		handleSubmit,
		invalid,
		auth: {
			changePassword: { inProgress, success },
		},
		redirectToLogin,
		location: { search },
	} = props;

	let resetPasswordToken = '';

	useEffect(() => {
		const query = parse(search, {
			ignoreQueryPrefix: true,
		});

		if (query.reset) {
			resetPasswordToken = query.reset;
		} else {
			redirectToLogin();
		}
	});

	const [t] = useTranslation('translations');

	return (
		<div className={'login__form'}>
			{success ? (
				<SuccessScreen title={t('SUCCESSFULLY_CHANGE_PASS')} body="">
					<p>
						{t('YOU_CAN_RETURN')}{' '}
						<span className={'successScreenLink'} onClick={redirectToLogin}>
							{t('LOG_IN')}
						</span>
						.
					</p>
				</SuccessScreen>
			) : (
				<Fragment>
					<div className={'login__title'}>
						<h1>{t('CHANGE_PASSWORD')}</h1>
					</div>
					<form
						onSubmit={handleSubmit((data: ChangePasswordT) =>
							props.changePassword({
								newPassword: data.new_password,
								resetPasswordToken,
							}),
						)}
					>
						<div className={'form__field'}>
							<Field
								name="new_password"
								component={Input}
								label={t('NEW_PASS')}
								type="password"
								validate={[required, password]}
								autoFocus
							/>
						</div>
						<div className={'form__field'}>
							<Field
								name="password_confirm"
								component={Input}
								label={t('PASS_CONFIRM')}
								type="password"
								validate={[required, password]}
							/>
						</div>
						<div className={'form__field'}>
							{!inProgress ? (
								<Button
									type={'submit'}
									variant="contained"
									color={'primary'}
									className={'button__primary'}
									disabled={invalid}
								>
									{t('CHANGE_PASSWORD')}
								</Button>
							) : (
								<CircularProgress />
							)}
						</div>
					</form>
				</Fragment>
			)}
		</div>
	);
};

const mapStateToProps = ({ auth }) => ({
	auth,
});

export default compose(
	reduxForm({
		form: 'ChangePassword',
		validate: passwordsMatch,
	}),
	connect(
		mapStateToProps,
		{
			changePassword,
			redirectToLogin,
		},
	),
)(ChangePassword);
