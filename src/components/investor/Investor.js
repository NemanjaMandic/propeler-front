// @flow
import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { INVESTOR_DASHBOARD, INVESTOR, INVESTOR_PAYMENT } from '../../constants/routes';
import ProtectedRoute from '../auth/partials/ProtectedRoute';
import Payment from './views/Payment';
import InvestorDashboard from './dashboard/InvestorDashboard';

type PropsT = {
	role: string,
};
const Investor = ({ role }: PropsT) => {
	return (
		<Switch>
			<ProtectedRoute type={role} path={INVESTOR_DASHBOARD} render={() => <InvestorDashboard />} />

			<ProtectedRoute type={role} path={INVESTOR_PAYMENT} component={Payment} />
			<Redirect exact from={INVESTOR} to={INVESTOR_DASHBOARD} />
		</Switch>
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
export default connect(mapStateToProps)(Investor);
