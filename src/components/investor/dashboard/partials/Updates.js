// @flow

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Filter from '../../../common/filter/FilterComponent';
import UpdatesTable from '../partials/UpdatesTable';
import { campaignDashboardUpdates } from '../../../../state/investor/actions';
import Pagination from '../../../common/pagination/Pagination';

type PropsT = {
	campaigns: Array<Object>,
	getUserCampaigns: Function,
};

const filterOptions = [
	{ key: 'all', label: 'ALL' },
	// { key: "my_campaigns", label: "MY_CAMPAIGNS" },
	{ key: 'active', label: 'ACTIVE' },
	{ key: 'completed', label: 'COMPLETED' },
];

const campaignTableHeading = ['CAMPAIGN_CL', 'DATE_AND_TIME'];

const Updates = ({ updates, campaignDashboardUpdates }: PropsT) => {
	const [filter, setFilter] = useState(filterOptions[0]);

	const handleFilterChange = selectedFilter => {
		setFilter(selectedFilter);
		campaignDashboardUpdates({ filter: selectedFilter });
	};
	useEffect(() => {
		campaignDashboardUpdates({ filter });
	}, []);

	const [t] = useTranslation('translations');

	return (
		<div className={'dashboard'}>
			<div className={'dashboard__table'}>
				<div className={'dashboard__title'}>
					{t('UPDATES')}
					<Filter action={handleFilterChange} options={filterOptions} />
				</div>
				<UpdatesTable heading={campaignTableHeading} data={updates.data} />
				{updates && updates.data && updates.data.pageable && (
					<Pagination
						currentPage={updates.data.pageable.pageNumber}
						totalPages={updates.data.totalPages}
						first={updates.data.first}
						last={updates.data.last}
						next={campaignDashboardUpdates}
						previous={campaignDashboardUpdates}
						actionParams={{ filter }}
					/>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = ({ investor: { updates } }) => ({
	updates,
});

export default connect(
	mapStateToProps,
	{ campaignDashboardUpdates },
)(Updates);
