// @flow

import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

const Step1 = () => {
	const [t] = useTranslation('translations');

	return (
		<Fragment>
			<p>{t('STEP1')}</p>
			<p>{t('BEGIN_STEP1')}</p>
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=sr"
			>
				{t('AUTH_ANDROID')}
			</a>
			,
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8"
			>
				{t('iOS')}
			</a>
			{t('AND')}
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://docs.microsoft.com/en-us/azure/active-directory/user-help/user-help-auth-app-download-install"
			>
				{t('AUTH_BLACKBERRY')}
			</a>
		</Fragment>
	);
};

export default Step1;
