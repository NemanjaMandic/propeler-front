import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core';
import {
	stylesPanel,
	stylesSummary,
	stylesDetails,
} from '../../../user/dashboard/partials/DashboardCampaignsTable.styles';
import { getDaysLeft, renderInvestedPercent } from '../../../../utilities/campaignUtils';
import { history } from '../../../../store/configureStore';
import { openUserPreviewDialog } from '../../../../state/modals/actions';
import { getPlatformSettings } from '../../../../state/campaign/actions';
import Button from '../../../common/button/Button';
import { states } from '../../../../constants/campaignStates';

type PropsT = {
	logo: string,
	campaign: any,
	platformCurrency: Object,
	investments: Array<any>,
	openUserPreviewDialog: Function,
	getPlatformSettings: Function,
	addInvestor: Function,
};

const ExpansionPanel = withStyles(stylesPanel)(MuiExpansionPanel);
const ExpansionPanelSummary = withStyles(stylesSummary)(MuiExpansionPanelSummary);
const ExpansionPanelDetails = withStyles(stylesDetails)(MuiExpansionPanelDetails);

const CampaignWithInvestmentRow = ({
	logo,
	campaign,
	investments,
	platformCurrency,
	openUserPreviewDialog,
	addInvestor,
	getPlatformSettings,
}: PropsT) => {
	const [t] = useTranslation('translations');
	const { symbol } = platformCurrency;

	useEffect(() => {
		getPlatformSettings();
	}, []);

	const [expanded, setExpanded] = useState(false);

	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const handlePanelButtonClick = (e, action, actionData) => {
		e.stopPropagation();
		action(...actionData);
	};

	//TODO: Implement campaign closing
	const handleEndCampaign = e => {
		e.stopPropagation();
		console.log('End campaign');
	};

	const goUrl = campaign => {
		history.push({
			pathname: `/overview/${campaign.urlFriendlyName}`,
		});
	};
	return (
		<ExpansionPanel
			key={campaign.urlFriendlyName}
			expanded={expanded === campaign.urlFriendlyName}
			onChange={handleChange(campaign.urlFriendlyName)}
		>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
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
						{renderInvestedPercent(campaign)}
					</Typography>
				</div>
				<div className="investor-dashboard-portfolio-table-row">
					<Typography>{getDaysLeft(campaign)}</Typography>
				</div>
				<div className="investor-dashboard-portfolio-table-row">
					<Typography>
						{campaign.pricePerShare}
						{symbol}
					</Typography>
				</div>
				<div className="investor-dashboard-portfolio-table-row">
					<Typography>
						{campaign.minEquityOffered}% - {campaign.maxEquityOffered}%
					</Typography>
				</div>
				<div
					style={{
						paddingRight: 42,
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'row',
					}}
				>
					{campaign.state === states.ACTIVE && (
						<div className={'campaign_buttons_wraper'}>
							<Button
								variant={'outlined'}
								color={'primary'}
								className={'investment_button wrapped'}
								name={t('Add investment')}
								onClick={e =>
									handlePanelButtonClick(e, addInvestor, [campaign.urlFriendlyName, campaign.minInvestment])
								}
							/>
							<Button
								variant={'outlined'}
								color={'primary'}
								className={'lauch_campaign_table_button wrapped'}
								name={t('END_CAMPAIGN')}
								onClick={e => handleEndCampaign(e)}
							/>
						</div>
					)}
				</div>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<div style={{ width: '100%' }}>
					<div
						className={`investor-dashboard-portfolio-table-rows ${
							expanded === campaign.urlFriendlyName
								? 'campaigns_table-subheading-expanded'
								: 'campaigns_table-subheading'
						}`}
					>
						<div className="investor-dashboard-portfolio-table-row-first investor-dashboard-portfolio-table-sub-title-first">
							{t('INVESTOR')}
						</div>
						<div className="investor-dashboard-portfolio-table-row" />
						<div className="investor-dashboard-portfolio-table-sub-title">{t('AMOUNT')}</div>
						<div className="investor-dashboard-portfolio-table-row" />
						<div className="investor-dashboard-portfolio-table-row" />
						<div className="investor-dashboard-portfolio-table-sub-title">{t('EQUITY_BOUGHT')}</div>
						<div className="investor-dashboard-portfolio-table-row" style={{ textAlign: 'right', paddingRight: 30 }}>
							<Link component="button" onClick={() => console.log('View statement')}>
								{t('VIEW_STATEMENT')}
							</Link>
						</div>
						<Divider />
					</div>
					<div
						style={{
							paddingTop: expanded === campaign.urlFriendlyName ? 40 : 0,
						}}
					>
						{investments &&
							investments.map(investment => (
								<div className="investor-dashboard-portfolio-table-rows-inner" key={investment.id}>
									<div className="investor-dashboard-portfolio-table-sub-row-first">
										<Link component="button" onClick={() => openUserPreviewDialog(investment.person)}>
											{investment.person.companyName ||
												`${investment.person.firstName} ${investment.person.lastName || ''}`}
										</Link>
									</div>
									<div className="investor-dashboard-portfolio-table-row" />
									<div className="investor-dashboard-portfolio-table-row">
										{`${investment.investedAmount}${symbol}`}
									</div>
									<div className="investor-dashboard-portfolio-table-row" />
									<div className="investor-dashboard-portfolio-table-row" />
									<div className="investor-dashboard-portfolio-table-row">{`${investment.equity}%`}</div>
									<div className="investor-dashboard-portfolio-table-row" />
								</div>
							))}
						{investments && investments.length === 0 && (
							<div
								style={{
									textAlign: 'center',
									marginTop: 'auto',
									marginBottom: 'auto',
									padding: 20,
								}}
							>
								{t('NO_INVESTORS')}
							</div>
						)}
					</div>
				</div>
			</ExpansionPanelDetails>
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
	{ openUserPreviewDialog, getPlatformSettings },
)(CampaignWithInvestmentRow);
