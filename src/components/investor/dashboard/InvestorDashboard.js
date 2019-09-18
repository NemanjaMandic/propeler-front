// @flow
import React, { Fragment } from 'react';
import { NavLink, Redirect, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as routes from '../../../constants/routes';
import colors from '../../../styles/modules/colors.scss';
import Dashboard from '../dashboard/views/Dashboard';
import ProtectedRoute from '../../auth/partials/ProtectedRoute';
import Documents from './views/Documents';

const activeStyle = { backgroundColor: colors.magnolia, borderRadius: '4px' };

type PropsT = {
	role: string,
};

const InvestorDashboard = ({ role }: PropsT) => {
	const [t] = useTranslation('translations');
	return (
		<Fragment>
			<div className={`profile_menu`}>
				<div className={`profile_menu_title`}>{t('WELCOME_USER')}</div>
				<div className={`profile_menu_items`}>
					<NavLink exact to={routes.INVESTOR_DASHBOARD} activeStyle={activeStyle} className={`item`}>
						{t('DASHBOARD')}
					</NavLink>
					<NavLink exact to={routes.INVESTOR_PAYMENTS} activeStyle={activeStyle} className={`item`}>
						{t('PAYMENT')}
					</NavLink>
					<NavLink exact to={routes.INVESTOR_DOCUMENTS} activeStyle={activeStyle} className={`item`}>
						{t('DOCUMENTS')}
					</NavLink>
				</div>
			</div>
			<Switch>
				{/* <Redirect exact from={routes.INVESTOR} to={routes.INVESTOR_DASHBOARD} /> */}
				<ProtectedRoute type={role} path={routes.INVESTOR_DOCUMENTS} render={() => <Documents />} />
				<ProtectedRoute type={role} path={routes.INVESTOR_DASHBOARD} render={() => <Dashboard />} />
			</Switch>
		</Fragment>
	);
};

const mapStateToProps = state => {
	const {
		auth: {
			authentication: { role },
		},
	} = state;
	return {
		role,
	};
};

export default connect(mapStateToProps)(InvestorDashboard);
