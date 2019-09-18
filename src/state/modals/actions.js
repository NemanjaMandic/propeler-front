// @flow

import { createAction } from 'redux-actions';

export const OPEN_EDIT_CAMPAIGN_DIALOG = '[Modal] Open edit campaign dialog';
export const openEditCampaignDialog = createAction(OPEN_EDIT_CAMPAIGN_DIALOG);

export const CLOSE_EDIT_CAMPAIGN_DIALOG = '[Modal] Close edit campaign dialog';
export const closeEditCampaignDialog = createAction(CLOSE_EDIT_CAMPAIGN_DIALOG);

export const CONFIRM_MODAL = '[Modal] Confirm modal';
export const confirmModal = createAction(CONFIRM_MODAL);

export const INVEST_DIALOG = '[Modal] Invest dialog';
export const investDialog = createAction(INVEST_DIALOG);

export const OPEN_OFF_PLATFORM_DIALOG = '[Modal] Open off platform investment dialog';
export const openOffPlatformDialog = createAction(OPEN_OFF_PLATFORM_DIALOG);

export const CLOSE_OFF_PLATFORM_DIALOG = '[Modal] Close off platform investment dialog';
export const closeOffPlatformDialog = createAction(CLOSE_OFF_PLATFORM_DIALOG);

export const OFF_PLATFORM_INVESTMENT = `[Admin] Add off-platform investment`;
export const offPlatformInvestment = createAction(OFF_PLATFORM_INVESTMENT);

export const OFF_PLATFORM_INVESTMENT_SUCCESS = `${OFF_PLATFORM_INVESTMENT} success`;
export const offPlatformInvestmentSuccess = createAction(OFF_PLATFORM_INVESTMENT_SUCCESS);

export const OFF_PLATFORM_INVESTMENT_FAIL = `${OFF_PLATFORM_INVESTMENT} fail`;
export const offPlatformInvestmentFail = createAction(OFF_PLATFORM_INVESTMENT_FAIL);

export const OPEN_MODAL_CAMPAIGN_DOCUMENT_UPDATE = '[Modal] Open modal campaign document update.';
export const openModalCampaignDocumentUpdate = createAction(OPEN_MODAL_CAMPAIGN_DOCUMENT_UPDATE);

export const CLOSE_MODAL_CAMPAIGN_DOCUMENT_UPDATE = '[Modal] Close modal campaign document update.';
export const closeModalCampaignDocumentUpdate = createAction(CLOSE_MODAL_CAMPAIGN_DOCUMENT_UPDATE);

export const OPEN_MODAL_CAMPAIGN_DOCUMENT_PREVIEW = '[Modal] Open modal campaign document preview.';
export const openModalCampaignDocumentPreview = createAction(OPEN_MODAL_CAMPAIGN_DOCUMENT_PREVIEW);

export const CLOSE_MODAL_CAMPAIGN_DOCUMENT_PREVIEW = '[Modal] Close modal campaign document preview.';
export const closeModalCampaignDocumentPreview = createAction(CLOSE_MODAL_CAMPAIGN_DOCUMENT_PREVIEW);

export const OPEN_MODAL_CAMPAIGN_DOCUMENT = '[Modal] Open modal campaign document.';
export const openModalCampaignDocument = createAction(OPEN_MODAL_CAMPAIGN_DOCUMENT);

export const CLOSE_MODAL_CAMPAIGN_DOCUMENT = '[Modal] Close modal campaign document.';
export const closeModalCampaignDocument = createAction(CLOSE_MODAL_CAMPAIGN_DOCUMENT);

export const OPEN_UPDATES_DIALOG = '[Modal] Open updates dialog';
export const openUpdatesDialog = createAction(OPEN_UPDATES_DIALOG);

export const CLOSE_UPDATES_DIALOG = '[Modal] Close updates dialog';
export const closeUpdatesDialog = createAction(CLOSE_UPDATES_DIALOG);

export const REJECTION_DIALOG = '[Modal] Rejection dialog';
export const rejectionDialog = createAction(REJECTION_DIALOG);

export const OPEN_FUNDRAISING_APP_REVIEW = '[Modal] Open fundraising app review';
export const openFundraisingAppReview = createAction(OPEN_FUNDRAISING_APP_REVIEW);

export const CLOSE_FUNDRAISING_APP_REVIEW = '[Modal] Close fundraising app review';
export const closeFundraisingAppReview = createAction(CLOSE_FUNDRAISING_APP_REVIEW);

export const OPEN_KYC_INTERNAL_REVIEW = '[Modal] Open KYC Internal Review';
export const openKYCInternalReview = createAction(OPEN_KYC_INTERNAL_REVIEW);

export const CLOSE_KYC_INTERNAL_REVIEW = '[Modal] Close KYC Internal Review';
export const closeKYCInternalReview = createAction(CLOSE_KYC_INTERNAL_REVIEW);

export const OPEN_USER_PREVIEW_DIALOG = '[Modal] Open user preview dialog';
export const openUserPreviewDialog = createAction(OPEN_USER_PREVIEW_DIALOG);

export const CLOSE_USER_PREVIEW_DIALOG = '[Modal] Close user preview dialog';
export const closeUserPreviewDialog = createAction(CLOSE_USER_PREVIEW_DIALOG);

export const OPEN_PAYMENT_CONFIRM_DIALOG = '[Modal] Open payment confirmation dialog';
export const openPaymentConfirmDialog = createAction(OPEN_PAYMENT_CONFIRM_DIALOG);

export const CLOSE_PAYMENT_CONFIRM_DIALOG = '[Modal] Close payment confirmation dialog';
export const closePaymentConfirmDialog = createAction(CLOSE_PAYMENT_CONFIRM_DIALOG);

export const OPEN_DIGITAL_SIGNATURE_SETTUP_DIALOG = '[Modal] Open digital signature settup dialog';
export const openDigitalSignatureSettupDialog = createAction(OPEN_DIGITAL_SIGNATURE_SETTUP_DIALOG);

export const CLOSE_DIGITAL_SIGNATURE_SETTUP_DIALOG = '[Modal] Close digital signature settup dialog';
export const closeDigitalSignatureSettupDialog = createAction(CLOSE_DIGITAL_SIGNATURE_SETTUP_DIALOG);

export const ADD_SNACKBAR_OPTION = '[Modal] Add snackbar option';
export const addSnackbarOption = createAction(ADD_SNACKBAR_OPTION);

export const REMOVE_SNACKBAR_OPTION = '[Modal] Remove snackbar option';
export const removeSnackbarOption = createAction(REMOVE_SNACKBAR_OPTION);

export const OPEN_DOCUMENT_SIGNING_DIALOG = '[MODAL] Open Signing Document Dialog';
export const openDocumentSigningDialog = createAction(OPEN_DOCUMENT_SIGNING_DIALOG);

export const CLOSE_DOCUMENT_SIGNING_DIALOG = '[MODAL] Close Signing Document Dialog';
export const closeDocumentSigningDialog = createAction(CLOSE_DOCUMENT_SIGNING_DIALOG);

export const GET_USER_PREVIEW_PHOTO = '[Modal] Get investor dialog photo';
export const getUserPreviewPhoto = createAction(GET_USER_PREVIEW_PHOTO);

export const GET_USER_PREVIEW_PHOTO_SUCCESS = `${GET_USER_PREVIEW_PHOTO} success`;
export const getUserPreviewPhotoSuccess = createAction(GET_USER_PREVIEW_PHOTO_SUCCESS);

export const GET_USER_PREVIEW_PHOTO_FAIL = `${GET_USER_PREVIEW_PHOTO} fail`;
export const getUserPreviewPhotoFail = createAction(GET_USER_PREVIEW_PHOTO_FAIL);
//
export const OPEN_CLOSE_CAMPAIGN_DIALOG = '[Modal] Open close campaign dialog';
export const openCloseCampaignDialog = createAction(OPEN_CLOSE_CAMPAIGN_DIALOG);

export const CLOSE_CLOSE_CAMPAIGN_DIALOG = '[Modal] Close close campaign dialog';
export const closeCloseCampaignDialog = createAction(CLOSE_CLOSE_CAMPAIGN_DIALOG);
