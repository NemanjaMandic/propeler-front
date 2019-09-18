// @flow

import React from 'react';
import { useTranslation } from 'react-i18next';

type PropsT = {
	redirectToLogin: Function,
};
const RegistrationSuccess = (props: PropsT) => {
	const [t] = useTranslation('translations');

	return (
		<div className={'register-success'}>
			<div className={'register-success__title'}>
				{t('THANK_FOR_INITIAL')}
				<br />
				{t('REGISTRATION')}
			</div>
			<div className={'register-success__description'}>{t('CONFIRM_REG')}</div>
			<div className={`register-success__email`}>
				{t('EMAIL_NOT_RECEIVED')}
				<a href="mailto:support@realmarket.io">{`support@realmarket.io`}</a>
			</div>
			<div className={'register-success__login'}>
				{t('GO_TO')}
				<span className={'successScreenLink'} onClick={props.redirectToLogin}>
					{t('LOG IN')}
				</span>
			</div>
		</div>
	);
};

export default RegistrationSuccess;
