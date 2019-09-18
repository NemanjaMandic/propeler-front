// @flow

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Filter from '../../../common/filter/FilterComponent';
import DashboardCampaignsTable from '../partials/DashboardCampaignsTable';
import { getCampaignsWithInvestments } from '../../../../state/user/dashboard/actions';
import { states } from '../../../../constants/campaignStates';

type PropsT = {
	campaigns: Array<Object>,
	getCampaignsWithInvestments: Function,
};

const filterOptions = [
	{ key: states.ALL, label: 'ALL' },
	{ key: states.ACTIVE, label: 'ACTIVE' },
	{ key: states.INITIAL, label: 'PENDING' },
	{ key: states.REVIEW_READY, label: 'READY_TO_REVIEW' },
	{ key: states.AUDIT, label: 'UNDER_REVIEW' },
	{ key: states.LAUNCH_READY, label: 'LAUNCH_READY' },
	{ key: states.COMPLETED, label: 'COMPLETED' },
];

const campaignTableHeading = [
	'CAMPAIGN_CL',
	'TARGET_CL',
	'INVESTED_CL',
	'TIME_LEFT_CL',
	'PRICE_PER001',
	'EQUITY_OFFERED_CL',
	'ACTION',
];

const Dashboard = ({ campaigns, getCampaignsWithInvestments }: PropsT) => {
	const [filter, setFilter] = useState(filterOptions[1]);
	useEffect(() => {
		getCampaignsWithInvestments({ state: filter.key });
	}, []);

	const [t] = useTranslation('translations');

	const handleFilterChange = selectedFilter => {
		getCampaignsWithInvestments({ state: selectedFilter.key });
		setFilter(selectedFilter);
	};

	return (
		<div className={'dashboard'}>
			<div className={'dashboard__table'}>
				<div className={'dashboard__title'}>
					{t('MY_CAMPAIGNS')}
					<Filter action={handleFilterChange} options={filterOptions} initial={1} />
				</div>
				<DashboardCampaignsTable heading={campaignTableHeading} data={campaigns} campaignState={filter.key} />
			</div>
		</div>
	);
};

const mapStateToProps = ({
	user: {
		dashboard: {
			campaignsWithInvestments: { content },
		},
	},
}) => ({
	campaigns: content,
});

export default connect(
	mapStateToProps,
	{ getCampaignsWithInvestments },
)(Dashboard);
