// @flow

import React, { useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import UserProfile from './profile/UserProfile';
import UserDashboard from './dashboard/UserDashboard';
import { USER, USER_PROFILE, USER_DASHBOARD } from '../../constants/routes';
import ProtectedRoute from '../auth/partials/ProtectedRoute';
import PageNotFound from '../common/pageNotFound/PageNotFound';
import { getUserInfo, getKYCforCurrentUser } from '../../state/user/profile/actions';
import { getUserCompany } from '../../state/company/actions';
import { getCurrentCampaign } from '../../state/campaign/actions';
import { ROLE_ENTREPRENEUR } from '../../constants/roles';
import { getDocumentRequests } from '../../state/user/dashboard/actions';

type PropsT = {
	userId: number,
	getUserCompany: Function,
	getCurrentCampaign: Function,
	getDocumentRequests: Function,
	urlFriendlyName: string,
	getKYCforCurrentUser: Function,
};

const User = (props: PropsT) => {
	const {
		userId,
		getUserCompany,
		getCurrentCampaign,
		getDocumentRequests,
		urlFriendlyName,
		getKYCforCurrentUser,
	} = props;

	useEffect(() => {
		getUserCompany();
		getCurrentCampaign(userId);
		getDocumentRequests();
		getKYCforCurrentUser();
	}, []);

	return (
		<div className={'user-content'}>
			<Switch>
				<ProtectedRoute path={USER_PROFILE} component={UserProfile} />
				<ProtectedRoute type={ROLE_ENTREPRENEUR} path={USER_DASHBOARD} component={UserDashboard} />
				<Redirect exact from={USER} to={USER_DASHBOARD} />
				<ProtectedRoute component={PageNotFound} />
			</Switch>
		</div>
	);
};
const mapStateToProps = ({
	auth: {
		authentication: { userId },
	},
	user: {
		profile: { info },
	},
	campaign: {
		info: { urlFriendlyName },
	},
}) => ({
	userId,
	info,
	urlFriendlyName,
});

export default connect(
	mapStateToProps,
	{
		getUserInfo,
		getUserCompany,
		getCurrentCampaign,
		getDocumentRequests,
		getKYCforCurrentUser,
	},
)(User);
