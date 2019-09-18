// @flow

import React, { Fragment } from 'react';
import CampaignCard from './CampaignCard';

type PropsT = {
	title: string,
	campaigns: Array<Object>,
	emptyDataContent: string,
};

const CampaignsCardTile = (props: PropsT) => {
	const { title, campaigns, emptyDataContent } = props;

	return (
		<Fragment>
			<div className="campaigns-cards--cat-title">{title}</div>
			{campaigns.length === 0 && <div className="campaigns-cards--empty-data">{emptyDataContent}</div>}
			<div className="campaigns-cards--container">
				{campaigns && campaigns.map(campaign => <CampaignCard key={campaign.companyId} info={campaign} />)}
			</div>
		</Fragment>
	);
};

export default CampaignsCardTile;
