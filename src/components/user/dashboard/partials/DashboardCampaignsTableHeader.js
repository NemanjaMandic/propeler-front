import React from 'react';
import { useTranslation } from 'react-i18next';

const DashboardCampaignsTablHeader = ({ heading }: PropsT) => {
	const [t] = useTranslation('translations');

	return (
		<div className="investor-dashboard-portfolio-table-rows">
			{heading.map((h, index) => (
				<div
					key={`db-header-table-${h}`}
					className={
						index === 0 ? 'investor-dashboard-portfolio-table-title-first' : 'investor-dashboard-portfolio-table-title'
					}
				>
					{t(h)}
				</div>
			))}
		</div>
	);
};

export default DashboardCampaignsTablHeader;
