// @flow

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { USER } from '../../../constants/routes';

const PageNotFound = () => {
	const [t] = useTranslation('translations');

	return (
		<div className={'error__page'}>
			<div className={'error__page--title'}>{t('PAGE_NOT_FOUND')}</div>
			<div className={'error__page--symbol'}>¯\_(ツ)_/¯</div>
			<div className={'error__page--text'}>{t('PAGE_NOT_FOUND_INFO')}</div>
			<Link to={USER}>{t('BACK_TO_HOME')}</Link>
		</div>
	);
};

export default PageNotFound;
