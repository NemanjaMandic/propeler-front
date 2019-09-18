// @flow

import initialState from './initialState';
import * as actions from './actions';
import {
	INVEST_IN_CAMPAIGN,
	INVEST_IN_CAMPAIGN_SUCCESS,
	INVEST_IN_CAMPAIGN_FAIL,
	AVAILABLE_INVESTMENT_SUCCESS,
} from '../investor/actions';

type ActionT = {
	type: string,
	payload: any,
};

export default (state: * = initialState(), action: ActionT) => {
	const { type, payload } = action;

	switch (type) {
		case actions.OPEN_EDIT_CAMPAIGN_DIALOG:
			return {
				...state,
				editCampaign: {
					...state.editCampaign,
					open: true,
					key: payload,
				},
			};
		case actions.CLOSE_EDIT_CAMPAIGN_DIALOG:
			return {
				...state,
				editCampaign: {
					...state.editCampaign,
					open: false,
					key: '',
				},
			};
		case actions.CONFIRM_MODAL:
			return {
				...state,
				confirmModal: {
					...state.confirmModal,
					...payload,
				},
			};
		case actions.INVEST_DIALOG:
			return {
				...state,
				investDialog: {
					...state.investDialog,
					...payload,
				},
			};
		case actions.OPEN_MODAL_CAMPAIGN_DOCUMENT_UPDATE:
			return {
				...state,
				updateDocumentDialog: {
					...state.updateDocumentDialog,
					open: true,
					...payload,
				},
			};
		case actions.CLOSE_MODAL_CAMPAIGN_DOCUMENT_UPDATE:
			return {
				...state,
				updateDocumentDialog: initialState().updateDocumentDialog,
			};
		case actions.CLOSE_MODAL_CAMPAIGN_DOCUMENT_PREVIEW:
			return {
				...state,
				documentPreview: initialState().documentPreview,
			};
		case actions.OPEN_MODAL_CAMPAIGN_DOCUMENT_PREVIEW:
			return {
				...state,
				documentPreview: {
					...state.documentPreview,
					...payload,
					open: true,
				},
			};
		case actions.OPEN_MODAL_CAMPAIGN_DOCUMENT:
			return {
				...state,
				submitDocumentDialog: {
					...state.submitDocumentDialog,
					...payload,
				},
			};
		case actions.CLOSE_MODAL_CAMPAIGN_DOCUMENT:
			return {
				...state,
				submitDocumentDialog: initialState().submitDocumentDialog,
			};
		case INVEST_IN_CAMPAIGN:
			return {
				...state,
				investDialog: { ...state.investDialog, inProgress: true },
			};
		case INVEST_IN_CAMPAIGN_SUCCESS:
			return {
				...state,
				investDialog: { ...state.investDialog, inProgress: false, open: false },
			};
		case INVEST_IN_CAMPAIGN_FAIL:
			return {
				...state,
				investDialog: { ...state.investDialog, inProgress: false },
			};
		case AVAILABLE_INVESTMENT_SUCCESS:
			return {
				...state,
				investDialog: { ...state.investDialog, availableInvestment: payload },
			};
		case actions.OPEN_UPDATES_DIALOG:
			return {
				...state,
				updatesDialog: {
					...state.updatesDialog,
					open: true,
					create: payload.create,
					update: payload.update ? payload.update : initialState().updatesDialog.update,
				},
			};
		case actions.CLOSE_UPDATES_DIALOG:
			return {
				...state,
				updatesDialog: initialState().updatesDialog,
			};
		case actions.REJECTION_DIALOG:
			return {
				...state,
				rejectionDialog: {
					...state.rejectionDialog,
					...payload,
				},
			};
		case actions.OPEN_FUNDRAISING_APP_REVIEW:
			return {
				...state,
				fundraisingAppReview: {
					...state.fundraisingAppReview,
					open: true,
					review: payload.review,
					viewOnly: payload.viewOnly,
				},
			};
		case actions.CLOSE_FUNDRAISING_APP_REVIEW:
			return {
				...state,
				fundraisingAppReview: initialState().fundraisingAppReview,
			};

		case actions.OPEN_KYC_INTERNAL_REVIEW:
			return {
				...state,
				kycInternalReview: {
					...state.kycInternalReview,
					open: true,
					review: payload.review,
					viewOnly: payload.viewOnly,
					role: payload.role,
					status: payload.status,
					page: payload.page,
				},
			};
		case actions.CLOSE_KYC_INTERNAL_REVIEW:
			return {
				...state,
				kycInternalReview: initialState().kycInternalReview,
			};
		case actions.OPEN_OFF_PLATFORM_DIALOG:
			return {
				...state,
				offPlatformInvestment: {
					...state.offPlatformInvestment,
					...payload,
					open: true,
				},
			};
		case actions.CLOSE_OFF_PLATFORM_DIALOG:
		case actions.OFF_PLATFORM_INVESTMENT_SUCCESS:
			return {
				...state,
				offPlatformInvestment: initialState().offPlatformInvestment,
			};
		case actions.OFF_PLATFORM_INVESTMENT:
			return {
				...state,
				offPlatformInvestment: {
					...state.offPlatformInvestment,
					inProgress: true,
				},
			};
		case actions.OFF_PLATFORM_INVESTMENT_FAIL:
			return {
				...state,
				offPlatformInvestment: {
					...state.offPlatformInvestment,
					inProgress: false,
				},
			};
		case actions.OPEN_USER_PREVIEW_DIALOG:
			return {
				...state,
				userPreviewDialog: {
					...state.userPreviewDialog,
					open: true,
					user: payload,
				},
			};

		case actions.OPEN_DOCUMENT_SIGNING_DIALOG: {
			const { document, signAction } = payload;
			return {
				...state,
				documentSigningDialog: {
					...state.documentSigningDialog,
					open: true,
					signedDocument: undefined,
					document,
					signAction,
				},
			};
		}
		case actions.CLOSE_DOCUMENT_SIGNING_DIALOG:
			return {
				...state,
				documentSigningDialog: {
					...state.documentSigningDialog,
					open: false,
					document: undefined,
				},
			};

		case actions.CLOSE_USER_PREVIEW_DIALOG:
			return {
				...state,
				userPreviewDialog: initialState().userPreviewDialog,
			};
		case actions.OPEN_PAYMENT_CONFIRM_DIALOG:
			return {
				...state,
				paymentConfirmationDialog: {
					...state.paymentConfirmationDialog,
					...payload,
				},
			};
		case actions.CLOSE_PAYMENT_CONFIRM_DIALOG:
			return {
				...state,
				paymentConfirmationDialog: initialState().paymentConfirmationDialog,
			};
		case actions.OPEN_DIGITAL_SIGNATURE_SETTUP_DIALOG:
			return {
				...state,
				digitalSignatureSettupDialog: {
					...state.digitalSignatureSettupDialog,
					open: true,
				},
			};
		case actions.CLOSE_DIGITAL_SIGNATURE_SETTUP_DIALOG:
			return {
				...state,
				digitalSignatureSettupDialog: {
					...state.digitalSignatureSettupDialog,
					open: false,
				},
			};
		case actions.ADD_SNACKBAR_OPTION:
			return {
				...state,
				snackbar: {
					...state.snackbar,
					[payload.key]: payload.content,
				},
			};
		case actions.REMOVE_SNACKBAR_OPTION: {
			const newState = { ...state };
			delete newState.snackbar[payload.key];
			return state;
		}
		case actions.GET_USER_PREVIEW_PHOTO:
			return {
				...state,
				userPreviewDialog: {
					...state.userPreviewDialog,
					loadingPhoto: true,
				},
			};
		case actions.GET_USER_PREVIEW_PHOTO_SUCCESS:
			return {
				...state,
				userPreviewDialog: {
					...state.userPreviewDialog,
					loadingPhoto: false,
					user: {
						...state.userPreviewDialog.user,
						photo: payload.file,
					},
				},
			};
		case actions.GET_USER_PREVIEW_PHOTO_FAIL:
			return {
				...state,
				userPreviewDialog: {
					...state.userPreviewDialog,
					loadingPhoto: false,
				},
			};
		case actions.OPEN_CLOSE_CAMPAIGN_DIALOG:
			return {
				...state,
				closeCampaignDialog: {
					...state.closeCampaignDialog,
					open: true,
					campaign: payload,
				},
			};
		case actions.CLOSE_CLOSE_CAMPAIGN_DIALOG:
			return {
				...state,
				closeCampaignDialog: initialState().closeCampaignDialog,
			};
		default:
			return state;
	}
};
