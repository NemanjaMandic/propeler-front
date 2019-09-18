import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import styles from '../../../investor/dashboard/partials/InvestorDashboardCampaignsTable.styles';
import companyAvatarImage from '../../../../images/company_avatar.svg';
import Pagination from '../../../common/pagination/Pagination';
import { confirmModal } from '../../../../state/modals/actions';
import { auditCampaign, getCampaignsByState, launchCampaign } from '../../../../state/admin/actions';
import { states } from '../../../../constants/campaignStates';
import CampaignWithInvestmentRow from './CampaignWithInvestmentRow';
import CampaignTableRow from './CampaignTableRow';

type PropsT = {
	heading: Array<string>,
	data: any,
	campaignsWithInvestments: any,
	logo: {
		file: string,
		type: string,
	},
	confirmModal: Function,
	userId: number,
	currentFilter: any,
	getCampaignsByState: Function,
	openInvestmentForm: Function,
};

const CampaignsTable = ({
	heading,
	data,
	campaignsWithInvestments,
	logo,
	confirmModal,
	currentFilter,
	userId,
	getCampaignsByState,
	openInvestmentForm,
}: PropsT) => {
	const [t] = useTranslation('translations');

	const getLogo = f => {
		return f ? `data:image/jpeg;base64,${f}` : companyAvatarImage;
	};

	const companyAvatar = logo.file ? `data:image/jpeg;base64,${logo.file}` : companyAvatarImage;
	return (
		<Fragment>
			<div className="investor-dashboard-portfolio-table-rows">
				{heading.map((h, index) => (
					<div
						key={`db-header-table-${h}`}
						className={
							index === 0
								? 'investor-dashboard-portfolio-table-title-first'
								: 'investor-dashboard-portfolio-table-title'
						}
					>
						{t(h).toUpperCase()}
						{h && (
							<IconButton classes={{ label: 'rm-arrow-icon' }} className={'icon-button'} onClick={() => console.log(h)}>
								<ArrowDownward />
							</IconButton>
						)}
					</div>
				))}
			</div>

			{currentFilter.key === states.ACTIVE || currentFilter.key === states.COMPLETED
				? campaignsWithInvestments.content.map(row => {
						return (
							<CampaignWithInvestmentRow
								key={`dashboard-table-investment-${row.campaign.urlFriendlyName}`}
								logo={getLogo(row.logoImage)}
								campaign={row.campaign}
								investments={row.investments}
								confirmModal={confirmModal}
								addInvestor={openInvestmentForm}
							/>
						);
				  })
				: data.content.map(row => {
						return (
							<CampaignTableRow
								key={`dashboard-table-investment-${row.urlFriendlyName}`}
								logo={getLogo(row.logoImage)}
								campaign={row}
								userId={userId}
								addInvestor={openInvestmentForm}
							/>
						);
				  })}

			{data.content.length > 0 && (
				<Pagination
					currentPage={data.number}
					totalPages={data.totalPages}
					next={getCampaignsByState}
					previous={getCampaignsByState}
					first={data.first}
					last={data.last}
					actionParams={{ state: currentFilter.key }}
				/>
			)}
		</Fragment>
	);
};

const mapStateToProps = ({
	company: {
		logo: { fileDto },
	},
	auth: {
		authentication: { userId },
	},
	admin: { launchCampaign },
}) => ({
	logo: fileDto,
	userId,
	launchCampaign,
});

export default connect(
	mapStateToProps,
	{
		confirmModal,
		auditCampaign,
		getCampaignsByState,
		launchCampaign,
	},
)(withStyles(styles)(CampaignsTable));
