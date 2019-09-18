// @flow

import React from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as routes from '../../../../constants/routes';

import BasicInfoForm from '../partials/BasicInfoForm';
import ExternalLinksForm from '../partials/ExternalLinksForm';

const MyCompany = () => {
	const activeStyle = { borderBottom: '2px solid', fontWeight: 'bold' };

	const [t] = useTranslation('translations');

	return (
		<>
			<div className={`profile_menu_items`}>
				<NavLink exact to={routes.BASIC_INFO} activeStyle={activeStyle} className={`item tab`}>
					{t('BASIC_INFO')}
				</NavLink>
				<NavLink to={routes.EXTERNAL_LINKS} activeStyle={activeStyle} className={`item tab`}>
					{t('EXTERNAL_LINKS')}
				</NavLink>
			</div>

			<Switch>
				<Route path={routes.BASIC_INFO} render={() => <BasicInfoForm />} />
				<Route path={routes.EXTERNAL_LINKS} render={() => <ExternalLinksForm />} />
				<Redirect exact from={routes.MY_COMPANY} to={routes.BASIC_INFO} />
			</Switch>
		</>
	);
};

export default MyCompany;
