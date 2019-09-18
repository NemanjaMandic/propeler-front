// @flow

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Heading from './views/Heading';
import InvestmentStatus from './views/InvestmentStatus';
import CampaignInfo from './views/CampaignInfo';
import {
	getCampaignInfo,
	getCampaignDocuments,
	getAllCampaignUpdatesPageable,
	deleteCampaign,
	campaignSubmitForReview,
	getDocumentsRequestStatus,
} from '../../state/campaign/actions';
import { acceptCampaign, rejectCampaign } from '../../state/admin/actions';
import {
	investDialog,
	confirmModal,
	rejectionDialog,
	openModalCampaignDocumentPreview,
	closeModalCampaignDocumentPreview,
} from '../../state/modals/actions';
import PageNotFound from '../common/pageNotFound/PageNotFound';
import EditCampaignDialog from './modals/EditCampaignDialog';
import { ROLE_CORPORATE_INVESTOR, ROLE_ENTREPRENEUR, ROLE_INDIVIDUAL_INVESTOR } from '../../constants/roles';
import UpdatesDialog from './modals/UpdatesDialog';
import { getCompanyDocumentsOverview } from '../../state/company/actions';
import CampaignToolbar from './partials/CampaignToolbar';
import { isEditable, adminActionsAllowed } from '../../utilities/campaignUtils';
import { states } from '../../constants/campaignStates';
import { generateEntrepreneurContract } from '../../state/documents/actions';
import { history } from '../../store/configureStore';
import { USER_DASHBOARD } from '../../constants/routes';

type PropsT = {
	match: any,
	info: any,
	role: string,
	userId: number,
	deleteInProgress: boolean,
	submitInProgress: boolean,
	getCampaignInfo: Function,
	investDialog: Function,
	confirmModal: Function,
	getCampaignDocuments: Function,
	getCompanyDocumentsOverview: Function,
	getAllCampaignUpdatesPageable: Function,
	deleteCampaign: Function,
	campaignSubmitForReview: Function,
	rejectionDialog: Function,
	acceptCampaign: Function,
	rejectCampaign: Function,
	auditInProgress: boolean,
	getDocumentsRequestStatus: Function,
	openModalCampaignDocumentPreview: Function,
	generateEntrepreneurContract: Function,
	closeModalCampaignDocumentPreview: Function,
	contract: any,
	ownerId: number,
	kycCurrentUser: any,
};

const Overview = (props: PropsT) => {
	const {
		match: {
			params: { name },
		},
		location: { pathname },
		role,
		userId,
		info,
		deleteInProgress,
		submitInProgress,
		getCampaignInfo,
		investDialog,
		confirmModal,
		getCompanyDocumentsOverview,
		getCampaignDocuments,
		getAllCampaignUpdatesPageable,
		deleteCampaign,
		campaignSubmitForReview,
		rejectionDialog,
		acceptCampaign,
		rejectCampaign,
		auditInProgress,
		getDocumentsRequestStatus,
		requestForDocuments,
		kycCurrentUser,
		ownerId,
	} = props;

	useEffect(() => {
		if (name) {
			getCampaignInfo(name);
			getCampaignDocuments(name);
			if (role === ROLE_INDIVIDUAL_INVESTOR) getDocumentsRequestStatus(name);
			getAllCampaignUpdatesPageable({
				campaignName: name,
				pageNumber: 0,
				pageSize: 5,
			});

			if (info.companyId) getCompanyDocumentsOverview(info.companyId);
		}
	}, [info.companyId, requestForDocuments.result]);

	const [t] = useTranslation('translations');
	const kycApproved =
		kycCurrentUser && (kycCurrentUser.requestState === 'KYC_APPROVAL' || kycCurrentUser.requestState === 'APPROVED');

	const getTooltipText = () => {
		let text = '';
		if (kycCurrentUser && kycCurrentUser.requestState === 'PENDING') text = t('USER_KYC_PENDING');
		else text = t('USER_KYC');

		return text;
	};

	const openInvestmentDialog = () => {
		if (role === ROLE_INDIVIDUAL_INVESTOR || role === ROLE_CORPORATE_INVESTOR) {
			props.investDialog({ open: true, campaign: info });
		} else {
			confirmModal({
				open: true,
				title: t('ATTENTION'),
				subtitle: t('ATTENTION_INFO'),
				cancelLabel: t('OK'),
			});
		}
	};

	const deleteConfirmation = () => {
		confirmModal({
			open: true,
			title: t('CAMPAIGN_DELETION_REQUEST'),
			subtitle: t('CONFIRM_DELETE_CAMPAIGN'),
			actionLabel: t('DELETE'),
			cancelLabel: t('CANCEL'),
			actionMethod: deleteCampaign,
			actionParams: info.urlFriendlyName,
		});
	};

	const rejectConfirmation = () => {
		rejectionDialog({
			open: true,
			title: t('CAMPAIGN_REJECTION_TITLE'),
			fieldName: 'content',
			actionLabel: t('REJECT'),
			cancelLabel: t('CANCEL'),
			actionMethod: data => rejectCampaign({ auditId: info.auditId, data }),
		});
	};

	useEffect(() => {
		if (props.contract.success) {
			if (props.contract.signed) {
				props.campaignSubmitForReview(info.urlFriendlyName);
			} else {
				props.openModalCampaignDocumentPreview({
					title: t('INITIAL_AGREEMENT'),
					signAction: () => {
						props.campaignSubmitForReview(info.urlFriendlyName);
						props.closeModalCampaignDocumentPreview();
					},
				});
			}
		}
	}, [props.contract.success]);

	const renderToolbar = () => {
		if (isEditable(info, role, info.companyId)) {
			const text = info.state === states.INITIAL ? t('REQUIRE_APPROVAL') : t('CAMPAIGN_IS_SUBMITTED');
			const whiteButton =
				info.state === states.INITIAL
					? {
							name: t('SUBMIT_FOR_REVIEW'),
							action: props.generateEntrepreneurContract,
							disabled: submitInProgress,
					  }
					: null;
			return (
				<CampaignToolbar
					text={text}
					darkButton={{
						name: t('DELETE'),
						action: deleteConfirmation,
						disabled: deleteInProgress,
					}}
					whiteButton={whiteButton}
				/>
			);
		}
		if (adminActionsAllowed(info, role, userId)) {
			return (
				<CampaignToolbar
					text={t('REVIEW_CAMPAIGN_TEXT')}
					darkButton={{
						name: t('REJECT'),
						action: rejectConfirmation,
						disabled: auditInProgress,
					}}
					whiteButton={{
						name: t('ACCEPT'),
						action: () => acceptCampaign({ auditId: info.auditId }),
						disabled: auditInProgress,
					}}
				/>
			);
		}
		return null;
	};

	const [isInvestCtaVisible, toggleVisibility] = useState(true);
	return info.errors ? (
		<PageNotFound />
	) : (
		<section className="overview">
			{renderToolbar()}
			<Heading campaign={info} />
			<InvestmentStatus
				toggleVisibility={toggleVisibility}
				campaign={info}
				kycApproved={kycApproved}
				isOwner={userId === ownerId}
				investTooltip={getTooltipText()}
			/>
			<CampaignInfo
				campaign={info}
				isInvestCtaVisible={isInvestCtaVisible}
				openInvestmentDialog={openInvestmentDialog}
				role={role}
				isOwner={userId === ownerId}
				pathname={pathname}
				kycApproved={kycApproved}
				investTooltip={getTooltipText()}
			/>
			<EditCampaignDialog />
			<UpdatesDialog />
		</section>
	);
};

const mapStateToProps = ({
	campaign: { info, deleteCampaign, campaignSubmitForReview, requestForDocuments },
	auth: {
		authentication: { role, userId },
	},
	admin: { auditActions },
	company: {
		info: { ownerId },
	},
	user: {
		profile: { kycCurrentUser },
	},
}) => ({
	info,
	deleteInProgress: deleteCampaign.inProgress,
	submitInProgress: campaignSubmitForReview.inProgress,
	contract: campaignSubmitForReview.contract,
	auditInProgress: auditActions.inProgress,
	role,
	userId,
	requestForDocuments,
	kycCurrentUser,
	ownerId,
});

export default connect(
	mapStateToProps,
	{
		getCampaignInfo,
		investDialog,
		getCompanyDocumentsOverview,
		getCampaignDocuments,
		getAllCampaignUpdatesPageable,
		confirmModal,
		deleteCampaign,
		campaignSubmitForReview,
		rejectionDialog,
		acceptCampaign,
		rejectCampaign,
		getDocumentsRequestStatus,
		generateEntrepreneurContract,
		openModalCampaignDocumentPreview,
		closeModalCampaignDocumentPreview,
	},
)(Overview);
