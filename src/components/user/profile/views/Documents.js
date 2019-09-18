// @flow

import React from 'react';
import { useTranslation } from 'react-i18next';

const Documents = () => {
	const [t] = useTranslation('translations');
	return <div>{t('DOCUMENTS')}</div>;
};

export default Documents;
