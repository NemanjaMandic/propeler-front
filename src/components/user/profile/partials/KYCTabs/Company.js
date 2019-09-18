import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../../common/button/Button';

const Company = () => {
	const [t] = useTranslation('translations');

	return (
		<>
			<div className={'change__profile__form verification'}>
				<span>{t('VERIFICATION_TITLE')}</span>

				<div>
					<span>{t('VERIFICATION_COMPANY_INFO')}</span>
					<span>{t('VERIFICATION_COMPANY_REQ')} </span>
				</div>
			</div>
			<div className={'verification_upload_button'}>
				<Button variant="contained" name={t('UPLOAD_DOCUMENT')} />
			</div>

			<div className={'verification_button'}>
				<Button variant="contained" color={'primary'} name={t('SUBMIT')} disabled />
			</div>
		</>
	);
};

export default Company;
