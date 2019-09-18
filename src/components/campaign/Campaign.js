// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../auth/partials/ProtectedRoute';
import PageNotFound from '../common/pageNotFound/PageNotFound';
import { CAMPAIGN } from '../../constants/routes';
import CampaignManagement from './management/CampaignManagement';
import { ROLE_ENTREPRENEUR } from '../../constants/roles';

const Campaign = () => {
	return (
		<div className={'user-content'}>
			<Switch>
				<ProtectedRoute type={ROLE_ENTREPRENEUR} exact path={CAMPAIGN} component={CampaignManagement} />
				<Route component={PageNotFound} />
			</Switch>
		</div>
	);
};
export default Campaign;
