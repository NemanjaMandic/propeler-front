// @flow

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Filter from '../../../common/filter/FilterComponent';
import InvestorDashboardCampaignsTable from './InvestorDashboardCampaignsTable';
import { states } from '../../../../constants/campaignStates';
import { getAllCampaigns } from '../../../../state/campaign/actions';

type PropsT = {
	getAllCampaigns: Function,
};

const filterOptions = [
	{ key: states.ALL, label: 'ALL' },
	{ key: states.ACTIVE, label: 'ACTIVE' },
	{ key: states.COMPLETED, label: 'COMPLETED' },
	{ key: states.ALL, label: 'DATE_ENDED' },
	{ key: states.ALL, label: 'MOST_RECENT' },
];

const campaignTableHeading = ['CAMPAIGN_CL', 'TIME_LEFT_CL', 'INVESTED_CL', 'TARGET_CL', 'EQUITY_OFFERED_CL', ' '];

const InvestorCampaigns = ({ getAllCampaigns }: PropsT) => {
	const [t] = useTranslation('translations');

	const [filter, setFilter] = useState(filterOptions[1]);

	const handleFilterChange = selectedFilter => {
		setFilter(selectedFilter);
		getAllCampaigns({ filter: selectedFilter.key, size: 5 });
	};

	return (
		<div className={'dashboard'}>
			<div className={'dashboard__table'}>
				<div className={'dashboard__title'}>
					{t('CAMPAIGNS')}
					<Filter action={handleFilterChange} options={filterOptions} initial={1} />
				</div>
				<InvestorDashboardCampaignsTable heading={campaignTableHeading} campaignState={filter.key} />
			</div>
		</div>
	);
};

export default connect(
	null,
	{ getAllCampaigns },
)(InvestorCampaigns);
