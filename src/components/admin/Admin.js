// @flow
import React, { Fragment } from 'react';
import { NavLink, Redirect, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as routes from '../../constants/routes';
import colors from '../../styles/modules/colors.scss';
import ProtectedRoute from '../auth/partials/ProtectedRoute';
import Campaigns from './dashboard/Campaigns';
import KYCVerificationReview from './dashboard/KYCVerificationReview';
import PaymentsReview from './dashboard/PaymentsReview';
import Documents from './dashboard/Documents';
import { ROLE_ADMIN } from '../../constants/roles';
import { useDigitalSignatures } from '../../constants/digitalSignatures';

const activeStyle = { backgroundColor: colors.magnolia, borderRadius: '4px' };

const Admin = () => {
	const [t] = useTranslation('translations');

	return (
		<Fragment>
			<div className={`profile_menu`}>
				<div className={`profile_menu_title`}>{t('WELCOME_ADMIN')}</div>
				<div className={`profile_menu_items`}>
					{/* <NavLink
            exact
            to={routes.ADMIN_USERS}
            activeStyle={activeStyle}
            className={`item`}
          >{t('USERS')}
          </NavLink> */}
					<NavLink exact to={routes.ADMIN_KYC} activeStyle={activeStyle} className={`item`}>
						{t('KYC')}
					</NavLink>
					<NavLink exact to={routes.ADMIN_CAMPAIGNS} activeStyle={activeStyle} className={`item`}>
						{t('CAMPAIGNS')}
					</NavLink>
					<NavLink exact to={routes.ADMIN_PAYMENTS} activeStyle={activeStyle} className={`item`}>
						{t('PAYMENTS')}
					</NavLink>
					{useDigitalSignatures && (
						<NavLink exact to={routes.ADMIN_DOCUMENTS} activeStyle={activeStyle} className={`item`}>
							{t('DOCUMENTS_LOWER_CASE')}
						</NavLink>
					)}
				</div>
			</div>

			<Switch>
				{/* <ProtectedRoute
          type={ROLE_ADMIN}
          path={routes.ADMIN_USERS}
          render={() => null}
        /> */}
				<ProtectedRoute type={ROLE_ADMIN} path={routes.ADMIN_KYC} render={() => <KYCVerificationReview />} />
				<ProtectedRoute type={ROLE_ADMIN} path={routes.ADMIN_CAMPAIGNS} render={() => <Campaigns />} />
				<ProtectedRoute type={ROLE_ADMIN} path={routes.ADMIN_PAYMENTS} render={() => <PaymentsReview />} />
				{useDigitalSignatures && (
					<ProtectedRoute type={ROLE_ADMIN} path={routes.ADMIN_DOCUMENTS} render={() => <Documents />} />
				)}
				<Redirect exact type={ROLE_ADMIN} from={routes.ADMIN} to={routes.ADMIN_DASHBOARD} />
				<Redirect exact type={ROLE_ADMIN} from={routes.ADMIN_DASHBOARD} to={routes.ADMIN_KYC} />
			</Switch>
		</Fragment>
	);
};

export default Admin;
