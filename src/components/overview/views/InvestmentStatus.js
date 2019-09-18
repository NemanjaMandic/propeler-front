// @flow

import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import {
	getCampaignMarketImage,
	uploadCampaignMarketImage,
	deleteCampaignMarketImage,
	getPlatformSettings,
} from '../../../state/campaign/actions';
import Tooltip from '../../common/tooltip/Tooltip';
import { openEditCampaignDialog, investDialog, confirmModal } from '../../../state/modals/actions';
import campaignCoverImage from '../../../images/campaign_cover.svg';
import UploadPhoto from '../../common/uploadPhoto/UploadPhoto';
import { ROLE_INDIVIDUAL_INVESTOR, ROLE_ENTREPRENEUR, ROLE_CORPORATE_INVESTOR } from '../../../constants/roles';
import { getDaysLeft } from '../../../utilities/campaignUtils';
import { states } from '../../../constants/campaignStates';

type PropsT = {
	toggleVisibility: Function,
	getCampaignMarketImage: Function,
	uploadCampaignMarketImage: Function,
	deleteCampaignMarketImage: Function,
	openEditCampaignDialog: Function,
	investDialog: Function,
	confirmModal: Function,
	getPlatformSettings: Function,
	platformCurrency: Object,
	editCampaign: {
		key?: string,
	},
	marketImage: {
		inProgress: boolean,
		fileDto: {
			file: string,
			type: string,
		},
	},
	campaign: {
		companyId: number,
		fundingGoals: number,
		marketImageUrl: string,
		maxEquityOffered: number,
		minEquityOffered: number,
		name: string,
		timeToRaiseFunds: number,
		urlFriendlyName: string,
		inProgress: boolean,
		minInvestment: number,
		collectedAmount: number,
		fundedPercentage: number,
		state: string,
		timeLeft: number,
	},
	role: string,
	preview: boolean,
	kycApproved: boolean,
	isOwner: boolean,
	investTooltip: string,
};

const InvestmentStatus = ({
	campaign,
	editCampaign: { key },
	toggleVisibility,
	getCampaignMarketImage,
	openEditCampaignDialog,
	confirmModal,
	getPlatformSettings,
	role,
	platformCurrency,
	uploadCampaignMarketImage,
	deleteCampaignMarketImage,
	marketImage: { fileDto, inProgress },
	preview,
	investDialog,
	kycApproved,
	isOwner,
	investTooltip,
}: PropsT) => {
	//We already have this helper function in campaignUtils?
	const editable =
		role === ROLE_ENTREPRENEUR && (campaign.state === states.INITIAL || campaign.state === states.REVIEW_READY);

	const [t] = useTranslation('translations');
	const { symbol } = platformCurrency;
	const disableInvestButton = !kycApproved && (role === ROLE_INDIVIDUAL_INVESTOR || role === ROLE_CORPORATE_INVESTOR);

	const openInvestmentDialog = () => {
		if (role === ROLE_INDIVIDUAL_INVESTOR || role === ROLE_CORPORATE_INVESTOR) {
			if (kycApproved) investDialog({ open: true, campaign });
		} else {
			confirmModal({
				open: true,
				title: t('ATTENTION'),
				subtitle: t('ATTENTION_INFO'),
				cancelLabel: t('OK'),
			});
		}
	};

	useEffect(() => {
		if (campaign.marketImageUrl) {
			getCampaignMarketImage(campaign.urlFriendlyName);
		}
	}, [campaign.marketImageUrl]);

	useEffect(() => {
		getPlatformSettings();
	}, []);

	function onScroll(isVisible) {
		toggleVisibility(isVisible);
	}

	const percentFunded = campaign.fundingGoals
		? Number(((campaign.collectedAmount || 0) * 100) / campaign.fundingGoals).toFixed(1)
		: 100;
	const campaignCover = fileDto.file ? `data:image/jpeg;base64,${fileDto.file}` : campaignCoverImage;

	return (
		<section className="overview-investment">
			{editable && !preview && (
				<Tooltip title={t('EDIT_SECTION')} placement="right">
					<IconButton
						className={`overview-investment--edit${key === 'basic' ? ' active-icon' : ''}`}
						onClick={() => openEditCampaignDialog('basic')}
					>
						<Edit />
					</IconButton>
				</Tooltip>
			)}
			<div className="overview-investment--hero">
				{editable && !preview ? (
					<UploadPhoto
						fileDto={fileDto}
						inProgress={inProgress}
						uploadPhoto={files =>
							uploadCampaignMarketImage({
								name: campaign.urlFriendlyName,
								files,
							})
						}
						name={'marketImage'}
						deletePhoto={() => deleteCampaignMarketImage(campaign.urlFriendlyName)}
						size={'md'}
					/>
				) : (
					<img src={campaignCover} alt="Market" />
				)}
			</div>
			<div className="overview-investment--card">
				<div>
					<h1>
						{campaign.collectedAmount || 0}
						{symbol}
					</h1>
					<p className="overview-investment--card_highlight">{t('INVESTED')}</p>
				</div>
				<div>
					<span className="overview-investment--card_highlight">{percentFunded}% </span>
					<span>{t('FUNDED')}</span>
				</div>
				<div
					style={{
						background: `-webkit-linear-gradient(left, #1ccd77 ${percentFunded}%, white 0)`,
					}}
					className="overview-investment--card-progress"
				/>
				<div>
					<p>
						{campaign.fundingGoals}
						{symbol}
					</p>
					<span>{t('TARGET')}</span>
				</div>
				<div>
					<p>{getDaysLeft(campaign)}</p>
					<span>{t('TIME_LEFT')}</span>
				</div>
				<div>
					<p>
						{campaign.minEquityOffered}% - {campaign.maxEquityOffered}%
					</p>
					<span>{t('EQUITY_OFFERED')}</span>
				</div>
				<VisibilitySensor onChange={onScroll} partialVisibility>
					<Fragment>
						{campaign.state !== states.SUCCESSFUL && !isOwner && (
							<Tooltip title={disableInvestButton ? investTooltip : ''} placement={'top'}>
								<button onClick={openInvestmentDialog} className={disableInvestButton ? 'disabled_invest_btn' : ''}>
									{t('INVEST_IN_THIS_OFFER')}
								</button>
							</Tooltip>
						)}
					</Fragment>
				</VisibilitySensor>
			</div>
		</section>
	);
};

const mapStateToProps = ({
	campaign: {
		marketImage,
		platformSettings: {
			settings: { platformCurrency },
		},
	},
	modals: { editCampaign },
	auth: {
		authentication: { role },
	},
}) => ({
	marketImage,
	editCampaign,
	platformCurrency,
	role,
});

export default connect(
	mapStateToProps,
	{
		getCampaignMarketImage,
		openEditCampaignDialog,
		getPlatformSettings,
		uploadCampaignMarketImage,
		deleteCampaignMarketImage,
		investDialog,
		confirmModal,
	},
)(InvestmentStatus);
