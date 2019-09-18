// @flow
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Switch } from 'react-router-dom';
import * as routes from '../../../constants/routes';
import colors from '../../../styles/modules/colors.scss';
import Dashboard from './views/Dashboard';
import Documents from './views/Documents';
import MyCompany from './views/MyCompany';
import ProtectedRoute from '../../auth/partials/ProtectedRoute';
import { ROLE_ENTREPRENEUR } from '../../../constants/roles';

const activeStyle = { backgroundColor: colors.magnolia, borderRadius: '4px' };

const UserDashboard = () => {
	const [t] = useTranslation('translations');

	return (
		<Fragment>
			<div className={`profile_menu`}>
				<div className={`profile_menu_title`}>{t('WELCOME_USER')}</div>
				<div className={`profile_menu_items`}>
					<NavLink exact to={routes.USER_DASHBOARD} activeStyle={activeStyle} className={`item`}>
						{t('DASHBOARD')}
					</NavLink>
					<NavLink exact to={routes.DASHBOARD_DOCUMENTS} activeStyle={activeStyle} className={`item`}>
						{t('DOCUMENTS')}
					</NavLink>
					<NavLink exact to={routes.BASIC_INFO} activeStyle={activeStyle} className={`item`}>
						{t('MY_COMPANY')}
					</NavLink>
				</div>
			</div>

			<Switch>
				<ProtectedRoute type={ROLE_ENTREPRENEUR} path={routes.DASHBOARD_DOCUMENTS} render={() => <Documents />} />
				<ProtectedRoute type={ROLE_ENTREPRENEUR} path={routes.MY_COMPANY} render={() => <MyCompany />} />
				<ProtectedRoute type={ROLE_ENTREPRENEUR} path={routes.USER_DASHBOARD} render={() => <Dashboard />} />
			</Switch>
		</Fragment>
	);
};

export default UserDashboard;
