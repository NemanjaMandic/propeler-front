// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { submit as submitReduxForm, isInvalid } from 'redux-form';
import { useTranslation } from 'react-i18next';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { redirectToLogin } from '../../../../state/auth/actions';
import { createSecret, verifySecret, twoFANext, twoFABack } from '../../../../state/2FA/actions';
import Button from '../../../common/button/Button';
import Step1 from './partials/Step1';
import Step2 from './partials/Step2';
import Step3 from './partials/Step3';

const STEP1 = 1;
const STEP2 = 2;
const STEP3 = 3;

type PropsT = {
	redirectToLogin: Function,
	createSecret: Function,
	verifySecret: Function,
	inProgress: boolean,
	token: string,
	step: number,
	secret: string,
	Tfa: Object,
	wildcards: Array<string>,
	invalid: boolean,
	twoFANext: Function,
	twoFABack: Function,
};

const TwoFactorAuthentication = (props: PropsT) => {
	const [t] = useTranslation('translations');

	function getSteps() {
		return [t('INSTALL_AUTH'), t('ADD_YOUR_ACCOUNT'), t('ALL_SET_REG')];
	}

	const steps = getSteps();

	const {
		invalid,
		inProgress,
		token,
		wildcards,
		Tfa,
		step,
		secret,
		createSecret,
		verifySecret,
		redirectToLogin,
		twoFANext,
		twoFABack,
	} = props;
	if (!token) {
		redirectToLogin();
	}

	const nextStep = () => {
		switch (step) {
			case STEP1:
				if (!secret) {
					createSecret({ setupToken: token });
				} else {
					twoFANext();
				}
				break;
			case STEP2: {
				if (!wildcards || wildcards.length === 0) {
					if (Tfa.values) {
						const { code } = Tfa.values;
						verifySecret({ code, token });
					}
				} else {
					twoFANext();
				}
				break;
			}
			default:
				redirectToLogin();
		}
	};

	const backStep = () => {
		if (step !== STEP1) {
			twoFABack();
		} else {
			redirectToLogin();
		}
	};

	return (
		<Fragment>
			<Stepper activeStep={step - 1} alternativeLabel>
				{steps.map(label => (
					<Step key={label} className={'step__class'}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<div className="two-factor">
				<h1>{t('CONFIGURE_2FA')}</h1>
				<div className="two-factor--content">
					{step === STEP1 && <Step1 />}
					{step === STEP2 && <Step2 secret={secret} step />}
					{step === STEP3 && <Step3 wildcards={wildcards} step />}
				</div>
				<div className="two-factor--cta">
					{step !== STEP3 && (
						<Button
							type={'button'}
							variant={'outlined'}
							color={'primary'}
							name={step === STEP2 ? t('BACK') : t('CANCEL')}
							onClick={() => backStep()}
						/>
					)}

					<Button
						type={'submit'}
						variant="contained"
						color={'primary'}
						name={step === STEP3 ? t('GO_TO_LOGI_IN') : t('NEXT')}
						disabled={(step === STEP2 && invalid) || inProgress}
						onClick={() => nextStep()}
					/>
				</div>
			</div>
		</Fragment>
	);
};

const mapStateToProps = state => {
	const {
		twoFA: {
			twoFAInit: { token, step },
			createSecret: { secret },
			verifySecret: { inProgress, wildcards },
		},
		form: { Tfa },
	} = state;
	return {
		token,
		step,
		secret,
		Tfa,
		inProgress,
		wildcards,
		invalid: isInvalid('Tfa')(state),
	};
};

export default connect(
	mapStateToProps,
	{
		redirectToLogin,
		createSecret,
		submitReduxForm,
		verifySecret,
		twoFANext,
		twoFABack,
	},
)(TwoFactorAuthentication);
