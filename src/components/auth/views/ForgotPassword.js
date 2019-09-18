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
import { required } from '../../../utilities/validators';
import { forgotPassword, redirectToLogin } from '../../../state/auth/actions';
import { REGISTER, FORGOT_USERNAME } from '../../../constants/routes';
import SuccessScreen from '../partials/SuccessScreen';

export type ForgotPasswordT = {
	username: string,
};

type PropsT = {
	auth: {
		forgotPassword: {
			inProgress: boolean,
			success: boolean,
			errors: string,
		},
	},
	invalid: boolean,
	handleSubmit: Function,
	forgotPassword: Function,
	redirectToLogin: Function,
};

const ForgotPassword = (props: PropsT) => {
	const {
		handleSubmit,
		invalid,
		auth: {
			forgotPassword: { inProgress, success },
		},
		redirectToLogin,
	} = props;
	const [t] = useTranslation('translations');
	return (
		<div className={'login__form'}>
			{success ? (
				<SuccessScreen title={t('PASS_RESET_SEND')} body={t('INSTR_HOR_TO_RESET_PASS')}>
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
						<h1>{t('FORGOT_PASSWORD')}</h1>
						<p>{t('NO_PROBLEM_PASS')}</p>
					</div>
					<form onSubmit={handleSubmit((data: ForgotPasswordT) => props.forgotPassword(data))}>
						<div className={'form__field'}>
							<Field
								name="username"
								component={Input}
								label={t('TYPE_USERNAME')}
								type="text"
								validate={[required]}
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
									{t('RESET_PASSWORD')}
								</Button>
							) : (
								<CircularProgress />
							)}
						</div>
					</form>
					<div className={'login__links'}>
						<Link to={FORGOT_USERNAME}>{t('FORGOT_USERNAME')}</Link> {` | `} <br />
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
		form: 'ForgotPassword',
	}),
	connect(
		mapStateToProps,
		{
			forgotPassword,
			redirectToLogin,
		},
	),
)(ForgotPassword);
