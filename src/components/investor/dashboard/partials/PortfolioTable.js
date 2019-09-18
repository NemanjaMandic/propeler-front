import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import { withStyles, Typography, Link, Divider } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
	confirmModal,
	openModalCampaignDocumentPreview,
	closeModalCampaignDocumentPreview,
} from '../../../../state/modals/actions';

import { getPlatformSettings } from '../../../../state/campaign/actions';
import companyAvatarImage from '../../../../images/company_avatar.svg';
import { history } from '../../../../store/configureStore';
import { styles, stylesSummary, stylesDetails, stylesActions } from './PortfolioTable.styles';
import Pagination from '../../../common/pagination/Pagination';
import { getInvestorPortfolio, revokeInvestment } from '../../../../state/investor/actions';
import { getPaymentInvoice, getPaymentMethods, getBankTransfer } from '../../../../state/payment/actions';
import * as investmentStates from '../../../../constants/investmentStates';
import { getDaysLeft, renderInvestedPercent } from '../../../../utilities/campaignUtils';
import Button from '../../../common/button/Button';
import { INVESTOR_PAYMENT } from '../../../../constants/routes';
import dummyContract from '../../../../constants/dummyContract';
import { getDocumentSuccess, getDocument } from '../../../../state/campaign/actions';

type PropsT = {
	heading: Array<string>,
	data: Array<Object>,
	campaignState?: string,
	platformCurrency: Object,
	confirmModal: Function,
	getInvestorPortfolio: Function,
	getPlatformSettings: Function,
	getPaymentInvoice: Function,
	revokeInvestment: Function,
	payment: any,
	content: any,
	logo: {
		file: string,
		type: string,
	},
};

const ExpansionPanel = withStyles(styles)(MuiExpansionPanel);
const ExpansionPanelSummary = withStyles(stylesSummary)(MuiExpansionPanelSummary);
const ExpansionPanelDetails = withStyles(stylesDetails)(MuiExpansionPanelDetails);
const ExpansionPanelActions = withStyles(stylesActions)(MuiExpansionPanelActions);

const renderRevoke = ({ investmentState, paymentDate }) => {
	switch (investmentState) {
		case investmentStates.INITIAL:
			return true;
		case investmentStates.PAID:
			const timePassed = moment().diff(moment(paymentDate), 'days');
			return timePassed < 7;
		default:
			return false;
	}
};

const isInTotal = ({ investmentState }) =>
	investmentState === investmentStates.PAID || investmentState === investmentStates.AUDIT_APPROVED;
const isInvalid = ({ investmentState }) =>
	investmentState === investmentStates.REVOKED ||
	investmentState === investmentStates.OWNER_REJECTED ||
	investmentState === investmentStates.AUDIT_REJECTED;

const PortfolioTable = ({
	heading,
	data,
	campaignState,
	platformCurrency,
	confirmModal,
	getInvestorPortfolio,
	revokeInvestment,
	getPlatformSettings,
	logo,
	openModalCampaignDocumentPreview,
	closeModalCampaignDocumentPreview,
	getDocumentSuccess,
	getPaymentInvoice,
}: PropsT) => {
	const [t] = useTranslation('translations');

	const revokeConfirmation = (urlFriendlyName, investment) => {
		confirmModal({
			open: true,
			title: t('REVOKE_INVESTMENT'),
			subtitle: t('THIS_OPERATION_CANNOT_BE_UNDONE'),
			actionLabel: t('REVOKE'),
			cancelLabel: t('CANCEL'),
			actionMethod: revokeInvestment,
			actionParams: { urlFriendlyName, investment },
		});
	};

	const [expanded, setExpanded] = useState(false);

	useEffect(() => {
		setExpanded(false);
		getPlatformSettings();
	}, [campaignState]);

	useEffect(() => {}, []);
	const { symbol } = platformCurrency;

	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const signAndPay = investment => {
		getDocumentSuccess({ type: 'pdf', file: dummyContract });
		openModalCampaignDocumentPreview({
			title: t('INITIAL_AGREEMENT'),
			signAction: () => {
				closeModalCampaignDocumentPreview();
				history.push(`/investor/payment/${investment.id}`);
			},
		});
	};

	const getLogo = f => {
		return f ? `data:image/jpeg;base64,${f}` : companyAvatarImage;
	};

	return (
		<div>
			<div className="investor-dashboard-portfolio-table-rows">
				{heading.map((h, index) => (
					<div
						key={h}
						className={
							index === 0
								? 'investor-dashboard-portfolio-table-title-first'
								: 'investor-dashboard-portfolio-table-title'
						}
					>
						{t(h)}
					</div>
				))}
			</div>

			{data.content.map(({ campaign, investments, total }) => (
				<ExpansionPanel
					key={campaign.urlFriendlyName}
					expanded={expanded === campaign.urlFriendlyName}
					onChange={handleChange(campaign.urlFriendlyName)}
				>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
						<div className="investor-dashboard-portfolio-table-row-first">
							<img alt={'logo'} className={'dashboard__image'} src={getLogo(campaign.logoImage)} />
							<Link
								component="button"
								onClick={() =>
									history.push({
										pathname: `/overview/${campaign.urlFriendlyName}`,
									})
								}
							>
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
								{campaign.minEquityOffered}% - {campaign.maxEquityOffered}%
							</Typography>
						</div>
						<div className="investor-dashboard-portfolio-table-row">
							<Typography>
								{campaign.pricePerShare}
								{symbol}
							</Typography>
						</div>
						<div className="investor-dashboard-portfolio-table-row">
							<Typography>
								<Link component="button" onClick={() => console.log('View statement')}>
									{t('VIEW_STATEMENT')}
								</Link>
							</Typography>
						</div>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<div style={{ width: '100%' }}>
							<div className="investor-dashboard-portfolio-table-rows">
								<div className="investor-dashboard-portfolio-table-row-first" />
								<div className="investor-dashboard-portfolio-table-row" />
								<div className="investor-dashboard-portfolio-table-sub-title">{t('MY_INVESTMENT')}</div>
								<div className="investor-dashboard-portfolio-table-row" />
								<div className="investor-dashboard-portfolio-table-sub-title">{t('MY_EQUITY')}</div>
								<div className="investor-dashboard-portfolio-table-row" />
								<div className="investor-dashboard-portfolio-table-row" />
							</div>
							<Divider />
							{investments.map(investment => (
								<div className="investor-dashboard-portfolio-table-rows-inner" key={investment.id}>
									<div className="investor-dashboard-portfolio-table-row-first" />
									<div className="investor-dashboard-portfolio-table-row" />
									<div
										className={`investor-dashboard-portfolio-table-row double ${
											isInTotal(investment) ? 'green' : isInvalid(investment) ? 'red' : ''
										}`}
									>
										{`${investment.investedAmount}${symbol} `}
										<span>{t(`INVESTMENT_STATE_LABELS.${investment.investmentState}`)}</span>
									</div>
									<div className="investor-dashboard-portfolio-table-row">{`${investment.equity}%`}</div>
									<div className="investor-dashboard-portfolio-table-row double" style={{ textAlign: 'right' }}>
										{investment.investmentState === investmentStates.OWNER_APPROVED && (
											<Button
												name={t('PAY')}
												color={'primary'}
												className={'expand_table_button_pay'}
												onClick={() => signAndPay(investment)}
											/>
										)}

										{investment.investmentState === investmentStates.AUDIT_APPROVED && (
											<>
												<span className={'upload__link'} onClick={() => getPaymentInvoice(investment.id)}>
													View Invoice
												</span>
											</>
										)}

										{investment.investmentState === investmentStates.INITIAL &&
											(renderRevoke(investment) && (
												<Button
													name={t('REVOKE')}
													variant={'outlined'}
													color={'primary'}
													className={'expand_table_button'}
													onClick={() => revokeConfirmation(campaign.urlFriendlyName, investment)}
												/>
											))}
									</div>
								</div>
							))}
						</div>
					</ExpansionPanelDetails>
					<Divider />
					<ExpansionPanelActions>
						<div className="investor-dashboard-portfolio-table-gray-txt">{t('TOTAL_PAID')}</div>
						<div className="investor-dashboard-portfolio-table-row" />
						<div className="investor-dashboard-portfolio-table-row">{`${total.amount}${symbol} `}</div>
						<div className="investor-dashboard-portfolio-table-row" />
						<div className="investor-dashboard-portfolio-table-row">{`${total.equity}%`}</div>
						<div className="investor-dashboard-portfolio-table-row" />
						<div className="investor-dashboard-portfolio-table-row" />
					</ExpansionPanelActions>
				</ExpansionPanel>
			))}
			<Pagination
				currentPage={data.number}
				totalPages={data.totalPages}
				first={data.first}
				last={data.last}
				next={getInvestorPortfolio}
				previous={getInvestorPortfolio}
				actionParams={{ filter: campaignState }}
			/>
		</div>
	);
};

const mapStateToProps = ({
	company: {
		logo: { fileDto },
	},
	campaign: {
		platformSettings: {
			settings: { platformCurrency },
		},
	},
	investor: {
		portfolio: { content },
	},
}) => ({
	logo: fileDto,
	platformCurrency,
	content,
});

export default connect(
	mapStateToProps,
	{
		confirmModal,
		getInvestorPortfolio,
		revokeInvestment,
		getPlatformSettings,
		openModalCampaignDocumentPreview,
		closeModalCampaignDocumentPreview,
		getDocumentSuccess,
		getPaymentInvoice,
		getPaymentMethods,
		getBankTransfer,
	},
)(PortfolioTable);
