// @flow

import React from 'react';
import { useTranslation } from 'react-i18next';
import ApplicationForm from './partials/ApplicationForm';
import CustomExpansionPanel from '../common/expansionPanel/CustomExpansionPanel';
import { panelContent } from '../campaign/management/constants/general';

const FundrisingApplication = () => {
	const [t] = useTranslation('translations');

	return (
		<div className={'register__form'}>
			<div id="top" className={'register__title'}>
				<h5>{t('APP_FORM_TITLE')}</h5>
				<div className={'subtitle'}>{t('APP_FORM_SUBTITLE')}</div>
			</div>
			<ApplicationForm />
			<div className={'panels'}>
				<CustomExpansionPanel options={panelContent} />
			</div>
		</div>
	);
};

export default FundrisingApplication;
