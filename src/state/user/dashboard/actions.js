// @flow

import { createAction } from 'redux-actions';

export const GET_USER_CAMPAIGNS = "[User] Get user's campaigns";
export const getUserCampaigns = createAction(GET_USER_CAMPAIGNS);

export const GET_USER_CAMPAIGNS_SUCCESS = `${GET_USER_CAMPAIGNS} success`;
export const getUserCampaignsSuccess = createAction(GET_USER_CAMPAIGNS_SUCCESS);

export const GET_USER_CAMPAIGNS_FAIL = `${GET_USER_CAMPAIGNS} fail`;
export const getUserCampaignsFail = createAction(GET_USER_CAMPAIGNS_FAIL);

export const GET_USER_CAMPAIGN_DOCUMENTS_PAGEABLE = "[User] Get user's campaign documents pageable";
export const getUserCampaignDocumentsPageable = createAction(GET_USER_CAMPAIGN_DOCUMENTS_PAGEABLE);

export const GET_USER_CAMPAIGN_DOCUMENTS_PAGEABLE_SUCCESS = `${GET_USER_CAMPAIGN_DOCUMENTS_PAGEABLE} success`;
export const getUserCampaignDocumentsPageableSuccess = createAction(GET_USER_CAMPAIGN_DOCUMENTS_PAGEABLE_SUCCESS);

export const GET_USER_CAMPAIGN_DOCUMENTS_PAGEABLE_FAIL = `${GET_USER_CAMPAIGN_DOCUMENTS_PAGEABLE} fail`;
export const getUserCampaignDocumentsPageableFail = createAction(GET_USER_CAMPAIGN_DOCUMENTS_PAGEABLE_FAIL);

// get campaign list with investments:
export const GET_CAMPAIGNS_WITH_INVESTMENTS = '[User] Get campaigns with investments';
export const getCampaignsWithInvestments = createAction(GET_CAMPAIGNS_WITH_INVESTMENTS);

export const GET_CAMPAIGNS_WITH_INVESTMENTS_SUCCESS = `${GET_CAMPAIGNS_WITH_INVESTMENTS} success`;
export const getCampaignsWithInvestmentsSuccess = createAction(GET_CAMPAIGNS_WITH_INVESTMENTS_SUCCESS);

export const GET_CAMPAIGNS_WITH_INVESTMENTS_FAIL = `${GET_CAMPAIGNS_WITH_INVESTMENTS} fail`;
export const getCampaignsWithInvestmentsFail = createAction(GET_CAMPAIGNS_WITH_INVESTMENTS_FAIL);

// get campaign list with investments:
export const GET_COMPLETED_CAMPAIGNS_WITH_INVESTMENTS = '[User] Get completed campaigns with investments';
export const getCompletedCampaignsWithInvestments = createAction(GET_COMPLETED_CAMPAIGNS_WITH_INVESTMENTS);

export const GET_COMPLETED_CAMPAIGNS_WITH_INVESTMENTS_SUCCESS = `${GET_COMPLETED_CAMPAIGNS_WITH_INVESTMENTS} success`;
export const getCompletedCampaignsWithInvestmentsSuccess = createAction(
	GET_COMPLETED_CAMPAIGNS_WITH_INVESTMENTS_SUCCESS,
);

export const GET_COMPLETED_CAMPAIGNS_WITH_INVESTMENTS_FAIL = `${GET_COMPLETED_CAMPAIGNS_WITH_INVESTMENTS} fail`;
export const getCompletedCampaignsWithInvestmentsFail = createAction(GET_COMPLETED_CAMPAIGNS_WITH_INVESTMENTS_FAIL);
// investment acceptance:
export const APPROVE_INVESTMENT_AS_OWNER = '[User] Approve investment as owner';
export const approveInvestmentAsOwner = createAction(APPROVE_INVESTMENT_AS_OWNER);

export const APPROVE_INVESTMENT_AS_OWNER_SUCCESS = `${APPROVE_INVESTMENT_AS_OWNER} success`;
export const approveInvestmentAsOwnerSuccess = createAction(APPROVE_INVESTMENT_AS_OWNER_SUCCESS);

export const APPROVE_INVESTMENT_AS_OWNER_FAIL = `${APPROVE_INVESTMENT_AS_OWNER} fail`;
export const approveInvestmentAsOwnerFail = createAction(APPROVE_INVESTMENT_AS_OWNER_FAIL);

// investment rejection:
export const REJECT_INVESTMENT_AS_OWNER = '[User] Reject investment as owner';
export const rejectInvestmentAsOwner = createAction(REJECT_INVESTMENT_AS_OWNER);

export const REJECT_INVESTMENT_AS_OWNER_SUCCESS = `${REJECT_INVESTMENT_AS_OWNER} success`;
export const rejectInvestmentAsOwnerSuccess = createAction(REJECT_INVESTMENT_AS_OWNER_SUCCESS);

export const REJECT_INVESTMENT_AS_OWNER_FAIL = `${REJECT_INVESTMENT_AS_OWNER} fail`;
export const rejectInvestmentAsOwnerFail = createAction(REJECT_INVESTMENT_AS_OWNER_FAIL);

//document requests
export const GET_DOCUMENT_REQUESTS = '[User] Get document request';
export const getDocumentRequests = createAction(GET_DOCUMENT_REQUESTS);

export const GET_DOCUMENT_REQUESTS_SUCCESS = `${GET_DOCUMENT_REQUESTS} success`;
export const getDocumentRequestsSuccess = createAction(GET_DOCUMENT_REQUESTS_SUCCESS);

export const GET_DOCUMENT_REQUESTS_FAIL = `${GET_DOCUMENT_REQUESTS} fail`;
export const getDocumentRequestsFail = createAction(GET_DOCUMENT_REQUESTS_FAIL);

export const ACCEPT_DOCUMENT_REQUEST = '[User] accept document request';
export const acceptDocumentRequest = createAction(ACCEPT_DOCUMENT_REQUEST);

export const ACCEPT_DOCUMENT_REQUEST_SUCCESS = `${ACCEPT_DOCUMENT_REQUEST} success`;
export const acceptDocumentRequestSuccess = createAction(ACCEPT_DOCUMENT_REQUEST_SUCCESS);

export const ACCEPT_DOCUMENT_REQUEST_FAIL = `${ACCEPT_DOCUMENT_REQUEST} fail`;
export const acceptDocumentRequestFail = createAction(ACCEPT_DOCUMENT_REQUEST_FAIL);

export const REJECT_DOCUMENT_REQUEST = '[User] reject document request';
export const rejectDocumentRequest = createAction(REJECT_DOCUMENT_REQUEST);

export const REJECT_DOCUMENT_REQUEST_SUCCESS = `${REJECT_DOCUMENT_REQUEST} success`;
export const rejectDocumentRequestSuccess = createAction(REJECT_DOCUMENT_REQUEST_SUCCESS);

export const REJECT_DOCUMENT_REQUEST_FAIL = `${REJECT_DOCUMENT_REQUEST} fail`;
export const rejectDocumentRequestFail = createAction(REJECT_DOCUMENT_REQUEST_FAIL);
