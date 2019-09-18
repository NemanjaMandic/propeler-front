// @flow

import React, { useState, useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { useTranslation } from 'react-i18next';
import Input from '../../../common/input/Input';
import Button from '../../../common/button/Button';
import { required, notZero } from '../../../../utilities/validators';
import SelectDropdown from '../../../common/select/Select';
import { countries } from '../../../../constants/countries';

type PropsT = {
	handleSubmit: Function,
	toggleForm: Function,
	updateItem: Function,
	pristine: boolean,
	invalid: boolean,
	removeItem: Function,
	initialValues: any,
	platformCurrency: any,
};

const fields = (isCompany: boolean) =>
	isCompany
		? {
				name: 'COMPANY_INVESTOR_NAME',
				location: 'COMPANY_INVESTOR_LOCATION',
				description: 'COMPANY_INVESTOR_DESCRIPTION',
		  }
		: {
				name: 'INVESTOR_NAME',
				location: 'INVESTOR_LOCATION',
				description: 'INVESTOR_DESCRIPTION',
		  };

const InvestorCardForm = (props: PropsT) => {
	const {
		handleSubmit,
		updateItem,
		pristine,
		invalid,
		removeItem,
		toggleForm,
		initialValues,
		platformCurrency,
	} = props;

	const [isCompany, setIsCompany] = useState(initialValues.company);

	const discard = () => {
		if (initialValues.initial) {
			removeItem();
		}
		toggleForm();
	};

	useEffect(() => {
		const country = countries.find(c => c.label === initialValues.location);
		country && (initialValues.location = country.value);
	}, []);

	const submit = data => {
		if (!pristine && !invalid) {
			const submitData = { ...data, company: isCompany };
			if (!isCompany) {
				submitData.companyIdentificationNumber = null;
			}
			updateItem(submitData);
		}
		toggleForm();
	};

	const [t] = useTranslation('translations');
	const { symbol } = platformCurrency;

	return (
		<div>
			{initialValues.initial && (
				<div className={'investment_card_tabs'}>
					<div className={`investment_card_tab ${!isCompany ? 'active' : ''}`} onClick={() => setIsCompany(false)}>
						INDIVIDUAL
					</div>
					<div className={`investment_card_tab ${isCompany ? 'active' : ''}`} onClick={() => setIsCompany(true)}>
						COMPANY
					</div>
				</div>
			)}
			<form autoComplete="off" onSubmit={handleSubmit(submit)}>
				<div className={'member_container'}>
					<div>
						<Field
							name={'name'}
							component={Input}
							label={`${t(fields(isCompany).name)}*`}
							type="text"
							autoFocus
							validate={[required]}
						/>
						{isCompany && (
							<Field
								name={'companyIdentificationNumber'}
								component={Input}
								label={`${t('COMPANY_INVESTOR_NUMBER')}`}
								type="text"
							/>
						)}
						<Field
							name={'location'}
							component={SelectDropdown}
							options={countries}
							label={`${t(fields(isCompany).location)}`}
						/>
						<Field
							name={'investedAmount'}
							component={Input}
							label={`${t('INVESTED_GBP')} ${symbol}*`}
							type="text"
							validate={[required, notZero]}
						/>
						<Field
							name={'description'}
							component={Input}
							multiline
							rows="4"
							label={t(fields(isCompany).description)}
							type="text"
						/>
					</div>
					<div>
						<Field name={`linkedinUrl`} component={Input} label={t('LINKEDIN_PROFILE_URL')} type="text" />
						<Field name={`twitterUrl`} component={Input} label={t('TWITTER_PROFILE_URL')} type="text" />
						<Field name={`facebookUrl`} component={Input} label={t('FACEBOOK_PROFILE_URL')} type="text" />
						<Field name={`customProfileUrl`} component={Input} label={t('ADD_CUSTOM_PROFILE_URL')} type="text" />
						<div className={'buttons'}>
							<span onClick={discard}>{t('DISCARD')}</span>
							<Button type={'submit'} variant={'contained'} color={'primary'} name={t('SAVE')} />
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default reduxForm({
	form: 'InvestorCardForm',
})(InvestorCardForm);
