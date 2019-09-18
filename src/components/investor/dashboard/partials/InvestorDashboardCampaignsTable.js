import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import styles from './InvestorDashboardCampaignsTable.styles';
import { getAllCampaigns, getPlatformSettings } from '../../../../state/campaign/actions';
import { investDialog } from '../../../../state/modals/actions';
import companyAvatarImage from '../../../../images/company_avatar.svg';
import { history } from '../../../../store/configureStore';
import Pagination from '../../../common/pagination/Pagination';
import { getDaysLeft, renderInvestedPercent } from '../../../../utilities/campaignUtils';
import { states } from '../../../../constants/campaignStates';
import { ROLE_CORPORATE_INVESTOR, ROLE_INDIVIDUAL_INVESTOR } from '../../../../constants/roles';
import Tooltip from '../../../common/tooltip/Tooltip';

type PropsT = {
	classes: any,
	heading: Array<string>,
	platformCurrency: Object,
	campaigns: {
		content: Array<Object>,
		numberOfElements: number,
	},
	campaignState?: string,
	getAllCampaigns: Function,
	investDialog: Function,
	getPlatformSettings: Function,
	logo: {
		file: string,
		type: string,
	},
	kycCurrentUser: any,
	role: any,
};

const InvestorDashboardCampaignsTable = (props: PropsT) => {
	const {
		classes,
		heading,
		campaigns,
		campaignState,
		getAllCampaigns,
		getPlatformSettings,
		investDialog,
		platformCurrency,
		kycCurrentUser,
		role,
	} = props;

	const [t] = useTranslation('translations');
	const { symbol } = platformCurrency;

	useEffect(() => {
		getAllCampaigns({ filter: campaignState, size: 5 });
		getPlatformSettings();
	}, []);

	const kycApproved =
		kycCurrentUser && (kycCurrentUser.requestState === 'KYC_APPROVAL' || kycCurrentUser.requestState === 'APPROVED');
	const disableInvestButton = !kycApproved && (role === ROLE_INDIVIDUAL_INVESTOR || role === ROLE_CORPORATE_INVESTOR);

	const getTooltipText = () => {
		let text = '';
		if (kycCurrentUser && kycCurrentUser.requestState === 'PENDING') text = t('USER_KYC_PENDING');
		else text = t('USER_KYC');

		return text;
	};

	const companyAvatar = campaign =>
		campaign.logoImage ? `data:image/jpeg;base64,${campaign.logoImage}` : companyAvatarImage;

	return campaigns.numberOfElements > 0 ? (
		<Fragment>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						{heading.map(h => (
							<TableCell key={h} className={classes.tableCellHead}>
								{t(h)}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{campaigns.content.map(row => (
						<TableRow key={row.name}>
							<TableCell className={`${classes.tableCell} ${classes.tableCellLight}`}>
								<img alt={'logo'} className={'dashboard__image'} src={companyAvatar(row)} />
								<div
									className={'campaigns_table__text_wrap'}
									onClick={() =>
										history.push({
											pathname: `/overview/${row.urlFriendlyName}`,
										})
									}
								>
									{row.name}
								</div>
							</TableCell>
							<TableCell className={classes.tableCell}>{getDaysLeft(row)}</TableCell>
							<TableCell className={classes.tableCell}>
								<div className={'campaigns_table__text_wrap'}>
									{row.collectedAmount || 0}
									{symbol} {renderInvestedPercent(row)}
								</div>
							</TableCell>
							<TableCell className={classes.tableCell}>
								{row.fundingGoals}
								{symbol}
							</TableCell>
							<TableCell className={classes.tableCell}>
								{row.minEquityOffered}% - {row.maxEquityOffered}%
							</TableCell>
							<TableCell
								className={`${classes.tableCell} ${
									row.state === states.COMPLETED ? classes.tableCellNotAllowed : classes.tableCellPointer
								} ${classes.tableCellLight}`}
							>
								{row.state !== states.COMPLETED && (
									<Tooltip title={disableInvestButton ? getTooltipText() : ''} placement={'top'}>
										<Button
											className={
												disableInvestButton
													? 'investor-dashboard-campaigns-disabled-button'
													: 'investor-dashboard-campaigns-button'
											}
											onClick={() => (!disableInvestButton ? investDialog({ open: true, campaign: row }) : {})}
											disabled={row.state === states.COMPLETED}
										>
											{t('INVEST_IN_THIS_OFFER')}
										</Button>
									</Tooltip>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Pagination
				currentPage={campaigns.number}
				totalPages={campaigns.totalPages}
				first={campaigns.first}
				last={campaigns.last}
				next={getAllCampaigns}
				previous={getAllCampaigns}
				actionParams={{ filter: campaignState }}
			/>
		</Fragment>
	) : (
		<div className="campaigns-cards--empty-data">{t('THERE_ARENT_ANY_CAMPAIGNS')}</div>
	);
};

const mapStateToProps = ({
	campaign: {
		getAllCampaigns: { campaigns },
	},
	campaign: {
		platformSettings: {
			settings: { platformCurrency },
		},
	},
	user: {
		profile: { kycCurrentUser },
	},
	auth: {
		authentication: { role },
	},
}) => ({
	campaigns,
	platformCurrency,
	role,
});

export default connect(
	mapStateToProps,
	{ getAllCampaigns, investDialog, getPlatformSettings },
)(withStyles(styles)(InvestorDashboardCampaignsTable));
