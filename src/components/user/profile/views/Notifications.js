// @flow

import React from 'react';
import { useTranslation } from 'react-i18next';

const Notifications = () => {
	const [t] = useTranslation('translations');
	return <div>{t('NOTIFICATIONS')}</div>;
};

export default Notifications;
