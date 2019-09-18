// @flow

import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
	getAllCampaigns,
	getCompletedCampaigns,
	getCampaignCardCover,
	getCampaignCardLogo,
} from '../../state/campaign/actions';
import CampaignsCardTile from './partials/CampaignsCardTile';

type PropsT = {
	activeCampaigns: Array<Object>,
	completedCampaigns: Array<Object>,
	getAllCampaigns: Function,
	getCompletedCampaigns: Function,
	isAuthenticated?: boolean,
};

const Campaigns = (props: PropsT) => {
	const { activeCampaigns, completedCampaigns, getAllCampaigns, getCompletedCampaigns, isAuthenticated } = props;
	const [t] = useTranslation('translations');

	useEffect(() => {
		getAllCampaigns({});
		getCompletedCampaigns({});
	}, [isAuthenticated]);

	return (
		<Fragment>
			<div className="campaigns--title">{t('GET_FUNDINGS')}</div>
			<div className="campaigns--content">
				<span>{t('CROWDFUND_ANYTHING')}</span>
			</div>
			<CampaignsCardTile
				title={t('ACTIVE_CAMPAIGNS')}
				emptyDataContent={t('NO_ACTIVE_CAMPAIGNS')}
				campaigns={activeCampaigns}
			/>
			<CampaignsCardTile
				title={t('COMPLETED_CAMPAIGNS')}
				emptyDataContent={t('NO_COMPLETED_CAMPAIGNS')}
				campaigns={completedCampaigns}
			/>
		</Fragment>
	);
};

const mapStateToProps = state => {
	const {
		campaign: { getAllCampaigns, getCompletedCampaigns },
		auth: {
			authentication: { isAuthenticated },
		},
	} = state;

	return {
		activeCampaigns: getAllCampaigns.campaigns.content,
		completedCampaigns: getCompletedCampaigns.campaigns.content,
		isAuthenticated,
	};
};

export default connect(
	mapStateToProps,
	{
		getAllCampaigns,
		getCompletedCampaigns,
		getCampaignCardCover,
		getCampaignCardLogo,
	},
)(Campaigns);
