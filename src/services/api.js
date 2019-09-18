// @flow

import Network from './network';
import type { LoginDataT } from '../components/auth/views/Login';
import type { ForgotPasswordT } from '../components/auth/views/ForgotPassword';
import type { ForgotUsernameT } from '../components/auth/views/ForgotUsername';
import type { RegisterDataT } from '../components/auth/views/Register';
import type { ChangePasswordT } from '../components/user/profile/views/ChangePassword';
import type { PersonDataT } from '../components/user/profile/views/Profile';
import type { CompanyDataT } from '../components/company/management/partials/AboutCompany';
import type { PaymentTypeT } from '../components/admin/dashboard/partials/PaymentsReviewTable';

const BASE = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8080/api';

const BASE_IMAGE_URL = process.env.REACT_APP_BASE_IMAGE_URL || '';

// AUTH
const AUTH = `${BASE}/auth`;
const REGISTER = `${AUTH}/register`;
const REGISTER_ENTREPRENEUR = `${REGISTER}/entrepreneur`;
const FORGOT_PASSWORD = `${AUTH}/reset_password`;
const FORGOT_USERNAME = `${AUTH}/recover_username`;
const CONFIRM_REGISTRATION = `${AUTH}/confirm_registration`;
const CONFIRM_EMAIL_CHANGE = `${AUTH}/email_confirm`;
const LOGIN_2FA = `${AUTH}/2fa`;
const REMEMBER_ME = `${LOGIN_2FA}/remember_me`;
const CREATE_SECRET = `${LOGIN_2FA}/secret`;
const VERIFY_SECRET = `${LOGIN_2FA}/verify`;
const COMPANY_INVESTOR_REGISTER = `${REGISTER}/corporateInvestor`;
const INDIVIDUAL_INVESTOR_REGISTER = `${REGISTER}/individualInvestor`;

// PAYMENTS
const PAYMENTS = `${BASE}/payments`;

export const getAllPaymentsAPI = (data: any) => Network.get(PAYMENTS, data);

const INVESTMENT_PAYMENT = (investmentId: number) => `${PAYMENTS}/${investmentId}`;
const PAYMENT_METHODS = (investmentId: number) => `${INVESTMENT_PAYMENT(investmentId)}/methods`;
const BANK_TRANSFER = (investmentId: number) => `${INVESTMENT_PAYMENT(investmentId)}/bankTransfer`;
const CARD_PAYMENT = (investmentId: number) => `${INVESTMENT_PAYMENT(investmentId)}/card`;

const PAYMENT_CONFIRMATION = (investmentId: number) => `${INVESTMENT_PAYMENT(investmentId)}/bankTransfer/confirm`;

export const getPaymentInvoiceAPI = (investmentId: number) =>
	Network.get(`${INVESTMENT_PAYMENT(investmentId)}/invoice`);

export const sendPaymentConfirmationAPI = (investmentId: number, data: any) =>
	Network.post(PAYMENT_CONFIRMATION(investmentId), data);

export const getPaymentMethodsAPI = (investmentId: number) => Network.get(PAYMENT_METHODS(investmentId));

export const getBankTransferAPI = (investmentId: number) => Network.get(BANK_TRANSFER(investmentId));
export const getCardPaymentAPI = (investmentId: number) => Network.get(CARD_PAYMENT(investmentId));

export const captureTransactionAPI = (investmentId, payPalOrderId) =>
	Network.post(`${PAYMENTS}/${investmentId}/payPal/${payPalOrderId}`);

// export const

export const loginUserAPI = (data: LoginDataT) => Network.post(AUTH, data);
export const verifyLoginAPI = (data: LoginDataT) => Network.post(LOGIN_2FA, data);
export const forgotPasswordAPI = (data: ForgotPasswordT) => Network.post(FORGOT_PASSWORD, data);
export const changePasswordAPI = (data: any) => Network.patch(FORGOT_PASSWORD, data);
export const forgotUsernameAPI = (data: ForgotUsernameT) => Network.post(FORGOT_USERNAME, data);
export const logoutUserAPI = () => Network.delete(AUTH);
export const registerAPI = (data: RegisterDataT) => Network.postWithHeader(REGISTER, data.body, data.header);
export const registerEntrepreneurAPI = (data: RegisterDataT) =>
	Network.postWithHeader(REGISTER_ENTREPRENEUR, data.body, data.header);
export const confirmRegistrationAPI = (data: any) => Network.post(CONFIRM_REGISTRATION, data);
export const confirmEmailChangeAPI = (data: any) => Network.patch(CONFIRM_EMAIL_CHANGE, data);
export const createSecretAPI = (data: any) => Network.post(CREATE_SECRET, data);
export const verifySecretAPI = (data: any) => Network.post(VERIFY_SECRET, data);
export const checkRegistrationTokenAPI = (token: any) =>
	Network.get(`${REGISTER}/validateToken`, { tokenValue: token });
export const registerCompanyInvestorAPI = (data: RegisterDataT) =>
	Network.postWithHeader(COMPANY_INVESTOR_REGISTER, data.body, data.header);
export const registerIndividualInvestorAPI = (data: RegisterDataT) =>
	Network.postWithHeader(INDIVIDUAL_INVESTOR_REGISTER, data.body, data.header);

// USER
const USER = `${BASE}/users`;
const NEW_SECRET = userId => `${USER}/${userId}/secret`;
const CHANGE_PASSWORD_PROFILE = ({ userId }) => `${USER}/${userId}/password`;
const VERIFY_PASSWORD = (userId: number) => `${CHANGE_PASSWORD_PROFILE({ userId })}/verify`;
const USER_INFO = ({ userId }) => `${USER}/${userId}`;
const USER_PICTURE = ({ userId }) => `${USER}/${userId}/picture`;
const CHANGE_EMAIL_PROFILE = userId => `${USER}/${userId}/email`;
const CHECK_USERNAME = ({ username }) => `${USER}/${username}`;
const RECOVERY_CODE = ({ userId }) => `${USER}/${userId}/recovery_code`;
export const initializePasswordChangeAPI = (userId: any, data: ChangePasswordT) =>
	Network.post(CHANGE_PASSWORD_PROFILE({ userId }), data);
export const verifyPasswordChangeAPI = (userId: any, data: ChangePasswordT) =>
	Network.patch(CHANGE_PASSWORD_PROFILE({ userId }), data);
export const changeEmailProfileAPI = (userId: any, data: ChangePasswordT) =>
	Network.post(CHANGE_EMAIL_PROFILE(userId), data);
export const verifyChangeEmailProfileAPI = (userId: any, data: any) =>
	Network.patch(CHANGE_EMAIL_PROFILE(userId), data);
export const checkUsernameAPI = (username: string) => Network.head(CHECK_USERNAME({ username }));
export const getUserInfoAPI = (userId: any) => Network.get(USER_INFO({ userId }));
export const changeUserProfileAPI = (userId: any, data: PersonDataT) => Network.patch(USER_INFO({ userId }), data);
export const uploadProfilePhotoAPI = (userId: any, data: PersonDataT) =>
	Network.postForm(USER_PICTURE({ userId }), data);
export const getProfilePhotoAPI = (userId: any) => Network.get(USER_PICTURE({ userId }));
export const deleteProfilePhotoAPI = (userId: any) => Network.delete(USER_PICTURE({ userId }));
export const recoveryCodeAPI = (userId: any, data: any) => Network.post(RECOVERY_CODE({ userId }), data);
export const initiateNewSecretAPI = (userId: number, data: any) => Network.post(VERIFY_PASSWORD(userId), data);
export const generateNewSecretAPI = (userId: number, data: any) => Network.post(NEW_SECRET(userId), data);
export const verifyNewSecretAPI = (userId: number, data: any) => Network.patch(NEW_SECRET(userId), data);
export const rememberMeAPI = (data: { token: string }) => Network.post(REMEMBER_ME, data);

// COMPANY
const COMPANY = `${BASE}/companies`;
const USER_COMPANY = `${COMPANY}/mine`;
const COMPANY_INFO = (id: string) => `${COMPANY}/${id}`;
const FEATURED_IMAGE = (companyId: number) => `${COMPANY}/${companyId}/featured_image`;
const LOGO = (companyId: number) => `${COMPANY}/${companyId}/logo`;
export const createCompanyAPI = (data: CompanyDataT) => Network.post(COMPANY, data);
export const reviewCompanyAPI = (id: string, data: CompanyDataT) => Network.patch(COMPANY_INFO(id), data);

export const updateCompanyExternalLinksAPI = (id: string, data: CompanyDataT) => Network.patch(COMPANY_INFO(id), data);

export const getCompanyAPI = (id: string) => Network.get(COMPANY_INFO(id));
export const getFeaturedImageAPI = (companyId: number) => Network.get(FEATURED_IMAGE(companyId));

export const uploadFeaturedImageAPI = (companyId: number, data: any) =>
	Network.postForm(FEATURED_IMAGE(companyId), data);

export const deleteFeaturedImageAPI = (companyId: number) => Network.delete(FEATURED_IMAGE(companyId));
export const getCompanyLogoAPI = (companyId: number) => Network.get(LOGO(companyId));
export const uploadCompanyLogoAPI = (companyId: number, data: any) => Network.postForm(LOGO(companyId), data);
export const deleteCompanyLogoAPI = (companyId: number) => Network.delete(LOGO(companyId));
export const updateCompanyAPI = (id: string, data: any) => Network.patch(COMPANY_INFO(id), data);
export const getUserCompanyAPI = () => Network.get(USER_COMPANY);

// COMPANY SHAREHOLDERS:
const SHARE_HOLDERS = (companyId: string) => `${COMPANY}/${companyId}/shareholders`;
export const getShareHoldersAPI = (companyId: string) => Network.get(SHARE_HOLDERS(companyId));
const SHARE_HOLDERS_MINE = `${USER_COMPANY}/shareholders`;
export const getShareHoldersMineAPI = () => Network.get(SHARE_HOLDERS_MINE);
export const addShareHolderAPI = (data: any) => Network.post(SHARE_HOLDERS_MINE, data);
export const reorderShareHoldersAPI = (data: any) => Network.patch(SHARE_HOLDERS_MINE, data);
const SHARE_HOLDER = (companyId: string, shareHolderId: number) => `${SHARE_HOLDERS(companyId)}/${shareHolderId}`;
const SHARE_HOLDER_MINE = (shareHolderId: number) => `${SHARE_HOLDERS_MINE}/${shareHolderId}`;
export const deleteShareHolderAPI = (shareHolderId: number) => Network.delete(SHARE_HOLDER_MINE(shareHolderId));
export const updateShareHolderAPI = (shareHolderId: number, data: any) =>
	Network.patch(SHARE_HOLDER_MINE(shareHolderId), data);
const SHARE_HOLDER_PHOTO = (companyId: string, shareholderId: number) =>
	`${SHARE_HOLDER(companyId, shareholderId)}/picture`;
const SHARE_HOLDER_MINE_PHOTO = (shareholderId: number) => `${SHARE_HOLDER_MINE(shareholderId)}/picture`;
export const uploadShareHolderPhotoAPI = (shareHolderId: number, file: any) =>
	Network.postForm(SHARE_HOLDER_MINE_PHOTO(shareHolderId), file);
export const getShareHolderPhotoAPI = (companyId: string, shareHolderId: number) =>
	Network.get(SHARE_HOLDER_PHOTO(companyId, shareHolderId));
export const deleteShareHolderPhotoAPI = (shareHolderId: number) =>
	Network.delete(SHARE_HOLDER_MINE_PHOTO(shareHolderId));

// CAMPAIGN
const CAMPAIGN = `${BASE}/campaigns`;
const PUBLIC_CAMPAIGNS = `${CAMPAIGN}/public`;
const CAMPAIGN_BASIC = campaignName => `${CAMPAIGN}/${campaignName}`;
const CAMPAIGN_MARKET_IMAGE = campaignName => `${CAMPAIGN}/${campaignName}/market_image`;
const CURRENT_CAMPAIGN = `${CAMPAIGN}/mine/current`;
const CAMPAIGN_REVIEW = campaignName => `${CAMPAIGN}/${campaignName}/review`;
const CAMPAIGN_LAUNCH = campaignName => `${CAMPAIGN}/${campaignName}/launch`;
export const createCampaignAPI = (data: any) => Network.post(CAMPAIGN, data);
export const checkCampaignNameAPI = (campaignName: string) => Network.head(CAMPAIGN_BASIC(campaignName));
export const getCampaignBasicInfoAPI = (campaignName: string) => Network.get(CAMPAIGN_BASIC(campaignName));
export const updateCampaignBasicInfoAPI = (campaignName: string, data: any) =>
	Network.patch(CAMPAIGN_BASIC(campaignName), data);
export const uploadCampaignMarketImageAPI = (campaignName: string, data: any) =>
	Network.postForm(CAMPAIGN_MARKET_IMAGE(campaignName), data);
export const deleteCampaignMarketImageAPI = (campaignName: string) =>
	Network.delete(CAMPAIGN_MARKET_IMAGE(campaignName));
export const getCampaignMarketImageAPI = (campaignName: string, data: any) =>
	Network.get(CAMPAIGN_MARKET_IMAGE(campaignName), data);
export const getCurrentCampaignAPI = () => Network.get(CURRENT_CAMPAIGN);
export const deleteCampaignAPI = (campaignName: string, data: any) =>
	Network.delete(CAMPAIGN_BASIC(campaignName), data);
export const campaignSubmitForReviewAPI = (campaignName: string) => Network.patch(CAMPAIGN_REVIEW(campaignName));

export const getPublicCampaignsAPI = (data: any) => Network.get(`${PUBLIC_CAMPAIGNS}`, data);
export const getUserCampaignsAPI = () => Network.get(`${CAMPAIGN}/mine`);
export const getInvestorPortfolioAPI = (data: any) => Network.get(`${CAMPAIGN}/mine/portfolio`, data);
export const getCampaignsWithInvestmentsAPI = (state: string, data: any) =>
	Network.get(`${CAMPAIGN}/withInvestments?state=${state}`, data);

// INVEST
const INVESTMENTS = `${BASE}/investments`;
const REVOKE = (id: number) => `${INVESTMENTS}/${id}`;
export const convertMoneyAPI = (name: string, data: Object) =>
	Network.get(`${CAMPAIGN_BASIC(name)}/convertMoney`, data);
export const convertEquityAPI = (name: string, data: Object) =>
	Network.get(`${CAMPAIGN_BASIC(name)}/convertPercentage`, data);
export const availableInvestmentAPI = (name: string) => Network.get(`${CAMPAIGN_BASIC(name)}/availableInvestment`);
export const investInCampaignAPI = (name: string, data: Object) => Network.post(`${CAMPAIGN_BASIC(name)}/invest`, data);
export const revokeInvestmentAPI = (id: number) => Network.delete(REVOKE(id));
export const approveInvestmentAsOwner = investmentId => Network.patch(`${INVESTMENTS}/${investmentId}/ownerApprove`);
export const rejectInvestmentAsOwner = investmentId => Network.patch(`${INVESTMENTS}/${investmentId}/ownerReject`);
export const approveInvestmentAsAuditorAPI = investmentId =>
	Network.patch(`${INVESTMENTS}/${investmentId}/auditorApprove`);

// CAMPAIGN_TOPIC
const CAMPAIGN_TOPIC = (campaignName, topicType) => `${CAMPAIGN}/${campaignName}/topics/${topicType}`;
const CAMPAIGN_TOPIC_IMAGES = (campaignName, topicType) => `${CAMPAIGN}/${campaignName}/topics/${topicType}/images`;
export const createCampaignTopicAPI = (campaignName: string, topicType: string, campaignTopicData: any) =>
	Network.post(CAMPAIGN_TOPIC(campaignName, topicType), campaignTopicData);
export const getCampaignTopicAPI = (campaignName: string, topicType: string) =>
	Network.get(CAMPAIGN_TOPIC(campaignName, topicType));
export const updateCampaignTopicAPI = (campaignName: string, topicType: string, campaignTopicData: any) =>
	Network.put(CAMPAIGN_TOPIC(campaignName, topicType), campaignTopicData);
export const uploadCampaignTopicImageAPI = (campaignName: string, topicType: string, picture: any) =>
	Network.postForm(CAMPAIGN_TOPIC_IMAGES(campaignName, topicType), picture);

// FILE
export const getPublicFileAPI = (fileName: string) => `${BASE_IMAGE_URL}${fileName}`;
export const FILES = `${BASE}/files`;
export const uploadFileAPI = (data: any) => Network.postForm(FILES, data);
export const getFileAPI = (fileName: any) => Network.get(`${BASE}/files/${fileName}`);

// TEAM
const TEAM = (campaignName: string) => `${CAMPAIGN}/${campaignName}/team`;
export const getTeamMembersAPI = (campaignName: string) => Network.get(TEAM(campaignName));
export const addTeamMemberAPI = (campaignName: string, data: any) => Network.post(TEAM(campaignName), data);
export const reorderTeamMembersAPI = (campaignName: string, data: any) => Network.patch(TEAM(campaignName), data);
const MEMBER = (campaignName: string, memberId: number) => `${TEAM(campaignName)}/${memberId}`;
export const deleteTeamMemberAPI = (campaignName: string, memberId: number) =>
	Network.delete(MEMBER(campaignName, memberId));
export const updateTeamMemberAPI = (campaignName: string, memberId: number, data: any) =>
	Network.patch(MEMBER(campaignName, memberId), data);
const MEMBER_PHOTO = (campaignName: string, memberId: number) => `${MEMBER(campaignName, memberId)}/picture`;
export const uploadMemberPhotoAPI = (campaignName: string, memberId: number, file: any) =>
	Network.postForm(MEMBER_PHOTO(campaignName, memberId), file);
export const getMemberPhotoAPI = (campaignName: string, memberId: number) =>
	Network.get(MEMBER_PHOTO(campaignName, memberId));
export const deleteMemberPhotoAPI = (campaignName: string, memberId: number) =>
	Network.delete(MEMBER_PHOTO(campaignName, memberId));

// DOCUMENT
const CAMPAIGN_DOCUMENTS = (campaignName: string) => `${CAMPAIGN}/${campaignName}/documents`;
const REQUEST_FOR_DOCUMENTS = (campaignName: string) => `${CAMPAIGN_DOCUMENTS(campaignName)}/request`;
const CAMPAIGN_DOCUMENTS_REQUEST = `${CAMPAIGN}/documents/requests`;
const DOCUMENT_REQUEST = (requestId: any) => `${CAMPAIGN_DOCUMENTS_REQUEST}/${requestId}`;
const COMPANY_DOCUMENTS = (companyId: number) => `${COMPANY}/${companyId}/documents`;
const MY_COMPANY_DOCUMENTS = (documentId: number) => `${COMPANY}/mine/documents/${documentId}`;
const MY_CAMPAIGN_DOCUMENT = (documentId: number) => `${CAMPAIGN}/mine/documents/${documentId}`;

const USER_COMPANY_DOCUMENTS = (userId: any) => `${USER}/${userId}/companyDocuments`;
// const USER_CAMPAIGN_DOCUMENTS = (userId: any) => `${USER}/${userId}/campaignDocuments`;
const USER_CAMPAIGN_DOCUMENTS_PAGEABLE = (userId: any, pageNumber: number, pageSize: number) =>
	`${USER}/${userId}/pageableCampaignDocuments?page=${pageNumber}&size=${pageSize}`;

export const getCampaignDocumentsAPI = (campaignName: string) => Network.get(CAMPAIGN_DOCUMENTS(campaignName)); // for overview, and campaign wizard doc section
export const getCampaignDocumentsPageableAPI = (userId: number, pageNumber: number, pageSize: number) =>
	Network.get(USER_CAMPAIGN_DOCUMENTS_PAGEABLE(userId, pageNumber, pageSize));
export const submitCampaignDocumentAPI = (campaignName: string, data: any) =>
	Network.post(CAMPAIGN_DOCUMENTS(campaignName), data);
export const deleteCampaignDocumentAPI = (documentId: number) => Network.delete(MY_CAMPAIGN_DOCUMENT(documentId));
export const updateCampaignDocumentAPI = (documentId: number, data: any) =>
	Network.patch(MY_CAMPAIGN_DOCUMENT(documentId), data);

export const getCompanyDocumentsAPI = (userId: any) => Network.get(USER_COMPANY_DOCUMENTS(userId)); // all user company documents
export const getAllCompanyDocumentsAPI = (companyId: number) => Network.get(COMPANY_DOCUMENTS(companyId)); // for overview section
export const submitCompanyDocumentAPI = (companyId: number, data: any) =>
	Network.post(COMPANY_DOCUMENTS(companyId), data);
export const updateCompanyDocumentAPI = (documentId: number, data: any) =>
	Network.patch(MY_COMPANY_DOCUMENTS(documentId), data);
export const deleteCompanyDocumentAPI = (documentId: number) => Network.delete(MY_COMPANY_DOCUMENTS(documentId));

const ENTITY_DOCUMENTS = entity => `${BASE}/${entity}/documents`;
const ENTITY_DOCUMENT_TYPES = entity => `${ENTITY_DOCUMENTS(entity)}/types`;
export const getDocumentTypesAPI = (entity: string) => Network.get(ENTITY_DOCUMENT_TYPES(entity));
export const getDocumentRequestsAPI = () => Network.get(CAMPAIGN_DOCUMENTS_REQUEST);
export const submitRequestForDocumentsAPI = campaignName => Network.post(REQUEST_FOR_DOCUMENTS(campaignName));
export const getRequestStatusAPI = campaignName => Network.get(REQUEST_FOR_DOCUMENTS(campaignName));
export const acceptDocumentRequestAPI = (requestId: any) => Network.patch(`${DOCUMENT_REQUEST(requestId)}/accept`);
export const rejectDocumentRequestAPI = (requestId: any) => Network.patch(`${DOCUMENT_REQUEST(requestId)}/reject`);

// PLATFORM SETTINGS
/**
 * Endpoint for settings platform:
 * countries
 * platformCurrency
 * platformMinimumInvestment
 *
 */
const SETTINGS = `${BASE}/settings`;
export const getPlatformSettingsAPI = (data: any) => Network.get(SETTINGS, data);

// UPDATES
const MY_UPDATES = (id: string) => `${CAMPAIGN}/mine/updates/${id}`;
const UPDATES_IMAGES = (id: string) => `${CAMPAIGN}/mine/updates/${id}/images`;
const UPDATES = (campaignName: string) => `${CAMPAIGN}/${campaignName}/updates`;
const UPDATE_PAGEABLE = (campaignName: string, pageNumber: number, pageSize: number) =>
	`${CAMPAIGN}/${campaignName}/updates?page=${pageNumber}&size=${pageSize}`;
export const getAllCampaignUpdatesPageableAPI = (campaignName: string, pageNumber: number, pageSize: number) =>
	Network.get(UPDATE_PAGEABLE(campaignName, pageNumber, pageSize));
export const updateCampaignUpdateAPI = (updateId: string, data: any) => Network.put(MY_UPDATES(updateId), data);
export const createCampaignUpdateAPI = (campaignName: string, data: any) => Network.post(UPDATES(campaignName), data);
export const deleteCampaignUpdateAPI = (updateId: string) => Network.delete(MY_UPDATES(updateId));
export const uploadCampaignUpdateImageAPI = (updateId: string, picture: any) =>
	Network.postForm(UPDATES_IMAGES(updateId), picture);
const UPDATE_SINGLE = (updateId: number) => `${CAMPAIGN}/updates/${updateId}`;
export const getCampaignUpdate = (updateId: number) => Network.get(UPDATE_SINGLE(updateId));
const DASHBOARD_UPDATES = `${CAMPAIGN}/updates`;
export const getCampaignsUpdates = (filter: string) => Network.get(`${DASHBOARD_UPDATES}?filter=${filter}`);

// AUDITS
const AUDITS = `${BASE}/audits`;
const AUDIT = (auditId: number) => `${AUDITS}/${auditId}`;
export const auditCampaignAPI = (data: any) => Network.post(AUDITS, data);

// ADMIN
export const FUNDRAISING = `${BASE}/fundraisingProposals`;
export const OFF_PLATFORM = (campaignName: string) => `${BASE}/investments/offPlatform/${campaignName}`;
export const getCampaignsByStateAPI = (data: any) => Network.get(CAMPAIGN, data);
export const acceptCampaignAPI = (auditId: number) => Network.patch(`${AUDIT(auditId)}/accept`);
export const rejectCampaignAPI = (auditId: number, data: any) => Network.patch(`${AUDIT(auditId)}/decline`, data);
export const getFundrisingProposals = (filter: string) => Network.get(`${FUNDRAISING}?filter=${filter}`);

export const getAllFundrisingProposalsAPI = (data: any) => Network.get(FUNDRAISING, data);

export const getFundrisingProposalsDocuments = (fundraisingProposalId: number) =>
	Network.get(`${FUNDRAISING}/${fundraisingProposalId}/documents`);
export const launchCampaignAPI = (campaignName: string) => Network.patch(CAMPAIGN_LAUNCH(campaignName));
export const offPlatformInvestmentAPI = (campaignName: string, data: any) =>
	Network.post(OFF_PLATFORM(campaignName), data);

// FUNDRAISING APP
export const FUNDRAISING_DOC = (proposalId: any) => `${FUNDRAISING}/${proposalId}/documents`;
export const submitFundraisingProposalAPI = (data: any) => Network.postWithHeader(FUNDRAISING, data.body, data.header);
export const submitFundraisingProposalDocAPI = (proposalId: any, data: any) =>
	Network.post(FUNDRAISING_DOC(proposalId), data);
export const acceptFundrisingApplication = (proposalId: number) => Network.patch(`${FUNDRAISING}/${proposalId}/accept`);
export const rejectFundrisingApplication = (proposalId: number, data: any) =>
	Network.patch(`${FUNDRAISING}/${proposalId}/reject`, data);

// KYC
const USER_DOCUMENTS = `${USER}/documents`;

const KYC_USER = `${BASE}/kyc/user`;
const KYC_USERS = `${BASE}/kyc/users`;
const KYC_AUDITOR = `${KYC_USER}/assign`;

export const submitPersonalDocumentsAPI = (data: any) => Network.post(USER_DOCUMENTS, data);
export const submitKYCRequestAPI = (data: any) => Network.post(KYC_USER, data);
export const assignAuditorToUserKYC = (data: any) => Network.patch(KYC_AUDITOR, data);

export const getKYCRequest = (data: any, role: string, state: string) => Network.get(KYC_USERS, data);

export const acceptUserKYCInternalReview = (userKYCId: number, role: string, status: string, page: number) =>
	Network.patch(`${KYC_USER}/${userKYCId}/accept`);
export const rejectUserKYCInternalReview = (userKYCId: number, data: any) =>
	Network.patch(`${KYC_USER}/${userKYCId}/reject`, data);

export const getKYCUser = (userKYCId: number) => Network.get(`${KYC_USER}/${userKYCId}`);

export const getKYCforCurrentUserAPI = () => Network.get(KYC_USER);

// Digital Signature
const DIGITAL_SIGNATURES = `${BASE}/digitalSignatures`;
export const saveKeysAPI = (data: any) => Network.post(DIGITAL_SIGNATURES, data);
export const getMyKeysAPI = () => Network.get(`${DIGITAL_SIGNATURES}/mine`);

export const getPublicKeyAPI = authId => Network.get(`${DIGITAL_SIGNATURES}/${authId}`);

const NOTIFICATIONS = `${BASE}/notifications`;
const UNREAD_NOTIFICATIONS = `${NOTIFICATIONS}/numberOfUnseen`;
const CHANGE_NOTIFICATION_STATUS = (id: number) => `${NOTIFICATIONS}/changeStatus/${id}`;

export const getNumberOfUnseenNotificationsAPI = () => Network.get(UNREAD_NOTIFICATIONS);
export const getAllUserNotificationsAPI = (data: any) => Network.get(NOTIFICATIONS, data);
export const changeNotificationStatusAPI = (id: number) => Network.patch(CHANGE_NOTIFICATION_STATUS(id));
export const deleteNotificationAPI = (id: number) => Network.delete(`${NOTIFICATIONS}/${id}`);
