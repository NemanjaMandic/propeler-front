import { createAction } from 'redux-actions';

export const SET_STEP = '[Campaign} set step';
export const setStep = createAction(SET_STEP);

export const CREATE_CAMPAIGN = '[Campaign] Create campaign';
export const createCampaign = createAction(CREATE_CAMPAIGN);

export const CREATE_CAMPAIGN_SUCCESS = `${CREATE_CAMPAIGN} success`;
export const createCampaignSuccess = createAction(CREATE_CAMPAIGN_SUCCESS);

export const CREATE_CAMPAIGN_FAIL = `${CREATE_CAMPAIGN} fail`;
export const createCampaignFail = createAction(CREATE_CAMPAIGN_FAIL);

export const CREATE_FRIENDLY_URL = '[Campaign] Create friendly url';
export const createFriendlyUrl = createAction(CREATE_FRIENDLY_URL);

export const CHECK_CAMPAIGN_NAME = '[Campaign] Check campaign name';
export const checkCampaignName = createAction(CHECK_CAMPAIGN_NAME);

export const CHECK_CAMPAIGN_NAME_SUCCESS = `${CHECK_CAMPAIGN_NAME} success`;
export const checkCampaignNameSuccess = createAction(CHECK_CAMPAIGN_NAME_SUCCESS);

export const CHECK_CAMPAIGN_NAME_FAIL = `${CHECK_CAMPAIGN_NAME} fail`;
export const checkCampaignNameFail = createAction(CHECK_CAMPAIGN_NAME_FAIL);

export const GET_CAMPAIGN_INFO = '[Campaign] Get campaign basic info';
export const getCampaignInfo = createAction(GET_CAMPAIGN_INFO);

export const GET_CAMPAIGN_INFO_SUCCESS = `${GET_CAMPAIGN_INFO} success`;
export const getCampaignInfoSuccess = createAction(GET_CAMPAIGN_INFO_SUCCESS);

export const GET_CAMPAIGN_INFO_FAIL = `${GET_CAMPAIGN_INFO} fail`;
export const getCampaignInfoFail = createAction(GET_CAMPAIGN_INFO_FAIL);

export const UPDATE_CAMPAIGN_INFO = '[Campaign] Update campaign basic info';
export const updateCampaignInfo = createAction(UPDATE_CAMPAIGN_INFO);

export const UPDATE_CAMPAIGN_INFO_SUCCESS = `${UPDATE_CAMPAIGN_INFO} success`;
export const updateCampaignInfoSuccess = createAction(UPDATE_CAMPAIGN_INFO_SUCCESS);

export const UPDATE_CAMPAIGN_INFO_FAIL = `${UPDATE_CAMPAIGN_INFO} fail`;
export const updateCampaignInfoFail = createAction(UPDATE_CAMPAIGN_INFO_FAIL);

export const GET_CAMPAIGN_MARKET_IMAGE = '[Campaign] Get campaign market image';
export const getCampaignMarketImage = createAction(GET_CAMPAIGN_MARKET_IMAGE);

export const GET_CAMPAIGN_MARKET_IMAGE_SUCCESS = `${GET_CAMPAIGN_MARKET_IMAGE} success`;
export const getCampaignMarketImageSuccess = createAction(GET_CAMPAIGN_MARKET_IMAGE_SUCCESS);

export const GET_CAMPAIGN_MARKET_IMAGE_FAIL = `${GET_CAMPAIGN_MARKET_IMAGE} fail`;
export const getCampaignMarketImageFail = createAction(GET_CAMPAIGN_MARKET_IMAGE_FAIL);

export const UPLOAD_CAMPAIGN_MARKET_IMAGE = '[Campaign] Upload campaign market image';
export const uploadCampaignMarketImage = createAction(UPLOAD_CAMPAIGN_MARKET_IMAGE);

export const UPLOAD_CAMPAIGN_MARKET_IMAGE_SUCCESS = `${UPLOAD_CAMPAIGN_MARKET_IMAGE} success`;
export const uploadCampaignMarketImageSuccess = createAction(UPLOAD_CAMPAIGN_MARKET_IMAGE_SUCCESS);

export const UPLOAD_CAMPAIGN_MARKET_IMAGE_FAIL = `${UPLOAD_CAMPAIGN_MARKET_IMAGE} fail`;
export const uploadCampaignMarketImageFail = createAction(UPLOAD_CAMPAIGN_MARKET_IMAGE_FAIL);

export const DELETE_CAMPAIGN_MARKET_IMAGE = '[Campaign] Delete campaign market image';
export const deleteCampaignMarketImage = createAction(DELETE_CAMPAIGN_MARKET_IMAGE);

export const DELETE_CAMPAIGN_MARKET_IMAGE_SUCCESS = `${DELETE_CAMPAIGN_MARKET_IMAGE} success`;
export const deleteCampaignMarketImageSuccess = createAction(DELETE_CAMPAIGN_MARKET_IMAGE_SUCCESS);

export const DELETE_CAMPAIGN_MARKET_IMAGE_FAIL = `${DELETE_CAMPAIGN_MARKET_IMAGE} fail`;
export const deleteCampaignMarketImageFail = createAction(DELETE_CAMPAIGN_MARKET_IMAGE_SUCCESS);

export const GET_CURRENT_CAMPAIGN = '[Campaign] Get current campaign';
export const getCurrentCampaign = createAction(GET_CURRENT_CAMPAIGN);

export const GET_CURRENT_CAMPAIGN_SUCCESS = `${GET_CURRENT_CAMPAIGN} success`;
export const getCurrentCampaignSuccess = createAction(GET_CURRENT_CAMPAIGN_SUCCESS);

export const GET_CURRENT_CAMPAIGN_FAIL = `${GET_CURRENT_CAMPAIGN} fail`;
export const getCurrentCampaignFail = createAction(GET_CURRENT_CAMPAIGN_FAIL);

export const SET_CAMPAIGN_CURRENT_TOPIC = '[Campaign] Set campaign current topic';
export const setCampaignCurrentTopic = createAction(SET_CAMPAIGN_CURRENT_TOPIC);

export const CREATE_CAMPAIGN_TOPIC = '[Campaign] Create campaign topic';
export const createCampaignTopic = createAction(CREATE_CAMPAIGN_TOPIC);

export const CREATE_CAMPAIGN_TOPIC_SUCCESS = `${CREATE_CAMPAIGN_TOPIC} success`;
export const createCampaignTopicSuccess = createAction(CREATE_CAMPAIGN_TOPIC_SUCCESS);

export const CREATE_CAMPAIGN_TOPIC_FAIL = `${CREATE_CAMPAIGN_TOPIC} fail`;
export const createCampaignTopicFail = createAction(CREATE_CAMPAIGN_TOPIC_FAIL);

export const UPDATE_CAMPAIGN_TOPIC = '[Campaign] Update campaign topic';
export const updateCampaignTopic = createAction(UPDATE_CAMPAIGN_TOPIC);

export const UPDATE_CAMPAIGN_TOPIC_SUCCESS = `${UPDATE_CAMPAIGN_TOPIC} success`;
export const updateCampaignTopicSuccess = createAction(UPDATE_CAMPAIGN_TOPIC_SUCCESS);

export const UPDATE_CAMPAIGN_TOPIC_FAIL = `${UPDATE_CAMPAIGN_TOPIC} fail`;
export const updateCampaignTopicFail = createAction(UPDATE_CAMPAIGN_TOPIC_FAIL);

export const GET_CAMPAIGN_TOPIC = '[Campaign] Get campaign topic';
export const getCampaignTopic = createAction(GET_CAMPAIGN_TOPIC);

export const GET_CAMPAIGN_TOPIC_SUCCESS = `${GET_CAMPAIGN_TOPIC} success`;
export const getCampaignTopicSuccess = createAction(GET_CAMPAIGN_TOPIC_SUCCESS);

export const GET_CAMPAIGN_TOPIC_FAIL = `${GET_CAMPAIGN_TOPIC} fail`;
export const getCampaignTopicFail = createAction(GET_CAMPAIGN_TOPIC_FAIL);

export const ADD_TEAM_MEMBER = `[Campaign] Add team member`;
export const addTeamMember = createAction(ADD_TEAM_MEMBER);

export const ADD_TEAM_MEMBER_SUCCESS = `${ADD_TEAM_MEMBER} success`;
export const addTeamMemberSuccess = createAction(ADD_TEAM_MEMBER_SUCCESS);

export const ADD_TEAM_MEMBER_FAIL = `${ADD_TEAM_MEMBER} fail`;
export const addTeamMemberFail = createAction(ADD_TEAM_MEMBER_FAIL);

export const UPDATE_TEAM_MEMBER = `[Campaign] Update team member`;
export const updateTeamMember = createAction(UPDATE_TEAM_MEMBER);

export const UPDATE_TEAM_MEMBER_SUCCESS = `${UPDATE_TEAM_MEMBER} success`;
export const updateTeamMemberSuccess = createAction(UPDATE_TEAM_MEMBER_SUCCESS);

export const UPDATE_TEAM_MEMBER_FAIL = `${UPDATE_TEAM_MEMBER} fail`;
export const updateTeamMemberFail = createAction(UPDATE_TEAM_MEMBER_FAIL);

export const DELETE_TEAM_MEMBER = `[Campaign] Delete team member`;
export const deleteTeamMember = createAction(DELETE_TEAM_MEMBER);

export const DELETE_TEAM_MEMBER_SUCCESS = `${DELETE_TEAM_MEMBER} success`;
export const deleteTeamMemberSuccess = createAction(DELETE_TEAM_MEMBER_SUCCESS);

export const DELETE_TEAM_MEMBER_FAIL = `${DELETE_TEAM_MEMBER} fail`;
export const deleteTeamMemberFail = createAction(DELETE_TEAM_MEMBER_FAIL);

export const GET_TEAM_MEMBERS = `[Campaign] Get team members`;
export const getTeamMembers = createAction(GET_TEAM_MEMBERS);

export const GET_TEAM_MEMBERS_SUCCESS = `${GET_TEAM_MEMBERS} success`;
export const getTeamMembersSuccess = createAction(GET_TEAM_MEMBERS_SUCCESS);

export const GET_TEAM_MEMBERS_FAIL = `${GET_TEAM_MEMBERS} fail`;
export const getTeamMembersFail = createAction(GET_TEAM_MEMBERS_FAIL);

export const REORDER_TEAM_MEMBERS = `[Campaign] Reorder team members`;
export const reorderTeamMembers = createAction(REORDER_TEAM_MEMBERS);

export const REORDER_TEAM_MEMBERS_SUCCESS = `${REORDER_TEAM_MEMBERS} success`;
export const reorderTeamMembersSuccess = createAction(REORDER_TEAM_MEMBERS_SUCCESS);

export const REORDER_TEAM_MEMBERS_FAIL = `${REORDER_TEAM_MEMBERS} fail`;
export const reorderTeamMembersFail = createAction(REORDER_TEAM_MEMBERS_FAIL);

export const SET_MEMBERS_POSITION = '[Campaign] Set members position';
export const setMembersPosition = createAction(SET_MEMBERS_POSITION);

export const GET_MEMBER_PHOTO = '[Campaign] Get member photo';
export const getMemberPhoto = createAction(GET_MEMBER_PHOTO);

export const GET_MEMBER_PHOTO_SUCCESS = `${GET_MEMBER_PHOTO} success`;
export const getMemberPhotoSuccess = createAction(GET_MEMBER_PHOTO_SUCCESS);

export const GET_MEMBER_PHOTO_FAIL = `${GET_MEMBER_PHOTO} fail`;
export const getMemberPhotoFail = createAction(GET_MEMBER_PHOTO_FAIL);

export const UPLOAD_MEMBER_PHOTO = '[Campaign] Upload member photo';
export const uploadMemberPhoto = createAction(UPLOAD_MEMBER_PHOTO);

export const UPLOAD_MEMBER_PHOTO_SUCCESS = `${UPLOAD_MEMBER_PHOTO} success`;
export const uploadMemberPhotoSuccess = createAction(UPLOAD_MEMBER_PHOTO_SUCCESS);

export const UPLOAD_MEMBER_PHOTO_FAIL = `${UPLOAD_MEMBER_PHOTO} fail`;
export const uploadMemberPhotoFail = createAction(UPLOAD_MEMBER_PHOTO_FAIL);

export const DELETE_MEMBER_PHOTO = '[Campaign] Delete member photo';
export const deleteMemberPhoto = createAction(DELETE_MEMBER_PHOTO);

export const DELETE_MEMBER_PHOTO_SUCCESS = `${DELETE_MEMBER_PHOTO} success`;
export const deleteMemberPhotoSuccess = createAction(DELETE_MEMBER_PHOTO_SUCCESS);

export const DELETE_MEMBER_PHOTO_FAIL = `${DELETE_MEMBER_PHOTO} fail`;
export const deleteMemberPhotoFail = createAction(DELETE_MEMBER_PHOTO_FAIL);

export const OPEN_CAMPAIGN_OVERVIEW = '[Campaign] Open campaign overview';
export const openCampaignOverview = createAction(OPEN_CAMPAIGN_OVERVIEW);

export const SET_CURRENT_INFO = '[Campaign] Set current info';
export const setCurrentInfo = createAction(SET_CURRENT_INFO);

// PLATFORM SETTINGS - TODO: move it from campaign?!
export const GET_PLATFORM_SETTINGS = '[Campaign] Get platform settings';
export const getPlatformSettings = createAction(GET_PLATFORM_SETTINGS);

export const GET_PLATFORM_SETTINGS_SUCCESS = `${GET_PLATFORM_SETTINGS} success`;
export const getPlatformSettingsSuccess = createAction(GET_PLATFORM_SETTINGS_SUCCESS);

export const GET_PLATFORM_SETTINGS_FAIL = `${GET_PLATFORM_SETTINGS} fail`;
export const getPlatformSettingsFail = createAction(GET_PLATFORM_SETTINGS_FAIL);

export const DELETE_CAMPAIGN = '[Campaign] Delete campaign';
export const deleteCampaign = createAction(DELETE_CAMPAIGN);

export const DELETE_CAMPAIGN_SUCCESS = `${DELETE_CAMPAIGN} success`;
export const deleteCampaignSuccess = createAction(DELETE_CAMPAIGN_SUCCESS);

export const DELETE_CAMPAIGN_FAIL = `${DELETE_CAMPAIGN} fail`;
export const deleteCampaignFail = createAction(DELETE_CAMPAIGN_FAIL);

export const CAMPAIGN_SUBMIT_FOR_REVIEW = '[Campaign] Submit for review';
export const campaignSubmitForReview = createAction(CAMPAIGN_SUBMIT_FOR_REVIEW);

export const CAMPAIGN_SUBMIT_FOR_REVIEW_SUCCESS = `${CAMPAIGN_SUBMIT_FOR_REVIEW} success`;
export const campaignSubmitForReviewSuccess = createAction(CAMPAIGN_SUBMIT_FOR_REVIEW_SUCCESS);

export const CAMPAIGN_SUBMIT_FOR_REVIEW_FAIL = `${CAMPAIGN_SUBMIT_FOR_REVIEW} fail`;
export const campaignSubmitForReviewFail = createAction(CAMPAIGN_SUBMIT_FOR_REVIEW_FAIL);

export const GET_ALL_CAMPAIGNS = '[Campaign] Get all campaigns';
export const getAllCampaigns = createAction(GET_ALL_CAMPAIGNS);

export const GET_ALL_CAMPAIGNS_SUCCESS = `${GET_ALL_CAMPAIGNS} success`;
export const getAllCampaignsSuccess = createAction(GET_ALL_CAMPAIGNS_SUCCESS);

export const GET_ALL_CAMPAIGNS_FAIL = `${GET_ALL_CAMPAIGNS} fail`;
export const getAllCampaignsFail = createAction(GET_ALL_CAMPAIGNS_FAIL);

export const GET_ACTIVE_CAMPAIGNS = `${GET_ALL_CAMPAIGNS} active`;
export const getActiveCampaigns = createAction(GET_ACTIVE_CAMPAIGNS);

export const GET_COMPLETED_CAMPAIGNS = `${GET_ALL_CAMPAIGNS} completed`;
export const getCompletedCampaigns = createAction(GET_COMPLETED_CAMPAIGNS);

export const GET_COMPLETED_CAMPAIGNS_SUCCESS = `${GET_COMPLETED_CAMPAIGNS} success`;
export const getCompletedCampaignsSuccess = createAction(GET_COMPLETED_CAMPAIGNS_SUCCESS);

export const GET_COMPLETED_CAMPAIGNS_FAIL = `${GET_COMPLETED_CAMPAIGNS} fail`;
export const getCompletedCampaignsFail = createAction(GET_COMPLETED_CAMPAIGNS_FAIL);

export const GET_CAMPAIGN_CARD_COVER = '[Campaign] Get campaign card cover';
export const getCampaignCardCover = createAction(GET_CAMPAIGN_CARD_COVER);

export const GET_CAMPAIGN_CARD_COVER_SUCCESS = `${GET_CAMPAIGN_CARD_COVER} success`;
export const getCampaignCardCoverSuccess = createAction(GET_CAMPAIGN_CARD_COVER_SUCCESS);

export const GET_CAMPAIGN_CARD_COVER_FAIL = `${GET_CAMPAIGN_CARD_COVER} fail`;
export const getCampaignCardCoverFail = createAction(GET_CAMPAIGN_CARD_COVER_FAIL);

export const GET_CAMPAIGN_CARD_LOGO = '[Campaign] Get campaign card logo';
export const getCampaignCardLogo = createAction(GET_CAMPAIGN_CARD_LOGO);

export const GET_CAMPAIGN_CARD_LOGO_SUCCESS = `${GET_CAMPAIGN_CARD_LOGO} Success`;
export const getCampaignCardLogoSuccess = createAction(GET_CAMPAIGN_CARD_LOGO_SUCCESS);

export const GET_CAMPAIGN_CARD_LOGO_FAIL = `${GET_CAMPAIGN_CARD_LOGO} Fail`;
export const getCampaignCardLogoFail = createAction(GET_CAMPAIGN_CARD_LOGO_FAIL);

// DOCUMENT ACTIONS
export const SUBMIT_CAMPAIGN_DOCUMENT = '[Campaign] Submit document';
export const submitCampaignDocument = createAction(SUBMIT_CAMPAIGN_DOCUMENT);

export const SUBMIT_CAMPAIGN_DOCUMENT_SUCCESS = `${SUBMIT_CAMPAIGN_DOCUMENT} success`;
export const submitCampaignDocumentSuccess = createAction(SUBMIT_CAMPAIGN_DOCUMENT_SUCCESS);

export const SUBMIT_CAMPAIGN_DOCUMENT_FAIL = `${SUBMIT_CAMPAIGN_DOCUMENT} fail`;
export const submitCampaignDocumentFail = createAction(SUBMIT_CAMPAIGN_DOCUMENT_FAIL);

export const UPDATE_CAMPAIGN_DOCUMENT = '[Campaign] Update document';
export const updateCampaignDocument = createAction(UPDATE_CAMPAIGN_DOCUMENT);

export const UPDATE_CAMPAIGN_DOCUMENT_SUCCESS = `${UPDATE_CAMPAIGN_DOCUMENT} success`;
export const updateCampaignDocumentSuccess = createAction(UPDATE_CAMPAIGN_DOCUMENT_SUCCESS);

export const UPDATE_CAMPAIGN_DOCUMENT_FAIL = `${UPDATE_CAMPAIGN_DOCUMENT} fail`;
export const updateCampaignDocumentFail = createAction(UPDATE_CAMPAIGN_DOCUMENT_FAIL);

export const DELETE_CAMPAIGN_DOCUMENT = '[Campaign] Delete document';
export const deleteCampaignDocument = createAction(DELETE_CAMPAIGN_DOCUMENT);

export const DELETE_CAMPAIGN_DOCUMENT_SUCCESS = `${DELETE_CAMPAIGN_DOCUMENT} success`;
export const deleteCampaignDocumentSuccess = createAction(DELETE_CAMPAIGN_DOCUMENT_SUCCESS);

export const DELETE_CAMPAIGN_DOCUMENT_FAIL = `${DELETE_CAMPAIGN_DOCUMENT} fail`;
export const deleteCampaignDocumentFail = createAction(DELETE_CAMPAIGN_DOCUMENT_FAIL);

export const UPLOAD_DOCUMENT = '[Campaign] Upload document';
export const uploadDocument = createAction(UPLOAD_DOCUMENT);

export const UPLOAD_DOCUMENT_SUCCESS = `${UPLOAD_DOCUMENT} success`;
export const uploadDocumentSuccess = createAction(UPLOAD_DOCUMENT_SUCCESS);

export const UPLOAD_DOCUMENT_FAIL = `${UPLOAD_DOCUMENT} fail`;
export const uploadDocumentFail = createAction(UPLOAD_DOCUMENT_FAIL);

export const REMOVE_UPLOADED_DOCUMENT = '[Campaign] Remove uploaded doc';
export const removeUploadedDocument = createAction(REMOVE_UPLOADED_DOCUMENT);

export const GET_CAMPAIGN_DOCUMENTS = '[Campaign] Get campaign documents';
export const getCampaignDocuments = createAction(GET_CAMPAIGN_DOCUMENTS);

export const GET_CAMPAIGN_DOCUMENTS_SUCCESS = `${GET_CAMPAIGN_DOCUMENTS} success`;
export const getCampaignDocumentsSuccess = createAction(GET_CAMPAIGN_DOCUMENTS_SUCCESS);

export const GET_CAMPAIGN_DOCUMENTS_FAIL = `${GET_CAMPAIGN_DOCUMENTS} fail`;
export const getCampaignDocumentsFail = createAction(GET_CAMPAIGN_DOCUMENTS_FAIL);

export const GET_DOCUMENT = '[Campaign] Get document';
export const getDocument = createAction(GET_DOCUMENT);

export const GET_DOCUMENT_SUCCESS = `${GET_DOCUMENT} success`;
export const getDocumentSuccess = createAction(GET_DOCUMENT_SUCCESS);

export const GET_DOCUMENT_FAIL = `${GET_DOCUMENT} fail`;
export const getDocumentFail = createAction(GET_DOCUMENT_FAIL);

export const GET_ALL_CAMPAIGN_UPDATES_PAGEABLE = '[Campaign] Get all campaign updates pageable';
export const getAllCampaignUpdatesPageable = createAction(GET_ALL_CAMPAIGN_UPDATES_PAGEABLE);

export const GET_ALL_CAMPAIGN_UPDATES_PAGEABLE_SUCCESS = `${GET_ALL_CAMPAIGN_UPDATES_PAGEABLE} success`;
export const getAllCampaignUpdatesPageableSuccess = createAction(GET_ALL_CAMPAIGN_UPDATES_PAGEABLE_SUCCESS);

export const GET_ALL_CAMPAIGN_UPDATES_PAGEABLE_FAIL = `${GET_ALL_CAMPAIGN_UPDATES_PAGEABLE} fail`;
export const getAllCampaignUpdatesPageableFail = createAction(GET_ALL_CAMPAIGN_UPDATES_PAGEABLE_FAIL);

export const CREATE_CAMPAIGN_UPDATE = '[Campaign] Create campaign update';
export const createCampaignUpdate = createAction(CREATE_CAMPAIGN_UPDATE);

export const CREATE_CAMPAIGN_UPDATE_SUCCESS = `${CREATE_CAMPAIGN_UPDATE} success`;
export const createCampaignUpdateSuccess = createAction(CREATE_CAMPAIGN_UPDATE_SUCCESS);

export const CREATE_CAMPAIGN_UPDATE_FAIL = `${CREATE_CAMPAIGN_UPDATE} fail`;
export const createCampaignUpdateFail = createAction(CREATE_CAMPAIGN_UPDATE_FAIL);

export const UPDATE_CAMPAIGN_UPDATE = '[Campaign] Update campaign update';
export const updateCampaignUpdate = createAction(UPDATE_CAMPAIGN_UPDATE);

export const UPDATE_CAMPAIGN_UPDATE_SUCCESS = `${UPDATE_CAMPAIGN_UPDATE} success`;
export const updateCampaignUpdateSuccess = createAction(UPDATE_CAMPAIGN_UPDATE_SUCCESS);

export const UPDATE_CAMPAIGN_UPDATE_FAIL = `${UPDATE_CAMPAIGN_UPDATE} fail`;
export const updateCampaignUpdateFail = createAction(UPDATE_CAMPAIGN_UPDATE_FAIL);

export const DELETE_CAMPAIGN_UPDATE = '[Campaign] Delete campaign update';
export const deleteCampaignUpdate = createAction(DELETE_CAMPAIGN_UPDATE);

export const DELETE_CAMPAIGN_UPDATE_SUCCESS = `${DELETE_CAMPAIGN_UPDATE} success`;
export const deleteCampaignUpdateSuccess = createAction(DELETE_CAMPAIGN_UPDATE_SUCCESS);

export const DELETE_CAMPAIGN_UPDATE_FAIL = `${DELETE_CAMPAIGN_UPDATE} fail`;
export const deleteCampaignUpdateFail = createAction(DELETE_CAMPAIGN_UPDATE_FAIL);

export const GET_CAMPAIGN_UPDATE = '[Campaign] Get campaign update';
export const getCampaignUpdate = createAction(GET_CAMPAIGN_UPDATE);

export const GET_CAMPAIGN_UPDATE_SUCCESS = `${GET_CAMPAIGN_UPDATE} success`;
export const getCampaignUpdateSuccess = createAction(GET_CAMPAIGN_UPDATE_SUCCESS);

export const GET_CAMPAIGN_UPDATE_FAIL = `${GET_CAMPAIGN_UPDATE} fail`;
export const getCampaignUpdateFail = createAction(GET_CAMPAIGN_UPDATE_FAIL);

export const CLEAR_CURRENT_CAMPAIGN_UPDATE = `Clear current campaign update`;
export const clearCurrentCampaignUpdate = createAction(CLEAR_CURRENT_CAMPAIGN_UPDATE);

export const SUBMIT_REQUEST_FOR_DOCUMENTS = '[Campaign] Submit request for documents';
export const submitRequestForDocuments = createAction(SUBMIT_REQUEST_FOR_DOCUMENTS);

export const SUBMIT_REQUEST_FOR_DOCUMENTS_SUCCESS = `${SUBMIT_REQUEST_FOR_DOCUMENTS} success`;
export const submitRequestForDocumentsSuccess = createAction(SUBMIT_REQUEST_FOR_DOCUMENTS_SUCCESS);

export const SUBMIT_REQUEST_FOR_DOCUMENTS_FAIL = `${SUBMIT_REQUEST_FOR_DOCUMENTS} fail`;
export const submitRequestForDocumentsFail = createAction(SUBMIT_REQUEST_FOR_DOCUMENTS_FAIL);

export const GET_DOCUMENTS_REQUEST_STATUS = '[Campaign] Get documents requests status';
export const getDocumentsRequestStatus = createAction(GET_DOCUMENTS_REQUEST_STATUS);

export const GET_DOCUMENTS_REQUEST_STATUS_SUCCESS = `${GET_DOCUMENTS_REQUEST_STATUS} success`;
export const getDocumentsRequestStatusSuccess = createAction(GET_DOCUMENTS_REQUEST_STATUS_SUCCESS);

export const GET_DOCUMENTS_REQUEST_STATUS_FAIL = `${GET_DOCUMENTS_REQUEST_STATUS} fail`;
export const getDocumentsRequestStatusFail = createAction(GET_DOCUMENTS_REQUEST_STATUS_FAIL);

export const GET_REQ_DOCUMENT_NOTIFICATION = `[Campaign] Get request document notification`;
export const getReqDocumentNotification = createAction(GET_REQ_DOCUMENT_NOTIFICATION);
