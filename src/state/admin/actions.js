import { createAction } from 'redux-actions';

export const AUDIT_CAMPAIGN = '[Admin] Audit campaign';
export const auditCampaign = createAction(AUDIT_CAMPAIGN);

export const AUDIT_CAMPAIGN_SUCCESS = `${AUDIT_CAMPAIGN} success`;
export const auditCampaignSuccess = createAction(AUDIT_CAMPAIGN_SUCCESS);

export const AUDIT_CAMPAIGN_FAIL = `${AUDIT_CAMPAIGN} fail`;
export const auditCampaignFail = createAction(AUDIT_CAMPAIGN_FAIL);

export const GET_CAMPAIGNS_BY_STATE = '[Admin] Get campaigns by state';
export const getCampaignsByState = createAction(GET_CAMPAIGNS_BY_STATE);

export const GET_CAMPAIGNS_BY_STATE_SUCCESS = `${GET_CAMPAIGNS_BY_STATE} success`;
export const getCampaignsByStateSuccess = createAction(GET_CAMPAIGNS_BY_STATE_SUCCESS);

export const GET_CAMPAIGNS_BY_STATE_FAIL = `${GET_CAMPAIGNS_BY_STATE} fail`;
export const getCampaignsByStateFail = createAction(GET_CAMPAIGNS_BY_STATE_FAIL);

export const ACCEPT_CAMPAIGN = '[Admin] Accept campaign';
export const acceptCampaign = createAction(ACCEPT_CAMPAIGN);

export const ACCEPT_CAMPAIGN_SUCCESS = `${ACCEPT_CAMPAIGN} success`;
export const acceptCampaignSuccess = createAction(ACCEPT_CAMPAIGN_SUCCESS);

export const ACCEPT_CAMPAIGN_FAIL = `${ACCEPT_CAMPAIGN} fail`;
export const acceptCampaignFail = createAction(ACCEPT_CAMPAIGN_FAIL);

export const REJECT_CAMPAIGN = '[Admin] Reject campaign';
export const rejectCampaign = createAction(REJECT_CAMPAIGN);

export const REJECT_CAMPAIGN_SUCCESS = `${REJECT_CAMPAIGN} success`;
export const rejectCampaignSuccess = createAction(REJECT_CAMPAIGN_SUCCESS);

export const REJECT_CAMPAIGN_FAIL = `${REJECT_CAMPAIGN} fail`;
export const rejectCampaignFail = createAction(REJECT_CAMPAIGN_FAIL);

export const GET_FUNDRISING_APPLICATIONS = '[Admin] Get fundirsing applications';
export const getFundrisingApplications = createAction(GET_FUNDRISING_APPLICATIONS);

export const GET_FUNDRISING_APPLICATIONS_SUCCESS = `${GET_FUNDRISING_APPLICATIONS} success`;
export const getFundrisingApplicationsSuccess = createAction(GET_FUNDRISING_APPLICATIONS_SUCCESS);

export const GET_FUNDRISING_APPLICATIONS_FAIL = `${GET_FUNDRISING_APPLICATIONS} fail`;
export const getFundrisingApplicationsFail = createAction(GET_FUNDRISING_APPLICATIONS_FAIL);

export const GET_FUNDRISING_APPLICATIONS_DOCUMENTS = '[Admin] Get fundirsing applications documents';
export const getFundrisingApplicationsDocuments = createAction(GET_FUNDRISING_APPLICATIONS_DOCUMENTS);

export const GET_FUNDRISING_APPLICATIONS_DOCUMENTS_SUCCESS = `${GET_FUNDRISING_APPLICATIONS_DOCUMENTS} success`;
export const getFundrisingApplicationsDocumentsSuccess = createAction(GET_FUNDRISING_APPLICATIONS_DOCUMENTS_SUCCESS);

export const GET_FUNDRISING_APPLICATIONS_DOCUMENTS_FAIL = `${GET_FUNDRISING_APPLICATIONS_DOCUMENTS} fail`;
export const getFundrisingApplicationsDocumentsFail = createAction(GET_FUNDRISING_APPLICATIONS_DOCUMENTS_FAIL);

//

export const GET_USER_KYC = '[Admin] Get user KYC';
export const getUserKYC = createAction(GET_USER_KYC);

export const GET_USER_KYC_SUCCESS = `${GET_USER_KYC} success`;
export const getUserKYCSuccess = createAction(GET_USER_KYC_SUCCESS);

export const GET_USER_KYC_FAIL = `${GET_USER_KYC} fail`;
export const getUserKYCFail = createAction(GET_USER_KYC_FAIL);

//
export const ACCEPT_FUNDRISING_APPLICATION = '[Admin] Fundirsing applications accept';
export const acceptFundrisingApplication = createAction(ACCEPT_FUNDRISING_APPLICATION);

export const ACCEPT_FUNDRISING_APPLICATION_SUCCESS = `${ACCEPT_FUNDRISING_APPLICATION} success`;
export const acceptFundrisingApplicationSuccess = createAction(ACCEPT_FUNDRISING_APPLICATION_SUCCESS);

export const ACCEPT_FUNDRISING_APPLICATION_FAIL = `${ACCEPT_FUNDRISING_APPLICATION} fail`;
export const acceptFundrisingApplicationFail = createAction(ACCEPT_FUNDRISING_APPLICATION_FAIL);
//

export const REJECT_FUNDRISING_APPLICATION = '[Admin] Fundirsing applications reject';
export const rejectFundrisingApplication = createAction(REJECT_FUNDRISING_APPLICATION);

export const REJECT_FUNDRISING_APPLICATION_SUCCESS = `${REJECT_FUNDRISING_APPLICATION} success`;
export const rejectFundrisingApplicationSuccess = createAction(REJECT_FUNDRISING_APPLICATION_SUCCESS);

export const REJECT_FUNDRISING_APPLICATION_FAIL = `${REJECT_FUNDRISING_APPLICATION} fail`;
export const rejectFundrisingApplicationFail = createAction(REJECT_FUNDRISING_APPLICATION_FAIL);

//

export const ACCEPT_KYC_INTERNAL_REVIEW = '[Admin] User KYC internal review accept';
export const acceptKYCInternalReview = createAction(ACCEPT_KYC_INTERNAL_REVIEW);

export const ACCEPT_KYC_INTERNAL_REVIEW_SUCCESS = `${ACCEPT_KYC_INTERNAL_REVIEW} success`;
export const acceptKYCInternalReviewSuccess = createAction(ACCEPT_KYC_INTERNAL_REVIEW_SUCCESS);

export const ACCEPT_KYC_INTERNAL_REVIEW_FAIL = `${ACCEPT_KYC_INTERNAL_REVIEW} fail`;
export const acceptUserKYCInternalReviewFail = createAction(ACCEPT_KYC_INTERNAL_REVIEW_FAIL);
//

export const REJECT_KYC_INTERNAL_REVIEW = '[Admin] User KYC internal review reject';
export const rejectKYCInternalReview = createAction(REJECT_KYC_INTERNAL_REVIEW);

export const REJECT_KYC_INTERNAL_REVIEW_SUCCESS = `${REJECT_KYC_INTERNAL_REVIEW} success`;
export const rejectKYCInternalReviewSuccess = createAction(REJECT_KYC_INTERNAL_REVIEW_SUCCESS);

export const REJECT_KYC_INTERNAL_REVIEW_FAIL = `${REJECT_KYC_INTERNAL_REVIEW} fail`;
export const rejectKYCInternalReviewFail = createAction(REJECT_KYC_INTERNAL_REVIEW_FAIL);

export const LAUNCH_CAMPAIGN = '[Admin] Launch a campaign';
export const launchCampaign = createAction(LAUNCH_CAMPAIGN);

export const LAUNCH_CAMPAIGN_SUCCESS = `${LAUNCH_CAMPAIGN} success`;
export const launchCampaignSuccess = createAction(LAUNCH_CAMPAIGN_SUCCESS);

export const LAUNCH_CAMPAIGN_FAIL = `${LAUNCH_CAMPAIGN} fail`;
export const launchCampaignFail = createAction(LAUNCH_CAMPAIGN_FAIL);

export const AUDIT_KYC = '[Admin] Audit KYC';
export const auditKYC = createAction(AUDIT_KYC);

export const AUDIT_KYC_SUCCESS = `${AUDIT_KYC} success`;
export const auditKYCSuccess = createAction(AUDIT_KYC_SUCCESS);

export const AUDIT_KYC_FAIL = `${AUDIT_KYC} fail`;
export const auditKYCFail = createAction(AUDIT_KYC_FAIL);

export const GET_KYC_REQUESTS = '[Admin] Get KYC requests';
export const getKYCRequest = createAction(GET_KYC_REQUESTS);

export const GET_KYC_REQUESTS_SUCCESS = `${GET_KYC_REQUESTS} success`;
export const getKYCRequestSuccess = createAction(GET_KYC_REQUESTS_SUCCESS);

export const GET_KYC_REQUESTS_FAIL = `${GET_KYC_REQUESTS} fail`;
export const getKYCRequestFail = createAction(GET_KYC_REQUESTS_FAIL);

// GET KYC DOC
export const GET_KYC_DOC = '[Admin] Get KYC doc';
export const getKYCDoc = createAction(GET_KYC_DOC);

export const GET_KYC_DOC_SUCCESS = `${GET_KYC_DOC} success`;
export const getKYCDocSuccess = createAction(GET_KYC_DOC_SUCCESS);

export const GET_KYC_DOC_FAIL = `${GET_KYC_DOC} fail`;
export const getKYCDocFail = createAction(GET_KYC_DOC_FAIL);

//
export const GET_CAMPAIGN_IMG = '[Admin] Get campaign img';
export const getCampaignImg = createAction(GET_CAMPAIGN_IMG);

export const GET_CAMPAIGN_IMG_SUCCESS = `${GET_CAMPAIGN_IMG} success`;
export const getCampaignImgSuccess = createAction(GET_CAMPAIGN_IMG_SUCCESS);

export const GET_CAMPAIGN_IMG_FAIL = `${GET_CAMPAIGN_IMG} fail`;
export const getCampaignImgFail = createAction(GET_CAMPAIGN_IMG_FAIL);
//
export const DOWNLOAD_FUNDRAISING_APP_DOCUMENT = '[Admin] Download fundraising application document';
export const downloadFundraisingAppDocument = createAction(DOWNLOAD_FUNDRAISING_APP_DOCUMENT);

export const DOWNLOAD_FUNDRAISING_APP_DOCUMENT_SUCCESS = `${DOWNLOAD_FUNDRAISING_APP_DOCUMENT} success`;
export const downloadFundraisingAppDocumentSuccess = createAction(DOWNLOAD_FUNDRAISING_APP_DOCUMENT_SUCCESS);

export const DOWNLOAD_FUNDRAISING_APP_DOCUMENT_FAIL = `${DOWNLOAD_FUNDRAISING_APP_DOCUMENT} fail`;
export const downloadFundraisingAppDocumentFail = createAction(DOWNLOAD_FUNDRAISING_APP_DOCUMENT_FAIL);
