// @flow

import React from 'react';
import { useTranslation } from 'react-i18next';
import { countries } from '../../../../constants/countries';

type PropsT = {
	values: {
		campaignId: number,
		customProfileUrl: string,
		description: string,
		facebookUrl: string,
		id: number,
		investedAmount: 0,
		isAnonymous: boolean,
		linkedinUrl: string,
		location: string,
		name: string,
		orderNumber: number,
		photoUrl: string,
		twitterUrl: string,
		company: boolean,
		companyIdentificationNumber: string,
	},
	platformCurrency: any,
};

const labels = (isCompany: boolean) =>
	isCompany
		? {
				name: 'COMPANY_INVESTOR_NAME',
				location: 'COMPANY_INVESTOR_LOCATION',
				investedAmount: 'INVESTED_GBP',
				description: 'COMPANY_INVESTOR_DESCRIPTION',
		  }
		: {
				name: 'INVESTOR_NAME',
				location: 'INVESTOR_LOCATION',
				investedAmount: 'INVESTED_GBP',
				description: 'INVESTOR_DESCRIPTION',
		  };

const InvestorCard = (props: PropsT) => {
	const {
		values: {
			name,
			location,
			company,
			investedAmount,
			companyIdentificationNumber,
			description,
			linkedinUrl,
			twitterUrl,
			facebookUrl,
			customProfileUrl,
		},
		platformCurrency,
	} = props;
	const [t] = useTranslation('translations');
	const country = countries.find(c => c.value === location);
	const { symbol } = platformCurrency;

	return (
		<div className={'member_container'}>
			<div>
				<div className={'member_field'}>
					<label>{t(labels(company).name)}</label>
					<div>{name || '-'}</div>
				</div>
				{company && (
					<div className={'member_field'}>
						<label>{t('COMPANY_INVESTOR_NUMBER')}</label>
						<div>{companyIdentificationNumber || '-'}</div>
					</div>
				)}
				<div className={'member_field'}>
					<label>{t(labels(company).location)}</label>
					<div>{country ? country.label : location}</div>
				</div>
				<div className={'member_field'}>
					<label>
						{t('INVESTED_GBP')}
						{symbol}
					</label>
					<div>{`${investedAmount || '-'}`}</div>
				</div>
				<div className={'member_field multiline'}>
					<label>{t(labels(company).description)}</label>
					<div>{description || '-'}</div>
				</div>
			</div>
			<div>
				<div className={'member_field'}>
					<label>{t('LINKEDIN_PROFILE_URL')}</label>
					<div>{linkedinUrl || '-'}</div>
				</div>
				<div className={'member_field'}>
					<label>{t('TWITTER_PROFILE_URL')}</label>
					<div>{twitterUrl || '-'}</div>
				</div>
				<div className={'member_field'}>
					<label>{t('FACEBOOK_PROFILE_URL')}</label>
					<div>{facebookUrl || '-'}</div>
				</div>
				<div className={'member_field'}>
					<label>{t('ADD_CUSTOM_PROFILE_URL')}</label>
					<div>{customProfileUrl || '-'}</div>
				</div>
			</div>
		</div>
	);
};

export default InvestorCard;
