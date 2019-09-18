import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { styles } from './DashboardCampaignsTable.styles';
import { campaignSubmitForReview, deleteCampaign } from '../../../../state/campaign/actions';
import { approveInvestmentAsOwner, rejectInvestmentAsOwner } from '../../../../state/user/dashboard/actions';
import { confirmModal } from '../../../../state/modals/actions';
import companyAvatarImage from '../../../../images/company_avatar.svg';
import DashboardCampaignsTableHeader from './DashboardCampaignsTableHeader';
import DashboardCampaignsTableRowExpandable from './DashboardCampaignsTableRowExpandable';
import { getCompanyLogo } from '../../../../state/company/actions';

type PropsT = {
	classes: any,
	heading: Array<string>,
	data: Array<Object>,
	campaignState?: string,
	deleteCampaign: Function,
	confirmModal: Function,
	campaignSubmitForReview: Function,
	approveInvestmentAsOwner: Function,
	rejectInvestmentAsOwner: Function,
	logo: {
		file: string,
		type: string,
	},
	company: any,
};

const DashboardCampaignsTable = ({
	heading,
	data,
	deleteCampaign,
	confirmModal,
	campaignSubmitForReview,
	logo,
	approveInvestmentAsOwner,
	rejectInvestmentAsOwner,
	company,
	getCompanyLogo,
}: PropsT) => {
	const [t] = useTranslation('translations');

	useEffect(() => {
		if (company.logoUrl) getCompanyLogo(company.id);
	}, []);

	const deleteConfirmation = row => {
		confirmModal({
			open: true,
			title: t('CAMPAIGN_DELETION_REQUEST'),
			subtitle: t('CONFIRM_DELETE_CAMPAIGN'),
			actionLabel: t('DELETE'),
			cancelLabel: t('CANCEL'),
			actionMethod: deleteCampaign,
			actionParams: row.urlFriendlyName,
		});
	};

	const companyAvatar = logo.file ? `data:image/jpeg;base64,${logo.file}` : companyAvatarImage;

	return (
		<div>
			<DashboardCampaignsTableHeader heading={heading} />
			{data.map(row => (
				<DashboardCampaignsTableRowExpandable
					key={`dashboard-table-investment-${row.campaign.urlFriendlyName}`}
					logo={companyAvatar}
					campaign={row.campaign}
					investments={row.investments}
					deleteConfirmation={deleteConfirmation}
					campaignSubmitForReview={campaignSubmitForReview}
					approveInvestmentAsOwner={approveInvestmentAsOwner}
					rejectInvestmentAsOwner={rejectInvestmentAsOwner}
					confirmModal={confirmModal}
				/>
			))}
		</div>
	);
};

const mapStateToProps = ({
	company: {
		logo: { fileDto },
		info,
	},
}) => ({
	logo: fileDto,
	company: info,
});

export default connect(
	mapStateToProps,
	{
		deleteCampaign,
		confirmModal,
		campaignSubmitForReview,
		approveInvestmentAsOwner,
		rejectInvestmentAsOwner,
		getCompanyLogo,
	},
)(withStyles(styles)(DashboardCampaignsTable));
