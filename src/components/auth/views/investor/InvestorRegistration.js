// @flow

import React from 'react';
import { useTranslation } from 'react-i18next';
import RegistrationCard from './partials/RegistrationCard';
import { REGISTER_INVESTOR } from '../../../../constants/routes';

const InvestorRegistration = () => {
	const [t] = useTranslation('translations');

	return (
		<div className={'register__form'}>
			<div className={'register__title'}>
				<h1>{t('INVESTOR_REGISTRATION')}</h1>
				<p>{t('INVESTOR_REASON')}</p>
			</div>

			<div className={'register__investor'}>
				<RegistrationCard
					content={t('CARD_INDIVIDUAL_CONTENT')}
					path={`${REGISTER_INVESTOR}/individual`}
					label={t('CARD_INDIVIDUAL_LABEL')}
				/>

				<RegistrationCard
					content={t('CARD_COMPANY_CONTENT')}
					path={`${REGISTER_INVESTOR}/company`}
					label={t('CARD_COMPANY_LABEL')}
				/>
			</div>
		</div>
	);
};

export default InvestorRegistration;
