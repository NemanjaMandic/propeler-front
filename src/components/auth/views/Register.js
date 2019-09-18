// @flow

import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { NavLink } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Field, reduxForm, change } from 'redux-form';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
import Button from '../../common/button/Button';
import Input from '../../common/input/Input';
import SelectDropdown from '../../common/select/Select';
import { required, email, password, passwordsMatch, trimmed } from '../../../utilities/validators';
import {
	checkUsername,
	redirectToLogin,
	registerCompanyInvestor,
	registerIndividualInvestor,
	registerEntrepreneur,
	checkRegistrationToken,
} from '../../../state/auth/actions';
import { countries } from '../../../constants/countries';
import Switch from '../../common/switch/Switch';
import * as routes from '../../../constants/routes';
import RegistrationSuccess from '../partials/RegistrationSuccess';

export type RegisterBodyT = {
	address: string,
	city: string,
	countryForTaxation?: string,
	countryOfResidence: string,
	email: string,
	firstName: string,
	lastName: string,
	password: string,
	companyName: string,
	companyIdentificationNumber: string,
	phoneNumber?: string,
	username: string,
};

export type RegisterDataT = {
	body: RegisterBodyT,
	header: {
		captcha_response: String,
	},
};

type PropsT = {
	success: boolean,
	inProgress: boolean,
	available: boolean,
	handleSubmit: Function,
	change: Function,
	redirectToLogin: Function,
	invalid: boolean,
	checkUsername: Function,
	registerIndividualInvestor: Function,
	registerCompanyInvestor: Function,
	registerEntrepreneur: Function,
	checkRegistrationToken: Function,
	registrationToken: any,
	match: any,
};

function Register(props: PropsT) {
	const { token, type } = props.match.params;
	const [checked, isChecked] = useState(false);
	const [recaptchaInvalid, isRecaptchaInvalid] = useState(true);
	const [typingTimeout, setTypingTimeout] = useState();

	const {
		handleSubmit,
		invalid,
		available,
		inProgress,
		success,
		change,
		redirectToLogin,
		checkRegistrationToken,
		registrationToken,
		registerEntrepreneur,
		registerCompanyInvestor,
		registerIndividualInvestor,
	} = props;

	const [t] = useTranslation('translations');

	useEffect(() => {
		if (token) {
			checkRegistrationToken(token);
		}
	}, []);

	if (registrationToken.firstName) change('Register', 'body.firstName', registrationToken.firstName);
	if (registrationToken.lastName) change('Register', 'body.lastName', registrationToken.lastName);

	const companyRegistration = type === 'company';

	const handleChange = (e: any) => {
		if (typingTimeout) clearTimeout(typingTimeout);
		setTypingTimeout(setTimeout(() => props.checkUsername(e.target.value), 300));
	};

	// specifying verify callback function
	const recaptchaCallback = (recapthaCode: String) => {
		change('Register', 'header.captcha_response', recapthaCode);
		isRecaptchaInvalid(false);
	};

	const registerUser = (data: RegisterDataT) => {
		const { countryForTaxation, ...other } = data.body;
		other.countryForTaxation = checked ? countryForTaxation : other.countryOfResidence;
		const submittedData = {
			body: { ...other, registrationToken: token || null },
			header: data.header,
		};
		if (token) {
			registerEntrepreneur(submittedData);
		} else {
			if (companyRegistration) {
				registerCompanyInvestor(submittedData);
			} else {
				registerIndividualInvestor(submittedData);
			}
		}
	};

	return (
		<div className={'register__form'}>
			{success ? (
				<RegistrationSuccess redirectToLogin={redirectToLogin} />
			) : (
				<Fragment>
					<div className={'register__title'}>
						<h1>{t('INITIAL_REGISTRATION')}</h1>
						<p>
							{t('FILL_OUT_REGISTRATION')}
							<br />
							{t('ALREADY_HAVE_AN_ACCOUNT')} <NavLink to={routes.LOGIN}>{t('LOG_IN')}</NavLink>
						</p>
					</div>
					<form onSubmit={handleSubmit((data: RegisterDataT) => registerUser(data))}>
						<div className={'form__field'}>
							<Field
								name="body.username"
								component={Input}
								label={`${t('USERNAME')}*`}
								type="text"
								errorMessage={!available ? 'User with username already exists' : ''}
								onChange={handleChange}
								validate={[required]}
								normalize={trimmed}
								autoFocus
							/>
						</div>
						<div className={'form__field'}>
							<Field
								name="body.email"
								component={Input}
								label={`${t('EMAIL')}*`}
								type="text"
								validate={[required, email]}
							/>
						</div>
						<div className={'form__field'}>
							<Field
								name="body.password"
								component={Input}
								label={`${t('PASSWORD')}*`}
								type="password"
								validate={[required, password]}
							/>
						</div>
						<div className={'form__field'}>
							<Field
								name="body.passwordConfirm"
								component={Input}
								label={`${t('CONFIRM_PASSWORD')}*`}
								type="password"
								validate={[required, password]}
							/>
						</div>
						{companyRegistration && (
							<>
								<div className={'form__field'}>
									<Field
										name="body.companyName"
										component={Input}
										label={t('COMPANY_NAME')}
										type="text"
										validate={[required]}
									/>
								</div>

								<div className={'form__field'}>
									<Field
										name="body.companyIdentificationNumber"
										component={Input}
										label={t('COMPANY_ID_NUMBER')}
										type="text"
										validate={[required]}
									/>
								</div>
							</>
						)}
						<div className={'form__field'}>
							<Field
								name="body.firstName"
								component={Input}
								label={`${t('FIRST_NAME')}*`}
								type="text"
								validate={[required]}
								disabled={token !== undefined}
							/>
						</div>
						<div className={'form__field'}>
							<Field
								name="body.lastName"
								component={Input}
								label={`${t('LAST_NAME')}*`}
								type="text"
								validate={[required]}
								disabled={token !== undefined}
							/>
						</div>
						<div className={'form__field'}>
							<Field
								name={'body.countryOfResidence'}
								component={SelectDropdown}
								options={countries}
								label={`${t('COUNTRY_OF_RESIDENCE')}*`}
								validate={[required]}
							/>
						</div>
						<div className={`form__field--country`}>
							<div className={`form__field--width`}>
								<div>
									<Switch className={`form__field--switch`} checked={checked} onChange={() => isChecked(!checked)} />
								</div>
								<div>{t('TAX_COUNTRY_QUESTION')}</div>
							</div>
						</div>
						{checked && (
							<div className={'form__field'}>
								<Field
									name={'body.countryForTaxation'}
									component={SelectDropdown}
									options={countries}
									label={t('COUNTRY_FOR_TAXATION')}
								/>
							</div>
						)}
						<div className={'form__field'}>
							<Field name="body.city" component={Input} label={`${t('CITY')}*`} type="text" validate={[required]} />
						</div>
						<div className={'form__field'}>
							<Field
								name="body.address"
								component={Input}
								label={`${t('ADDRESS')}*`}
								type="text"
								validate={[required]}
							/>
						</div>
						<div className={'form__field'}>
							<Field name="body.phoneNumber" component={Input} label={t('PHONE_NUMBER_OPTIONAL')} type="text" />
						</div>
						<div className={'form__field--recaptcha'}>
							<ReCAPTCHA sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY} onChange={recaptchaCallback} />
						</div>
						<div className={'form__field'}>
							{!inProgress ? (
								<Button
									type={'submit'}
									variant="contained"
									color={'primary'}
									name={t('SUBMIT_REGISTRATION')}
									disabled={invalid || recaptchaInvalid}
								/>
							) : (
								<CircularProgress />
							)}
						</div>
					</form>
				</Fragment>
			)}
		</div>
	);
}

const mapStateToProps = ({
	auth: {
		registerUser: { success, inProgress },
		checkUsername: { success: available },
		registrationToken,
	},
}) => ({
	success,
	inProgress,
	available,
	registrationToken,
});

export default compose(
	reduxForm({
		form: 'Register',
		validate: passwordsMatch,
	}),
	connect(
		mapStateToProps,
		{
			registerCompanyInvestor,
			registerIndividualInvestor,
			registerEntrepreneur,
			change,
			checkUsername,
			redirectToLogin,
			checkRegistrationToken,
		},
	),
)(Register);
