// @flow

import React from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as routes from '../../../../constants/routes';
import Language from '../partials/Language';

const Personalization = () => {
	const activeStyle = { borderBottom: '2px solid', fontWeight: 'bold' };

	const [t] = useTranslation('translations');

	return (
		<>
			<div className={`profile_menu_items`}>
				<NavLink exact to={routes.CHANGE_LANGUAGE} activeStyle={activeStyle} className={`item tab`}>
					{t('LANGUAGE_LABEL')}
				</NavLink>
			</div>

			<Switch>
				<Route path={routes.CHANGE_LANGUAGE} render={() => <Language />} />
				<Redirect exact from={routes.PERSONALIZATION} to={routes.CHANGE_LANGUAGE} />
			</Switch>
		</>
	);
};

export default Personalization;
