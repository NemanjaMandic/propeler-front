// @flow

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, formValueSelector, reduxForm, reset } from 'redux-form';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { useTranslation } from 'react-i18next';
import UploadPhoto from '../../../common/uploadPhoto/UploadPhoto';
import Input from '../../../common/input/Input';
import Button from '../../../common/button/Button';
import { max, min, required, url } from '../../../../utilities/validators';
import { offPlatformInvestment } from '../../../../state/modals/actions';
import { getAvailableInvestment } from '../../../../state/investor/actions';
import SelectDropdown from '../../../common/select/Select';
import { countries } from '../../../../constants/countries';

type PropsT = {
	open: boolean,
	inProgress: boolean,
	campaignName: string,
	isPublic: boolean,
	picture: any,
	handleSubmit: Function,
	closeDialog: Function,
	change: Function,
	reset: Function,
	invalid: boolean,
	pristine: boolean,
	offPlatformInvestment: Function,
	platformCurrency: any,
	minInvestment: number,
	availableInvestment: {
		amount: number,
	},
	getAvailableInvestment: Function,
};

const fields = (isCompany: boolean) =>
	isCompany
		? {
				name: { key: `companyName`, label: 'COMPANY_INVESTOR_NAME' },
				number: {
					key: `companyIdentificationNumber`,
					label: 'COMPANY_INVESTOR_NUMBER',
				},
				location: {
					key: `countryOfResidence`,
					label: 'COMPANY_INVESTOR_LOCATION',
				},
				investedAmount: { key: `investedAmount`, label: 'INVESTED_GBP' },
				description: {
					key: `shortBiography`,
					label: 'COMPANY_INVESTOR_DESCRIPTION',
				},
		  }
		: {
				name: { key: `firstName`, label: 'INVESTOR_NAME' },
				number: { key: `nationalIdentificationNumber`, label: 'INVESTOR_NID' },
				location: { key: `countryOfResidence`, label: 'INVESTOR_LOCATION' },
				investedAmount: { key: `investedAmount`, label: 'INVESTED_GBP' },
				description: { key: `shortBiography`, label: 'INVESTOR_DESCRIPTION' },
		  };

const OffPlatformInvestmentCard = (props: PropsT) => {
	const {
		open,
		campaignName,
		inProgress,
		isPublic,
		picture,
		closeDialog,
		handleSubmit,
		invalid,
		pristine,
		change,
		reset,
		offPlatformInvestment,
		platformCurrency,
		getAvailableInvestment,
		availableInvestment: { amount: maxInvestment },
		minInvestment,
	} = props;

	useEffect(() => {
		if (open) {
			getAvailableInvestment({ urlFriendlyName: campaignName });
		}
	}, [open]);

	const [isCompany, setIsCompany] = useState(false);

	const { symbol } = platformCurrency;

	const close = () => {
		reset();
		closeDialog();
		setIsCompany(false);
	};

	const submit = data => {
		if (!inProgress || !invalid || !pristine) {
			offPlatformInvestment({ campaignName, data });
		}
	};

	const [t] = useTranslation('translations');

	return (
		<Dialog open={open} disableBackdropClick disableEscapeKeyDown maxWidth={'lg'}>
			<DialogContent className={`change-dialog`}>
				<div className={`off_platform_investment_form`}>
					<div className={'investment_card_tabs'}>
						<div className={`investment_card_tab ${!isCompany ? 'active' : ''}`} onClick={() => setIsCompany(false)}>
							INDIVIDUAL
						</div>
						<div className={`investment_card_tab ${isCompany ? 'active' : ''}`} onClick={() => setIsCompany(true)}>
							COMPANY
						</div>
					</div>
					<div className={'investment_card_action_bar'}>
						<span onClick={() => change('isPublic', !isPublic)}>
							{`${t('SET')}${t('AS')}${!isPublic ? 'public' : t('ANONYMOUS')}`}
						</span>
					</div>
					<div className={'card__content'}>
						<UploadPhoto
							name={`investment_investor_picture`}
							uploadPhoto={data => change('picture', data)}
							deletePhoto={() => change('picture', {})}
							fileDto={picture && { file: picture.base64 }}
							inProgress={inProgress}
							info={{ maxImageSize: '4MB', accepts: 'JPG, PNG' }}
						/>
						<form autoComplete="off" onSubmit={handleSubmit(submit)}>
							<div className={'member_container'}>
								<div>
									<Field
										name={fields(isCompany).name.key}
										component={Input}
										label={`${t(fields(isCompany).name.label)}*`}
										type="text"
										autoFocus
										validate={[required]}
									/>
									{isCompany && (
										<Field
											name={fields(isCompany).number.key}
											component={Input}
											label={`${t(fields(isCompany).number.label)}*`}
											type="text"
											validate={[required]}
										/>
									)}
									<Field
										name={fields(isCompany).location.key}
										component={SelectDropdown}
										options={countries}
										label={`${t(fields(isCompany).location.label)}*`}
										validate={[required]}
									/>
									<Field
										name={fields(isCompany).investedAmount.key}
										component={Input}
										label={`${t(fields(isCompany).investedAmount.label)} ${symbol}*`}
										type="text"
										validate={[
											required,
											value => min(value, minInvestment, `${t('MIN_INV_AMOUNT')}${minInvestment}`),
											value => max(value, maxInvestment, `${t('MAX_INV_AMOUNT')}${maxInvestment}`),
										]}
									/>
									<Field
										name={fields(isCompany).description.key}
										component={Input}
										multiline
										rows="4"
										label={t(fields(isCompany).description.label)}
										type="text"
									/>
								</div>
								<div>
									<Field
										name={`linkedinUrl`}
										component={Input}
										label={t('LINKEDIN_PROFILE_URL')}
										type="text"
										validate={[url]}
									/>
									<Field
										name={`twitterUrl`}
										component={Input}
										label={t('TWITTER_PROFILE_URL')}
										type="text"
										validate={[url]}
									/>
									<Field
										name={`facebookUrl`}
										component={Input}
										label={t('FACEBOOK_PROFILE_URL')}
										type="text"
										validate={[url]}
									/>
									<Field
										name={`customProfileUrl`}
										component={Input}
										label={t('ADD_CUSTOM_PROFILE_URL')}
										type="text"
										validate={[url]}
									/>
									<div className={'buttons investment_form'}>
										<span onClick={close}>{t('CANCEL')}</span>
										<Button
											type={'submit'}
											variant={'contained'}
											color={'primary'}
											disabled={inProgress || invalid || pristine}
											name={t('SAVE')}
										/>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

const selector = formValueSelector('OffPlatformInvestmentForm');
const mapStateToProps = state => {
	const { availableInvestment } = state.modals.investDialog;
	const { campaignName, open, inProgress, minInvestment } = state.modals.offPlatformInvestment;
	const {
		platformSettings: {
			settings: { platformCurrency },
		},
	} = state.campaign;
	const isPublic = selector(state, 'isPublic');
	const picture = selector(state, 'picture');
	return {
		open,
		inProgress,
		picture,
		campaignName,
		isPublic,
		platformCurrency,
		availableInvestment,
		minInvestment,
	};
};

export default compose(
	connect(
		mapStateToProps,
		{ reset, offPlatformInvestment, getAvailableInvestment },
	),
	reduxForm({
		form: 'OffPlatformInvestmentForm',
	}),
)(OffPlatformInvestmentCard);
