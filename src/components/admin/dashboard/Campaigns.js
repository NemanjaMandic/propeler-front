// @flow
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Filter from '../../common/filter/FilterComponent';
import CampaignsTable from './partials/CampaignsTable';
import FundRaisingAppTable from './partials/FundRaisingAppTable';
import { getCampaignsByState, getFundrisingApplications } from '../../../state/admin/actions';

import { openOffPlatformDialog, closeOffPlatformDialog } from '../../../state/modals/actions';

import { states } from '../../../constants/campaignStates';
import { getCampaignsWithInvestments } from '../../../state/user/dashboard/actions';
import OffPlatformInvestmentCard from './modals/OffPlatformInvestmentCard';

const campaignTableHeading = ['CAMPAIGN', 'TARGET', 'INVESTED', 'TIME_LEFT', 'PRICE_PER_0,01', 'EQUITY_OFFERED', ''];
const fundRaisingAppHeading = ['NAME', 'COMPANY', 'PREV_RAISED_HEADING', 'WANT_TO_RAISE_HEADING', ''];

const fundRaiseAppFilterOptions = [
	{ key: 'all', label: 'ALL' },
	{ key: 'pending', label: 'PENDING' },
	{ key: 'approved', label: 'APPROVED' },
	{ key: 'declined', label: 'REJECTED' },
];

type PropsT = {
	getCampaignsByState: Function,
	getCampaignsWithInvestments: Function,
	campaigns: any,
	campaignsWithInvestments: any,
	getFundrisingApplications: Function,
	fundrisingApplications: any,
	openOffPlatformDialog: Function,
	closeOffPlatformDialog: Function,
};

const Campaigns = (props: PropsT) => {
	const {
		getCampaignsWithInvestments,
		getCampaignsByState,
		campaigns,
		campaignsWithInvestments,
		getFundrisingApplications,
		fundrisingApplications,
		openOffPlatformDialog,
		closeOffPlatformDialog,
	} = props;

	const campaignFilterOptions = [
		{ key: states.ALL, label: 'ALL' },
		{ key: states.INITIAL, label: 'PENDING' },
		{ key: states.REVIEW_READY, label: 'READY_TO_REVIEW' },
		{ key: states.AUDIT, label: 'UNDER_REVIEW' },
		{ key: states.LAUNCH_READY, label: 'LAUNCH_READY' },
		{
			key: states.ACTIVE,
			label: 'ACTIVE',
			action: getCampaignsWithInvestments,
		},
		{
			key: states.COMPLETED,
			label: 'COMPLETED',
			action: getCampaignsWithInvestments,
		},
	];

	const [t] = useTranslation('translations');

	const [campaignFilter, setCampaignFilter] = useState(campaignFilterOptions[1]);
	const [fundRaiseAppFilter, setFundRaiseAppFilter] = useState(fundRaiseAppFilterOptions[0]);

	const handleCampaignFilterChange = selectedFilter => {
		setCampaignFilter(selectedFilter);

		if (selectedFilter.action) {
			selectedFilter.action({ page: 0, size: 5, state: selectedFilter.key });
		} else {
			getCampaignsByState({ page: 0, size: 5, state: selectedFilter.key });
		}
	};

	const handleFundRaiseAppFilterChange = selectedFilter => {
		setFundRaiseAppFilter(selectedFilter);
		getFundrisingApplications({ filter: selectedFilter.key, size: 5, pageNumber: 0 });
	};

	useEffect(() => {
		getFundrisingApplications({ filter: fundRaiseAppFilter.key, size: 5, pageNumber: 0 });
		getCampaignsByState({ page: 0, size: 5, state: campaignFilter.key });
	}, []);

	return (
		<div className={'dashboard'}>
			<div className={'dashboard__table'}>
				<div className={'dashboard__title'}>
					{t('FUND_RAISING_APP')}
					<Filter action={handleFundRaiseAppFilterChange} options={fundRaiseAppFilterOptions} initial={0} />
				</div>
				<FundRaisingAppTable
					heading={fundRaisingAppHeading}
					data={fundrisingApplications}
					currentFilter={fundRaiseAppFilter}
				/>
			</div>
			<div className={'dashboard__table'}>
				<div className={'dashboard__title'}>
					{t('CAMPAIGNS')}
					<Filter action={handleCampaignFilterChange} options={campaignFilterOptions} initial={1} />
				</div>
				<CampaignsTable
					heading={campaignTableHeading}
					data={campaigns}
					campaignsWithInvestments={campaignsWithInvestments}
					currentFilter={campaignFilter}
					openInvestmentForm={(campaignName, minInvestment) => openOffPlatformDialog({ campaignName, minInvestment })}
				/>
			</div>
			<OffPlatformInvestmentCard closeDialog={closeOffPlatformDialog} />
		</div>
	);
};
const mapStateToProps = state => {
	const {
		admin: {
			campaignActions: { data },
			fundrisingApplications,
		},
	} = state;
	const {
		user: {
			dashboard: { campaignsWithInvestments },
		},
	} = state;

	return {
		campaigns: data,
		campaignsWithInvestments,
		fundrisingApplications: fundrisingApplications.data,
	};
};
export default connect(
	mapStateToProps,
	{
		getCampaignsByState,
		getCampaignsWithInvestments,
		getFundrisingApplications,
		openOffPlatformDialog,
		closeOffPlatformDialog,
	},
)(Campaigns);
