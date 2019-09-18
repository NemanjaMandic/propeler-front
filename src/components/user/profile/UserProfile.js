// @flow

import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as routes from '../../../constants/routes';
import ChangePassword from './views/ChangePassword';
import Profile from './views/Profile';
import Documents from './views/Documents';
import Notifications from './views/Notifications';
import Personalization from './views/Personalization';
import ChangeEmail from './views/ChangeEmail';
import DigitalSignature from '../../common/profile/digitalSignature/DigitalSignature';
import colors from '../../../styles/modules/colors.scss';
import NewRecoveryCodesDialog from '../../2FA/NewRecoveryCodesDialog';
import ChangeSecretDialog from '../../2FA/ChangeSecretDialog';
import ProtectedRoute from '../../auth/partials/ProtectedRoute';
import { getUserInfo } from '../../../state/user/profile/actions';
import { addSnackbarOption, removeSnackbarOption } from '../../../state/modals/actions';
import Verifications from './views/Verifications';
import DigitalSignatureSettupDialog from '../../modals/DigitalSignatureSettupDialog';
import { KYC } from '../../../constants/snackbarOptions';
import { ROLE_ADMIN } from '../../../constants/roles';

type PropsT = {
	userId: string,
	role: string,
	getUserInfo: Function,
	kycCurrentUser: any,
	addSnackbarOption: Function,
	removeSnackbarOption: Function,
};

const activeStyle = {
	backgroundColor: colors.magnolia,
	color: colors.darkBlue,
	borderRadius: '4px',
};

const UserProfile = ({
	getUserInfo,
	userId,
	role,
	kycCurrentUser,
	addSnackbarOption,
	removeSnackbarOption,
}: PropsT) => {
	const [t] = useTranslation('translations');

	useEffect(() => {
		getUserInfo(userId);
		let snackBarKycText = '';

		if (kycCurrentUser.requestState === 'PENDING') {
			if (!kycCurrentUser.auditorId) {
				snackBarKycText = 'KYC_PENDING';
			} else {
				snackBarKycText = 'KYC_REVIEW';
			}
		}
		if (snackBarKycText) {
			addSnackbarOption({
				key: KYC,
				content: { variant: 'warning', message: t(snackBarKycText) },
			});
		}

		return function cleanup() {
			removeSnackbarOption({ key: KYC });
		};
	}, [kycCurrentUser.requestState]);

	return (
		<Fragment>
			<div className={`profile_menu`}>
				<div className={`profile_menu_title`}>{t('PROFILE_SETTINGS')}</div>
				<div className={`profile_menu_items`}>
					<NavLink exact to={routes.USER_PROFILE} activeStyle={activeStyle} className={`item`}>
						{t('PROFILE')}
					</NavLink>
					{role !== ROLE_ADMIN && (
						<NavLink exact to={routes.USER_VERIFICATIONS} activeStyle={activeStyle} className={`item`}>
							{t('VERIFICATION')}{' '}
						</NavLink>
					)}

					<NavLink exact to={routes.USER_DIGITAL_SIGNATURE} activeStyle={activeStyle} className={`item`}>
						{t('SIGNATURE')}
					</NavLink>
					<NavLink exact to={routes.CHANGE_PASSWORD_PROFILE} activeStyle={activeStyle} className={`item`}>
						{t('CHANGE_PASSWORD')}
					</NavLink>
					<NavLink exact to={routes.CHANGE_EMAIL_PROFILE} activeStyle={activeStyle} className={`item`}>
						{t('CHANGE_EMAIL')}
					</NavLink>
					<NavLink exact to={routes.CHANGE_LANGUAGE} activeStyle={activeStyle} className={`item`}>
						{t('PERSONALIZATION')}
					</NavLink>
				</div>
			</div>

			<Switch>
				<ProtectedRoute path={routes.USER_DIGITAL_SIGNATURE} render={() => <DigitalSignature />} />
				<ProtectedRoute path={routes.USER_VERIFICATIONS} render={() => <Verifications />} />
				<ProtectedRoute path={routes.CHANGE_PASSWORD_PROFILE} render={() => <ChangePassword />} />
				<ProtectedRoute path={routes.CHANGE_EMAIL_PROFILE} render={() => <ChangeEmail />} />
				<ProtectedRoute path={routes.USER_DOCUMENTS} render={() => <Documents />} />
				<ProtectedRoute path={routes.USER_NOTIFICATIONS} render={() => <Notifications />} />
				<ProtectedRoute path={routes.PERSONALIZATION} render={() => <Personalization />} />
				<ProtectedRoute path={routes.USER_PROFILE} render={() => <Profile />} />
			</Switch>
			<NewRecoveryCodesDialog />
			<ChangeSecretDialog />
			<DigitalSignatureSettupDialog />
		</Fragment>
	);
};

const mapStateToProps = ({
	auth: {
		authentication: { userId, role },
	},
	user: {
		profile: { kycCurrentUser },
	},
}) => ({
	userId,
	role,
	kycCurrentUser,
});
export default connect(
	mapStateToProps,
	{ getUserInfo, addSnackbarOption, removeSnackbarOption },
)(UserProfile);
