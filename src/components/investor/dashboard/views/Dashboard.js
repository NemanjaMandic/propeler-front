// @flow
import React from 'react';
import Portfolio from '../partials/Portfolio';
import InvestorCampaigns from '../partials/InvestorCampaigns';
import Updates from '../partials/Updates';

const Dashboard = () => (
	<div style={{ marginBottom: 50 }}>
		<Portfolio />
		<InvestorCampaigns />
		<Updates />
	</div>
);

export default Dashboard;
