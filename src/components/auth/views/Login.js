// @flow

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '../../common/button/Button';
import Input from '../../common/input/Input';
import { required, password, trimmed } from '../../../utilities/validators';
import { loginUser } from '../../../state/auth/actions';
import { REGISTER, FORGOT_PASSWORD, FORGOT_USERNAME } from '../../../constants/routes';

export type LoginDataT = {
	username: string,
	password: string,
};

type PropsT = {
	auth: any,
	invalid: boolean,
	handleSubmit: Function,
	loginUser: Function,
};

const Login = (props: PropsT) => {
	const {
		handleSubmit,
		invalid,
		auth: { inProgress },
	} = props;
	const [t] = useTranslation('translations');
	return (
		<div className={'login__form'}>
			<div className={'login__title'}>
				<h1>{t('WELCOME')}</h1>
			</div>
			<form onSubmit={handleSubmit((data: LoginDataT) => props.loginUser(data))}>
				<div className={'form__field'}>
					<Field
						name="username"
						component={Input}
						label={t('USERNAME')}
						type="text"
						validate={[required]}
						normalize={trimmed}
						autoFocus
					/>
				</div>
				<div className={'form__field'}>
					<Field
						name="password"
						component={Input}
						label={t('PASSWORD')}
						type="password"
						validate={[required, password]}
					/>
				</div>
				<div className={'form__field'}>
					{!inProgress ? (
						<Button type={'submit'} variant={'contained'} color={'primary'} name={t('LOG IN')} disabled={invalid} />
					) : (
						<CircularProgress />
					)}
				</div>
			</form>
			<div className={'login__links'}>
				<Link to={FORGOT_USERNAME}>{t('FORGOT_USERNAME')}</Link> {` | `}{' '}
				<Link to={FORGOT_PASSWORD}>{t('FORGOT_PASSWORD')}</Link>
				<br />
				{t('NOT_ON_REALMARKET')}
				<Link to={REGISTER}>{t('REGISTER')}</Link>
			</div>
		</div>
	);
};

const mapStateToProps = ({ auth }) => ({
	auth,
});

export default compose(
	reduxForm({
		form: 'Login',
	}),
	connect(
		mapStateToProps,
		{
			loginUser,
		},
	),
)(Login);
