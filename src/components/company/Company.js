// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../auth/partials/ProtectedRoute';
import PageNotFound from '../common/pageNotFound/PageNotFound';
import { COMPANY } from '../../constants/routes';
import CompanyManagement from './management/CompanyManagement';
import { ROLE_ENTREPRENEUR } from '../../constants/roles';

const Company = () => {
	return (
		<div className={'user-content'}>
			<Switch>
				<ProtectedRoute exact type={ROLE_ENTREPRENEUR} path={COMPANY} component={CompanyManagement} />
				<Route component={PageNotFound} />
			</Switch>
		</div>
	);
};
export default Company;
