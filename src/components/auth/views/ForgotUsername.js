// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '../../common/input/Input';
import { required, email } from '../../../utilities/validators';
import { forgotUsername, redirectToLogin } from '../../../state/auth/actions';
import { REGISTER, FORGOT_PASSWORD } from '../../../constants/routes';
import SuccessScreen from '../partials/SuccessScreen';

export type ForgotUsernameT = {
	email: string,
};

type PropsT = {
	auth: {
		forgotUsername: {
			inProgress: boolean,
			success: boolean,
			errors: string,
		},
	},
	invalid: boolean,
	handleSubmit: Function,
	forgotUsername: Function,
	redirectToLogin: Function,
};

const ForgotUsername = (props: PropsT) => {
	const {
		handleSubmit,
		invalid,
		auth: {
			forgotUsername: { inProgress, success },
		},
		redirectToLogin,
	} = props;
	const [t] = useTranslation('translations');
	return (
		<div className={'login__form'}>
			{success ? (
				<SuccessScreen title={t('USERNAME_WAS_FOUND')} body={t('IN_A_MOMENT')}>
					<p>
						{t('RETURN_TO')}{' '}
						<span className={'successScreenLink'} onClick={redirectToLogin}>
							{t('LOG_IN')}
						</span>
						.
					</p>
				</SuccessScreen>
			) : (
				<Fragment>
					<div className={'login__title'}>
						<h1>{t('FORGOT_USERNAME')}</h1>
						<p>{t('NO_PROBLEM')}</p>
					</div>
					<form onSubmit={handleSubmit((data: ForgotUsernameT) => props.forgotUsername(data))}>
						<div className={'form__field'}>
							<Field
								name="email"
								component={Input}
								label={t('TYPE_EMAIL')}
								type="email"
								validate={[required, email]}
								autoFocus
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
									{t('SEND')}
								</Button>
							) : (
								<CircularProgress />
							)}
						</div>
					</form>
					<div className={'login__links'}>
						<Link to={FORGOT_PASSWORD}>{t('FORGOT_PASSWORD')}</Link> {` | `} <br />
						{t('NOT_ON_REALMARKET')}
						<Link to={REGISTER}>{t('REGISTER')}</Link>
					</div>
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
		form: 'ForgotUsername',
	}),
	connect(
		mapStateToProps,
		{
			forgotUsername,
			redirectToLogin,
		},
	),
)(ForgotUsername);
