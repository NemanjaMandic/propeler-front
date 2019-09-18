import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Edit from '@material-ui/icons/Edit';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core';
import { stylesPanel, stylesSummary, stylesDetails } from './DashboardCampaignsTable.styles';
import { getDaysLeft, renderInvestedPercent } from '../../../../utilities/campaignUtils';
import { history } from '../../../../store/configureStore';
import Filter from '../../../common/filter/FilterComponent';
import { states } from '../../../../constants/campaignStates';
import {
	openUserPreviewDialog,
	openModalCampaignDocumentPreview,
	closeModalCampaignDocumentPreview,
} from '../../../../state/modals/actions';
import { generateEntrepreneurContract } from '../../../../state/documents/actions';
import { USER_DASHBOARD } from '../../../../constants/routes';
import dummyContract from '../../../../constants/dummyContract';
import { getDocumentSuccess, getDocument } from '../../../../state/campaign/actions';
import { getPlatformSettings } from '../../../../state/campaign/actions';

type PropsT = {
	logo: string,
	campaign: any,
	platformCurrency: any,
	deleteConfirmation: Function,
	campaignSubmitForReview: Function,
	investments: Array<any>,
	approveInvestmentAsOwner: Function,
	rejectInvestmentAsOwner: Function,
	confirmModal: Function,
	openUserPreviewDialog: Function,
	generateEntrepreneurContract: Function,
	openModalCampaignDocumentPreview: Function,
	closeModalCampaignDocumentPreview: Function,
	contract: any,
	urlFriendlyName: string,
	getPlatformSettings: Function,
	getDocumentSuccess: Function,
};

const ExpansionPanel = withStyles(stylesPanel)(MuiExpansionPanel);
const ExpansionPanelSummary = withStyles(stylesSummary)(MuiExpansionPanelSummary);
const ExpansionPanelDetails = withStyles(stylesDetails)(MuiExpansionPanelDetails);

const DashboardCampaignsTableRowExpandable = (props: PropsT) => {
	const [t] = useTranslation('translations');
	const {
		logo,
		campaign,
		deleteConfirmation,
		campaignSubmitForReview,
		investments,
		approveInvestmentAsOwner,
		rejectInvestmentAsOwner,
		platformCurrency,
		confirmModal,
		openUserPreviewDialog,
		getPlatformSettings,
		contract,
		urlFriendlyName,
		getDocumentSuccess,
	} = props;

	const { symbol } = platformCurrency;
	const filterOptions = [
		{ key: 'ALL', label: t('INVESTMET_STATE_ALL') },
		{ key: 'INITIAL', label: t('INVESTMET_STATE_PENDING') },
		{ key: 'PAID', label: t('INVESTMET_STATE_PAID') },
		{ key: 'OWNER_APPROVED', label: t('INVESTMET_STATE_APPROVED') },
		{ key: 'OWNER_REJECTED', label: t('INVESTMET_STATE_REJECTED') },
		{ key: 'REVOKED', label: t('INVESTMET_STATE_REVOKED') },
	];
	const [expanded, setExpanded] = useState(false);
	const [investmentsList, setInvestmentsList] = useState([]);
	const campaignState = campaign.state;
	const [investmentFilter, setInvestmentFilter] = useState(filterOptions[1]);

	const handleInvestorFilterChange = selectedFilter => {
		const inv =
			selectedFilter.key === 'ALL'
				? investments
				: investments.filter(item => item.investmentState === selectedFilter.key);
		setInvestmentsList(inv);
		setInvestmentFilter(selectedFilter);
	};

	useEffect(() => {
		// setExpanded(false);
		if (investments) {
			handleInvestorFilterChange(investmentFilter);
		}
	}, [campaignState, investments]);

	useEffect(() => {
		getPlatformSettings();
	}, []);

	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const goUrl = campaign => {
		history.push({
			pathname: `/overview/${campaign.urlFriendlyName}`,
		});
	};

	useEffect(() => {
		if (contract.success) {
			if (contract.signed) {
				props.campaignSubmitForReview(urlFriendlyName);
			} else {
				props.openModalCampaignDocumentPreview({
					title: t('INITIAL_AGREEMENT'),
					signAction: () => {
						props.campaignSubmitForReview(urlFriendlyName);
						props.closeModalCampaignDocumentPreview();
						history.push(USER_DASHBOARD);
					},
				});
			}
		}
	}, [contract.success]);

	const renderLastCell = row => {
		if (row.state === states.INITIAL || row.state === states.REVIEW_READY) {
			return (
				<div className={'campaigns_table__pending'} style={{ whiteSpace: 'nowrap' }}>
					<Link to={`/overview/${row.urlFriendlyName}`} onClick={() => goUrl(row)}>
						<IconButton>
							<Edit />
						</IconButton>
					</Link>
					<IconButton onClick={() => deleteConfirmation(row)}>
						<DeleteOutline />
					</IconButton>
					{row.state === states.INITIAL && (
						<Button
							variant={'outlined'}
							color={'primary'}
							className={'campaigns_table-approve-button'}
							onClick={props.generateEntrepreneurContract}
						>
							{t('SUBMIT_FOR_REVIEW')}
						</Button>
					)}
				</div>
			);
		} else if (row.state === states.AUDIT || row.state === states.LAUNCH_READY) {
			return null;
		}
		return (
			<Typography>
				<Link component="button" onClick={() => console.log('View statement')}>
					{t('VIEW_STATEMENT')}
				</Link>
			</Typography>
		);
	};

	const getStateLabel = investmentState => {
		const l = filterOptions.find(item => item.key === investmentState);
		return l ? l.label : '';
	};

	const investmentAcceptance = (investment, accepted) => {
		if (accepted) getDocumentSuccess({ type: 'pdf', file: dummyContract }); // to be removed
		confirmModal({
			open: true,
			title: accepted ? t('INVESTOR_ACCEPTANCE_TITLE') : t('INVESTOR_REJECTION_TITLE'),
			subtitle: t('INVESTOR_ACCEPTANCE_REJECTION_SUBTITLE'),
			actionLabel: accepted ? t('APPROVE') : t('REJECT'),
			cancelLabel: t('CANCEL'),
			actionMethod: accepted ? props.openModalCampaignDocumentPreview : rejectInvestmentAsOwner,
			actionParams: accepted
				? {
						title: t('INITIAL_AGREEMENT'),
						signAction: () => {
							approveInvestmentAsOwner({
								investmentId: investment.id,
								campaignId: campaign.id,
							});
							props.closeModalCampaignDocumentPreview();
						},
				  }
				: { investmentId: investment.id, campaignId: campaign.id },
			buttonClass: 'assign_button',
		});
	};

	const getActionControls = investment => {
		switch (investment.investmentState) {
			case 'INITIAL':
				return (
					<div className="investor-dashboard-portfolio-table-row" style={{ whiteSpace: 'nowrap', width: '26%' }}>
						<div style={{ float: 'right' }}>
							<Button
								variant={'outlined'}
								color={'primary'}
								className={'campaigns_table-reject-button'}
								onClick={() => investmentAcceptance(investment, false)}
							>
								{t('REJECT')}
							</Button>
							<Button
								variant={'outlined'}
								color={'primary'}
								className={'campaigns_table-approve-button'}
								onClick={() => investmentAcceptance(investment, true)}
							>
								{t('APPROVE')}
							</Button>
						</div>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<ExpansionPanel
			key={campaign.urlFriendlyName}
			expanded={campaignState === 'ACTIVE' && expanded === campaign.urlFriendlyName}
			onChange={handleChange(campaign.urlFriendlyName)}
		>
			<ExpansionPanelSummary
				expandIcon={campaignState === 'ACTIVE' ? <ExpandMoreIcon /> : null}
				aria-controls="panel1c-content"
				id="panel1c-header"
			>
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
						{symbol} {renderInvestedPercent(campaign)}
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
				<div
					className="investor-dashboard-portfolio-table-row"
					style={campaign.state === states.INITIAL ? { width: '7%' } : {}}
				>
					<Typography>
						{campaign.minEquityOffered}% - {campaign.maxEquityOffered}%
					</Typography>
				</div>
				<div className="investor-dashboard-portfolio-table-row">{renderLastCell(campaign)}</div>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<div style={{ width: '100%' }}>
					<div
						className={`investor-dashboard-portfolio-table-rows ${
							campaignState === 'ACTIVE' && expanded === campaign.urlFriendlyName
								? 'campaigns_table-subheading-expanded'
								: 'campaigns_table-subheading'
						}`}
					>
						<div className="investor-dashboard-portfolio-table-row-first investor-dashboard-portfolio-table-sub-title-first">
							{t('INVESTOR')}
						</div>
						<div className="investor-dashboard-portfolio-table-row" />
						<div className="investor-dashboard-portfolio-table-sub-title">{t('AMOUNT')}</div>
						<div className="investor-dashboard-portfolio-table-sub-title">{t('EQUITY_BOUGHT')}</div>
						<div className="investor-dashboard-portfolio-table-row" style={{ whiteSpace: 'nowrap' }}>
							<span className="investor-dashboard-portfolio-table-sub-title">{t('STATUS')}</span>
							<Filter action={handleInvestorFilterChange} options={filterOptions} initial={1} />
						</div>
						<div className="investor-dashboard-portfolio-table-row" />
						<div className="investor-dashboard-portfolio-table-row" />
						<Divider />
					</div>
					<div
						style={{
							paddingTop: campaignState === 'ACTIVE' && expanded === campaign.urlFriendlyName ? 40 : 0,
						}}
					>
						{campaignState === 'ACTIVE' &&
							investmentsList &&
							investmentsList.map(investment => (
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
									<div className="investor-dashboard-portfolio-table-row">{`${investment.equity}%`}</div>
									<div className="investor-dashboard-portfolio-table-row">
										{getStateLabel(investment.investmentState)}
									</div>
									{getActionControls(investment)}
								</div>
							))}
						{investmentsList && investmentsList.length === 0 && (
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
			campaignSubmitForReview: { contract },
			info: { urlFriendlyName },
		},
	} = state;

	return {
		platformCurrency,
		contract,
		urlFriendlyName,
	};
};
export default connect(
	mapStateToProps,
	{
		getPlatformSettings,
		openUserPreviewDialog,
		generateEntrepreneurContract,
		openModalCampaignDocumentPreview,
		closeModalCampaignDocumentPreview,
		getDocumentSuccess,
	},
)(DashboardCampaignsTableRowExpandable);
