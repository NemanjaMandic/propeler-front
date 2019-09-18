import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core';
import Button from '../../../common/button/Button';
import { stylesPanel, stylesSummary } from '../../../user/dashboard/partials/DashboardCampaignsTable.styles';
import { getDaysLeft, renderInvestedPercent } from '../../../../utilities/campaignUtils';
import { history } from '../../../../store/configureStore';
import { states } from '../../../../constants/campaignStates';
import { auditCampaign, launchCampaign } from '../../../../state/admin/actions';
import { confirmModal } from '../../../../state/modals/actions';

import { getPlatformSettings } from '../../../../state/campaign/actions';

type PropsT = {
	logo: string,
	campaign: any,
	userId: number,
	addInvestor: Function,
	platformCurrency: Object,
	confirmModal: Function,
	auditCampaign: Function,
	launchCampaign: Function,
	getPlatformSettings: Function,
};

const ExpansionPanel = withStyles(stylesPanel)(MuiExpansionPanel);
const ExpansionPanelSummary = withStyles(stylesSummary)(MuiExpansionPanelSummary);

const CampaignTableRow = ({
	logo,
	campaign,
	userId,
	platformCurrency,
	confirmModal,
	auditCampaign,
	addInvestor,
	launchCampaign,
	getPlatformSettings,
}: PropsT) => {
	const [t] = useTranslation('translations');

	const { symbol } = platformCurrency;

	useEffect(() => {
		getPlatformSettings();
	}, []);

	const handlePanelButtonClick = (e, action, actionData) => {
		e.stopPropagation();
		action(actionData);
	};

	const goUrl = campaign => {
		history.push({
			pathname: `/overview/${campaign.urlFriendlyName}`,
		});
	};

	const assignConfirmation = row => {
		confirmModal({
			open: true,
			title: t('CAMPAIGN_ASSIGNING'),
			subtitle: t('ASSIGN_TEXT'),
			actionLabel: t('ASSIGN'),
			cancelLabel: t('CANCEL'),
			actionMethod: auditCampaign,
			actionParams: {
				data: {
					campaignUrlFriendlyName: row.urlFriendlyName,
					auditorId: userId,
				},
			},
			buttonClass: 'assign_button',
		});
	};

	const launchConfirmation = row => {
		confirmModal({
			open: true,
			title: t('CAMPAIGN_LAUNCHING'),
			subtitle: t('LAUNCH_TEXT'),
			actionLabel: t('LAUNCH'),
			cancelLabel: t('CANCEL'),
			actionMethod: launchCampaign,
			actionParams: { campaignName: row.urlFriendlyName },
			buttonClass: 'assign_button',
		});
	};

	//TODO: implement closing campaign modals
	const launchEndCampaign = row => {
		console.log(row);
	};

	const renderLastCell = row => {
		switch (row.state) {
			case states.REVIEW_READY:
				return (
					<Button
						variant={'outlined'}
						color={'primary'}
						className={'campaign_table_button assign'}
						name={t('ASSIGN')}
						onClick={() => assignConfirmation(row)}
					/>
				);
			case states.AUDIT:
				return (
					<Button
						variant={'outlined'}
						color={'primary'}
						className={'campaign_table_button single-btn'}
						name={t('REVIEW')}
						onClick={() =>
							history.push({
								pathname: `/overview/${row.urlFriendlyName}`,
							})
						}
					/>
				);
			case states.LAUNCH_READY:
				return (
					<Button
						variant={'outlined'}
						color={'primary'}
						className={'lauch_campaign_table_button single-btn'}
						name={t('LAUNCH_CAMPAIGN')}
						onClick={() => launchConfirmation(row)}
					/>
				);
			case states.ACTIVE:
				return (
					<div className={'campaign_buttons_wraper'}>
						<Button
							variant={'outlined'}
							color={'primary'}
							className={'investment_button wrapped'}
							name={t('ADD_INVESTMENT')}
							onClick={e => handlePanelButtonClick(e, addInvestor, campaign.urlFriendlyName)}
						/>
						<Button
							variant={'outlined'}
							color={'primary'}
							className={'lauch_campaign_table_button wrapped'}
							name={t('END_CAMPAIGN')}
							onClick={() => launchEndCampaign(row)}
						/>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<ExpansionPanel key={campaign.urlFriendlyName} expanded={false}>
			<ExpansionPanelSummary expandIcon={null} aria-controls="panel1c-content" id="panel1c-header">
				<div className="investor-dashboard-portfolio-table-row-first">
					<img alt={'logo'} className={'dashboard__image'} src={logo} />
					<Link component="button" onClick={() => goUrl(campaign)}>
						{campaign.name}
					</Link>
				</div>
				<div className="investor-dashboard-portfolio-table-row">
					<div className={'campaigns_table__text_wrap'}>
						{campaign.fundingGoals || 0}
						{symbol}
					</div>
				</div>
				<div className="investor-dashboard-portfolio-table-row">
					<Typography>
						{campaign.collectedAmount}
						{symbol}
					</Typography>
				</div>
				<div className="investor-dashboard-portfolio-table-row">
					<Typography>{getDaysLeft(campaign)}</Typography>
				</div>
				<div className="investor-dashboard-portfolio-table-row">
					<Typography>{campaign.pricePerShare ? `${campaign.pricePerShare}${symbol}` : 'x'}</Typography>
				</div>
				<div
					className="investor-dashboard-portfolio-table-row"
					style={campaign.state === states.INITIAL ? { width: '7%' } : {}}
				>
					<Typography>
						{campaign.minEquityOffered}% - {campaign.maxEquityOffered}%
					</Typography>
				</div>
				<div className="investor-dashboard-portfolio-table-row" style={{ paddingRight: 0, textAlign: 'right' }}>
					{renderLastCell(campaign)}
				</div>
			</ExpansionPanelSummary>
			<Divider />
		</ExpansionPanel>
	);
};

const mapStateToProps = state => {
	const {
		campaign: {
			platformSettings: {
				settings: { platformCurrency },
			},
		},
	} = state;

	return {
		platformCurrency,
	};
};
export default connect(
	mapStateToProps,
	{ confirmModal, auditCampaign, launchCampaign, getPlatformSettings },
)(CampaignTableRow);
